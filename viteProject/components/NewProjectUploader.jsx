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
} from "lucide-react";

import { supabase } from "../Auth/supabaseClient";

const EngineeringProjectForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    uploaderName: "",
    projectCategory: "",
    tags: "",
    price: "free",
    images: null,
    files: null,
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
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "Please upload at least one image";
    }

    // Files (required, must be ZIP)
    if (!formData.files || formData.files.length === 0) {
      newErrors.files = "Please upload a ZIP file";
    } else {
      const zipRegex = /\.zip$/i;
      const isValidZip = formData.files[0] && zipRegex.test(formData.files[0].name);
      if (!isValidZip) {
        newErrors.files = "Only ZIP files are allowed";
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
        projectDescription: "",
        uploaderName: "",
        projectCategory: "",
        tags: "",
        price: "free",
        images: null,
        files: null,
        githubRepo: "",
      });

      // Navigate after successful upload
      setTimeout(() => navigate("/allprojects"), 2000);

    } catch (error) {
      console.error("Error uploading project:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center py-12">
          <LogIn className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to upload engineering projects.
          </p>
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In with Google
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg sm:mt-10 mt-5 ml-5 mr-5 sm:ml-auto sm:mr-auto">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Upload Engineering Project
          </h2>
          <p className="text-sm text-gray-600">Signed in as: {user?.email}</p>
        </div>
      </div>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">
            Project uploaded successfully! Redirecting...
          </span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">
            Failed to upload project. Please try again.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Title */}
        <div>
          <label
            htmlFor="projectTitle"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <FileText className="w-4 h-4" />
            Project Title *
          </label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.projectTitle ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your project title"
            disabled={isSubmitting}
          />
          {errors.projectTitle && (
            <p className="mt-1 text-sm text-red-600">{errors.projectTitle}</p>
          )}
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="projectDescription"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <FileText className="w-4 h-4" />
            Project Description *
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
              errors.projectDescription ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe your engineering project, its objectives, methodology, and key features"
            disabled={isSubmitting}
          />
          {errors.projectDescription && (
            <p className="mt-1 text-sm text-red-600">
              {errors.projectDescription}
            </p>
          )}
        </div>

        {/* Uploader Name */}
        <div>
          <label
            htmlFor="uploaderName"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <User className="w-4 h-4" />
            Your Name *
          </label>
          <input
            type="text"
            id="uploaderName"
            name="uploaderName"
            value={formData.uploaderName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.uploaderName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.uploaderName && (
            <p className="mt-1 text-sm text-red-600">{errors.uploaderName}</p>
          )}
        </div>

        {/* Project Category */}
        <div>
          <label
            htmlFor="projectCategory"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <Tag className="w-4 h-4" />
            Project Category *
          </label>
          <select
            id="projectCategory"
            name="projectCategory"
            value={formData.projectCategory}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.projectCategory ? "border-red-500" : "border-gray-300"
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
          {errors.projectCategory && (
            <p className="mt-1 text-sm text-red-600">
              {errors.projectCategory}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <Tag className="w-4 h-4" />
            Tags *
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.tags ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. IoT, Robotics, AI"
            disabled={isSubmitting}
          />
          {errors.tags && (
            <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
          )}
        </div>

        {/* Images Upload */}
        <div>
          <label
            htmlFor="images"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <ImageUp className="w-4 h-4" />
            Project Thumbnail *
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${
              errors.images ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images}</p>
          )}
          <p className="mt-1 text-xs text-yellow-500">
           Image size can only be up to 2 MB.
          </p>
        </div>

        {/* Files Upload (ZIP only) */}
        <div>
          <label
            htmlFor="files"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <Files className="w-4 h-4" />
            Project Files (ZIP) *
          </label>
          <input
            type="file"
            id="files"
            name="files"
            accept=".zip"
            onChange={handleFileChange}
            className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${
              errors.files ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.files && (
            <p className="mt-1 text-sm text-red-600">{errors.files}</p>
          )}
          <p className="mt-1 text-xs text-yellow-500">
            Only ZIP files upto 10 MB are allowed (e.g. source code, documentation).
          </p>
        </div>

        {/* GitHub Repo */}
        <div>
          <label
            htmlFor="githubRepo"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
          >
            <Github className="w-4 h-4" />
            GitHub Repository (optional)
          </label>
          <input
            type="url"
            id="githubRepo"
            name="githubRepo"
            value={formData.githubRepo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300"
            placeholder="https://github.com/username/repo"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Project
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default EngineeringProjectForm;