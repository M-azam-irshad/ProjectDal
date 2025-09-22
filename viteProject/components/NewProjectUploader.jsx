import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  User,
  Tag,
  AlertCircle,
  CheckCircle,
  LogIn,
} from "lucide-react";

import { supabase } from "../Auth/supabaseClient";

const EngineeringProjectForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    uploaderName: "",
    projectCategory: "",
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

    // Listen for auth changes
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

    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required";
    } else if (formData.projectTitle.trim().length < 3) {
      newErrors.projectTitle = "Project title must be at least 3 characters";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required";
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription =
        "Project description must be at least 20 characters";
    }

    if (!formData.uploaderName.trim()) {
      newErrors.uploaderName = "Your name is required";
    } else if (formData.uploaderName.trim().length < 2) {
      newErrors.uploaderName = "Name must be at least 2 characters";
    }

    if (!formData.projectCategory) {
      newErrors.projectCategory = "Please select a project category";
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
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
      // Insert into Supabase table 'engineering_projects'
      const { data, error } = await supabase
        .from("engineering_projects")
        .insert([
          {
            title: formData.projectTitle.trim(),
            description: formData.projectDescription.trim(),
            uploader_name: formData.uploaderName.trim(),
            category: formData.projectCategory,
            user_id: user.id, // Add user ID to track who uploaded
            user_email: user.email, // Optional: store user email
          },
        ])
        .select();

      console.log("Supabase response:", { data, error }); // Debug log

      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }

      setSubmitStatus("success");
      setFormData({
        projectTitle: "",
        projectDescription: "",
        uploaderName: "",
        projectCategory: "",
      });

      console.log("Project uploaded successfully:", data[0]);
    } catch (error) {
      console.error("Error uploading project:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner while checking authentication
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

  // Show sign in prompt if user is not authenticated
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
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
            Project uploaded successfully!
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
          <p className="mt-1 text-xs text-gray-500">
            {formData.projectDescription.length}/500 characters
          </p>
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

      <div className="mt-6 text-xs text-gray-500 text-center">
        * Required fields
      </div>
    </div>
  );
};

export default EngineeringProjectForm;