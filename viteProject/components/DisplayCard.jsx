import React from 'react';
const ProjectCard = ({
  title = "Featured Project 1",
  subtitle = "Description for featured project 1.",
  author = "Hashmat Ali",
  date = new Date(),
  tags = ["Robotics", "Automation"],
  image = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl duration-300 cursor-pointer hover:scale-105 transition-all">
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {subtitle}
        </p>

        {/* Author and Rating */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-600">
            By <span className="font-semibold text-gray-900">{author}</span>
          </div>
          
        </div>

        {/* Price */}
        <div className="pt-2">
          <div className="inline-block px-6 py-3 bg-green-50 text-green-700 rounded-2xl font-semibold text-lg w-full text-center">
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;