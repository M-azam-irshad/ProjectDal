import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  User,
  Tag,
  AlertCircle,
  CheckCircle,
  LogIn,
  CircleDollarSign,
  ImageUp,
  Files,
  Github,
  HardDriveUpload

  
} from "lucide-react";

import { supabase } from "../Auth/supabaseClient";

export default function EngineeringProjectForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    projectTitle: "",
    subtitle: "",
    projectDescription: "",
    uploaderName: "",
    projectCategory: "",
    tags: "",
    price: "free",
    images: null,
    files: null,
    drive:"",
    githubRepo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  const categories = [
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Software Engineering",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Biomedical Engineering",
    "Environmental Engineering",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};

    // Project Title
    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required";
    } else if (formData.projectTitle.trim().length < 3) {
      newErrors.projectTitle = "Project title must be at least 3 characters";
    }

    // Project Subtitle
    if(!formData.subtitle.trim()){
      newErrors.subtitle = "Subtitle is required";
    }
    else if(formData.subtitle.trim().length < 5){
      newErrors.subtitle = "Please have atleast five words";
    }
    // Project Description
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required";
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription =
        "Project description must be at least 20 characters";
    }

    // Uploader Name
    if (!formData.uploaderName.trim()) {
      newErrors.uploaderName = "Your name is required";
    } else if (formData.uploaderName.trim().length < 2) {
      newErrors.uploaderName = "Name must be at least 2 characters";
    }

    // Project Category
    if (!formData.projectCategory) {
      newErrors.projectCategory = "Please select a project category";
    }

    // Tags
    if (!formData.tags.trim()) {
      newErrors.tags = "Please add at least one tag";
    }

    // Images (required)
    const imageSize = formData.images[0].size;
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "Please upload at least one image";
    }
    else if (imageSize > 2*1024*1024) {
      newErrors.images = "Images greater than 2MB aren't allowed"
    }


    // Files (required, must be ZIP)
    if (formData.files) {
      const fileSize = formData.files[0].size;
      const zipRegex = /\.zip$/i;
      const isValidZip = formData.files[0] && zipRegex.test(formData.files[0].name);
      if (!isValidZip) {
        newErrors.files = "Only ZIP files are allowed";
      }
      else if(fileSize > 10*1024*1024){
        newErrors.files = "Files greater than 10MB aren't allowed"
      }
    }

    // GitHub Repo (optional)
    if (formData.githubRepo && formData.githubRepo.trim() !== "") {
      try {
        new URL(formData.githubRepo);
      } catch {
        newErrors.githubRepo = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // NEW: Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const uploadFileToStorage = async (file, bucketName) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      handleSignIn();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Upload images to storage
      const imageUrls = [];
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          const imageUrl = await uploadFileToStorage(formData.images[i], 'project-images');
          imageUrls.push(imageUrl);
        }
      }

      // Upload project file to storage
      let fileUrl = null;
      if (formData.files && formData.files[0]) {
        fileUrl = await uploadFileToStorage(formData.files[0], 'project-files');
      }

      // Insert into Supabase table
      const { data, error } = await supabase
        .from("engineering_projects")
        .insert([
          {
            title: formData.projectTitle.trim(),
            subtitle: formData.subtitle.trim(),
            description: formData.projectDescription.trim(),
            uploader_name: formData.uploaderName.trim(),
            category: formData.projectCategory,
            tags: formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0),
            price: "free",
            images: imageUrls,
            files: fileUrl ? [fileUrl] : [],
            github_repo: formData.githubRepo.trim() || null,
            drive: formData.drive.trim() || null,
            user_id: user.id,
            user_email: user.email,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setSubmitStatus("success");
      
      // Reset form
      setFormData({
        projectTitle: "",
        subtitle: "",
        projectDescription: "",
        uploaderName: "",
        projectCategory: "",
        tags: "",
        price: "free",
        images: null,
        files: null,
        drive:"",
        githubRepo: "",
      });

      // Navigate after successful upload
      setTimeout(() => navigate("/preview"), 2000);

    } catch (error) {
      console.error("Error uploading project:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
            <span className="ml-3 text-slate-700 font-medium">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="backdrop-blur-lg bg-white/40 border border-white/30 rounded-3xl p-12 shadow-2xl max-w-md w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Sign In Required
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              You need to be signed in to upload engineering projects.
            </p>
            <button
              onClick={handleSignIn}
              className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-3">
                <LogIn className="w-5 h-5" />
                Sign In with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-b border-white/20 p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Upload Engineering Project
                </h2>
                <p className="text-slate-600 mt-1">Signed in as: <span className="font-medium">{user?.email}</span></p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-emerald-500 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-emerald-800 font-semibold">
                    Project uploaded successfully! Redirecting...
                  </span>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-red-500 rounded-full">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-red-800 font-semibold">
                    Failed to upload project. Please try again.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Title */}
              <div className="group">
                <label
                  htmlFor="projectTitle"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Project Title *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-slate-400 font-medium shadow-inner ${
                      errors.projectTitle 
                        ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                        : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                    }`}
                    placeholder="Enter your project title"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {errors.projectTitle && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.projectTitle}</p>
                )}
              </div>

              {/* Project Subtitle */}
              <div className="group">
                <label
                  htmlFor="subtitle"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Subtitle *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-slate-400 font-medium shadow-inner ${
                      errors.subtitle 
                        ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                        : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                    }`}
                    placeholder="Enter your project subtitle"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {errors.subtitle && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.subtitle}</p>
                )}
              </div>

              {/* Project Description */}
              <div className="group">
                <label
                  htmlFor="projectDescription"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Project Description *
                </label>
                <div className="relative">
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 resize-vertical placeholder:text-slate-400 font-medium shadow-inner ${
                      errors.projectDescription 
                        ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                        : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                    }`}
                    placeholder="Describe your engineering project, its objectives, methodology, and key features"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {errors.projectDescription && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.projectDescription}</p>
                )}
              </div>

              {/* Two Column Layout for Name and Category */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Uploader Name */}
                <div className="group">
                  <label
                    htmlFor="uploaderName"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                  >
                    <User className="w-4 h-4 text-indigo-600" />
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      autoComplete="off"
                      id="uploaderName"
                      name="uploaderName"
                      value={formData.uploaderName}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-slate-400 font-medium shadow-inner ${
                        errors.uploaderName 
                          ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                          : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                      }`}
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  {errors.uploaderName && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.uploaderName}</p>
                  )}
                </div>

                {/* Project Category */}
                <div className="group">
                  <label
                    htmlFor="projectCategory"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                  >
                    <Tag className="w-4 h-4 text-indigo-600" />
                    Project Category *
                  </label>
                  <div className="relative">
                    <select
                      id="projectCategory"
                      name="projectCategory"
                      value={formData.projectCategory}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 font-medium shadow-inner appearance-none cursor-pointer ${
                        errors.projectCategory 
                          ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                          : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                      }`}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  {errors.projectCategory && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.projectCategory}</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="group">
                <label
                  htmlFor="tags"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                >
                  <Tag className="w-4 h-4 text-indigo-600" />
                  Tags *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-slate-400 font-medium shadow-inner ${
                      errors.tags 
                        ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                        : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                    }`}
                    placeholder="e.g. IoT, Robotics, AI"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {errors.tags && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.tags}</p>
                )}
              </div>

              {/* File Upload Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b border-white/20 pb-2">File Uploads</h3>
                
                {/* Images Upload */}
                <div className="group">
                  <label
                    htmlFor="images"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                  >
                    <ImageUp className="w-4 h-4 text-indigo-600" />
                    Project Thumbnail *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      autoComplete="off"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className={`block w-full text-slate-600 bg-white/50 backdrop-blur-sm border-2 rounded-2xl p-4 font-medium transition-all duration-300 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white file:font-semibold hover:file:from-indigo-700 hover:file:to-purple-700 file:shadow-lg hover:file:shadow-xl file:transition-all file:duration-300 ${
                        errors.images 
                          ? "border-red-300 bg-red-50/30" 
                          : "border-white/40 hover:border-white/60"
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  {errors.images && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.images}</p>
                  )}
                  <p className="mt-2 text-xs text-amber-600 font-medium bg-amber-50/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-amber-200/50">
                    Image size can only be up to 2 MB.
                  </p>
                </div>

                {/* Files Upload */}
                  <div className="group">
                    <label
                      htmlFor="drive"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                    >
                      <HardDriveUpload className="w-4 h-4 text-indigo-600" />
                      Google Drive
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        autoComplete="off"
                        id="drive"
                        name="drive"
                        value={formData.drive}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-slate-400 font-medium shadow-inner border-white/40 focus:border-indigo-400 hover:border-white/60"
                        placeholder="Drop the link of all your files here"
                        disabled={isSubmitting}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  
                  </div>
              </div>

              {/* External Links Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b border-white/20 pb-2">External Links</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Google Drive Link */}


                  {/* GitHub Repo */}
                  <div className="group">
                    <label
                      htmlFor="githubRepo"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3"
                    >
                      <Github className="w-4 h-4 text-indigo-600" />
                      GitHub Repository
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        autoComplete="off"
                        id="githubRepo"
                        name="githubRepo"
                        value={formData.githubRepo}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-slate-400 font-medium shadow-inner ${
                          errors.githubRepo 
                            ? "border-red-300 focus:border-red-500 bg-red-50/30" 
                            : "border-white/40 focus:border-indigo-400 hover:border-white/60"
                        }`}
                        placeholder="https://github.com/username/repo"
                        disabled={isSubmitting}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    {errors.githubRepo && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.githubRepo}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl disabled:hover:scale-100 disabled:hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity disabled:opacity-20"></div>
                  {isSubmitting ? (
                    <span className="relative flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Uploading Project...
                    </span>
                  ) : (
                    <span className="relative flex items-center justify-center gap-3 ">
                      <Upload className="w-5 h-5 group-hover:rotate-12 transition-transform " />
                      Upload Project
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm backdrop-blur-sm bg-white/20 border border-white/20 rounded-2xl px-6 py-3 inline-block">
            Your project will be reviewed before being published to the community.
          </p>
        </div>
      </div>
    </div>);
}