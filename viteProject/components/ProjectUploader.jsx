import React, { useState, createContext, useContext } from 'react';
import { Upload, FileText, Users, Target, Tag, Image, Github, ExternalLink, X, Plus, CheckCircle, Eye } from 'lucide-react';

// Create Context for Projects Database
const ProjectsContext = createContext();

// Projects Provider Component
export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);

  
  
  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(), // Simple ID generation
      ...projectData,
      submittedAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject.id;
  };
  
  const getProject = (id) => {
    return projects.find(project => project.id === parseInt(id));
  };
  
  return (
    <ProjectsContext.Provider value={{ projects, addProject, getProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

// Hook to use Projects Context
const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

// Project Preview Component
function ProjectPreview({ project, onClose }) {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-violet-900 rounded-3xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6 text-white">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-200">Description</h3>
            <p className="text-blue-100">{project.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-200">Category</h3>
              <span className="px-3 py-1 bg-blue-500/30 rounded-full text-sm">{project.category}</span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-200">Target Audience</h3>
              <p className="text-blue-100">{project.targetAudience}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-200">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-violet-500/30 rounded-full text-sm border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {project.features.filter(f => f.trim()).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-200">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-100">
                {project.features.filter(f => f.trim()).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {project.techStack.filter(t => t.trim()).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-200">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.filter(t => t.trim()).map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-500/30 rounded-full text-sm border border-white/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-200 rounded-xl hover:bg-green-500/30 transition-all border border-green-400/20"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            
            {project.githubRepo && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-200 rounded-xl hover:bg-gray-500/30 transition-all border border-gray-400/20"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
            )}
          </div>
          
          <div className="text-xs text-blue-300 pt-4 border-t border-white/20">
            Submitted: {new Date(project.submittedAt).toLocaleDateString()} at {new Date(project.submittedAt).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

// All Projects List Component
function AllProjectsList() {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  
  if (projects.length === 0) {
    return null;
  }
  
  return (
    <>
      <div className="mt-12 backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">All Submitted Projects ({projects.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 rounded-2xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-blue-200 text-sm mb-3 line-clamp-3">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-blue-500/30 rounded-full text-xs text-blue-200">{project.category}</span>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-violet-200 rounded-lg hover:bg-violet-500/30 transition-all text-sm"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
              </div>
              <div className="mt-3 text-xs text-blue-300">
                {new Date(project.submittedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <ProjectPreview 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
}

// Success Message Component
function SuccessMessage({ show, onClose, projectId }) {
  if (!show) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-green-400" />
        <div>
          <h3 className="text-green-100 font-semibold">Project Uploaded Successfully!</h3>
          <p className="text-green-200 text-sm">Project ID: {projectId}</p>
        </div>
        <button
          onClick={onClose}
          className="text-green-300 hover:text-green-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Main Project Uploader Component
function ProjectUploader() {
  const { addProject } = useProjects();
  
  const initialFormData = {
    title: '',
    description: '',
    category: '',
    tags: [],
    targetAudience: '',
    features: [''],
    techStack: [''],
    liveDemo: '',
    githubRepo: '',
    documentation: null,
    images: [],
    projectFile: null
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [currentTag, setCurrentTag] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastProjectId, setLastProjectId] = useState(null);

  const categories = [
    'Web Development', 'Mobile App', 'Machine Learning', 'Data Science', 
    'Desktop Application', 'Game Development', 'IoT', 'Blockchain', 
    'DevOps', 'API/Backend', 'Frontend', 'Full Stack'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, currentTag.trim()] 
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (field, files) => {
    if (field === 'images') {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...imageFiles] }));
    } else {
      setFormData(prev => ({ ...prev, [field]: files[0] }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload('projectFile', files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for required fields
    if (!formData.title.trim()) {
      alert('Project title is required');
      return;
    }
    if (!formData.description.trim()) {
      alert('Project description is required');
      return;
    }
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    if (!formData.targetAudience.trim()) {
      alert('Target audience is required');
      return;
    }
    if (formData.tags.length === 0) {
      alert('Please add at least one tag');
      return;
    }
    if (!formData.projectFile) {
      alert('Please upload your project file');
      return;
    }
    
    // Add project to database
    const projectId = addProject(formData);
    
    // Reset form and show success
    setFormData(initialFormData);
    setLastProjectId(projectId);
    setShowSuccess(true);
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-violet-900 p-3 sm:p-4 md:p-6">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-5 sm:top-40 sm:right-20 w-40 h-40 sm:w-96 sm:h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-40 w-36 h-36 sm:w-80 sm:h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight px-2">
            Upload Your Project
          </h1>
          <p className="text-blue-100 text-base sm:text-lg opacity-90 px-2">
            Share your engineering masterpiece with the community
          </p>
        </div>

        <div className="space-y-8">
          {/* Project Basics Card */}
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl mr-4 shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Project Basics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-blue-100 font-medium mb-3">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter your project title..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-blue-100 font-medium mb-3">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="4"
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10 resize-none"
                  placeholder="Describe your project in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-blue-100 font-medium mb-3">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  required
                >
                  <option value="" className="bg-indigo-900">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-indigo-900">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-blue-100 font-medium mb-3">Target Audience *</label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  placeholder="e.g., Developers, Students, Businesses"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl sm:rounded-2xl mr-3 sm:mr-4 shadow-lg">
                <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Tags & Technologies *</h2>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500/30 to-violet-500/30 rounded-full text-white text-xs sm:text-sm flex items-center backdrop-blur-sm border border-white/20 shadow-lg"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 sm:ml-2 text-white/70 hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                  placeholder="Add tags (React, Python, AI, etc.)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl hover:from-blue-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl mr-4 shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Technical Details</h2>
            </div>

            {/* Features */}
            <div className="mb-6">
              <label className="block text-blue-100 font-medium mb-3">Key Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Describe a key feature..."
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('features', index)}
                      className="px-4 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300 border border-red-400/20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="flex items-center gap-2 px-4 py-2 text-blue-300 hover:text-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <label className="block text-blue-100 font-medium mb-3">Technology Stack</label>
              {formData.techStack.map((tech, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleArrayChange('techStack', index, e.target.value)}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Technology used (e.g., React, Node.js, MongoDB)"
                  />
                  {formData.techStack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('techStack', index)}
                      className="px-4 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300 border border-red-400/20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('techStack')}
                className="flex items-center gap-2 px-4 py-2 text-blue-300 hover:text-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Technology
              </button>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-100 font-medium mb-3 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.liveDemo}
                  onChange={(e) => handleInputChange('liveDemo', e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  placeholder="https://your-demo-link.com"
                />
              </div>
              <div>
                <label className="block text-blue-100 font-medium mb-3 flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={formData.githubRepo}
                  onChange={(e) => handleInputChange('githubRepo', e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-4 shadow-lg">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Files & Media</h2>
            </div>

            {/* Main Project File Upload */}
            <div className="mb-6">
              <label className="block text-blue-100 font-medium mb-3">Project Files (ZIP/RAR) *</label>
              <div
                className={`border-2 border-dashed ${dragOver ? 'border-blue-400 bg-blue-400/10' : 'border-white/30'} rounded-2xl p-8 text-center transition-all duration-300 backdrop-blur-sm`}
                onDrop={handleDrop}
                onDragOver={(e) => {e.preventDefault(); setDragOver(true);}}
                onDragLeave={() => setDragOver(false)}
              >
                <Upload className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <p className="text-blue-100 mb-2">
                  {formData.projectFile ? formData.projectFile.name : 'Drop your project file here or click to browse'}
                </p>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload('projectFile', e.target.files)}
                  className="hidden"
                  id="project-file"
                  accept=".zip,.rar,.7z"
                />
                <label
                  htmlFor="project-file"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl cursor-pointer hover:from-blue-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-blue-100 font-medium mb-3 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Project Screenshots/Images
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload('images', e.target.files)}
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-blue-500 file:to-violet-500 file:text-white hover:file:from-blue-600 hover:file:to-violet-600 transition-all duration-300"
                accept="image/*"
              />
              {formData.images.length > 0 && (
                <div className="mt-3 text-sm text-blue-200">
                  {formData.images.length} image(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600"
            >
              Upload Project
            </button>
            <p className="text-blue-200 text-sm mt-4 opacity-80">
              By uploading, you agree to our terms and conditions
            </p>
          </div>
        </div>

        {/* All Projects List */}
        <AllProjectsList />
      </div>

      {/* Success Message */}
      <SuccessMessage 
        show={showSuccess} 
        onClose={() => setShowSuccess(false)}
        projectId={lastProjectId}
      />
    </div>
  );
}

// Main App Component with Provider
export default function App() {
  return (
    <ProjectsProvider>
      <ProjectUploader />
    </ProjectsProvider>
  );
}