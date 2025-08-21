
import { Star } from "lucide-react";

import React, { useState, useMemo } from "react";
import {  Search, X, Tag } from "lucide-react";

function FeaturedCards({ cardList: propCardList, color="none"}) {
  // Use props if provided, otherwise use default cardList
  const cards = propCardList || cardList;
  
  // State for filtering
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  // Extract all unique tags with their frequency
  const allTags = useMemo(() => {
    const tagCount = {};
    cards.forEach(card => {
      card.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ name: tag, count }));
  }, [cards]);

  // Core filtering and ranking algorithm
  const filteredCards = useMemo(() => {
    let filtered = [...cards];

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(card => 
        selectedTags.some(tag => card.tags.includes(tag))
      );
    }

    // Filter by search query (search in title, description, author, and tags)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query) ||
        card.author.toLowerCase().includes(query) ||
        card.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply ranking algorithm when tags are selected
    if (selectedTags.length > 0 || searchQuery.trim()) {
      filtered = filtered.map(card => {
        let relevanceScore = 0;
        
        if (selectedTags.length > 0) {
          const matchingTags = card.tags.filter(tag => selectedTags.includes(tag)).length;
          relevanceScore = matchingTags / selectedTags.length;
        }

        // Search relevance bonus
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          if (card.title.toLowerCase().includes(query)) relevanceScore += 0.3;
          if (card.tags.some(tag => tag.toLowerCase().includes(query))) relevanceScore += 0.2;
        }

        // Additional scoring factors
        const ratingScore = card.rating / 5;
        const freeBonus = card.price === "Free" ? 0.1 : 0;
        
        const finalScore = relevanceScore * 0.7 + ratingScore * 0.2 + freeBonus;
        
        return { ...card, score: finalScore };
      });

      // Sort by calculated score
      if (sortBy === 'relevance') {
        filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
      }
    }

    // Additional sorting options
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
      filtered.sort((a, b) => a.author.localeCompare(b.author));
    }

    return filtered;
  }, [cards, selectedTags, searchQuery, sortBy]);

  // Get suggested tags based on current selection
  const suggestedTags = useMemo(() => {
    if (selectedTags.length === 0) return allTags.slice(0, 8);
    
    const relatedTagCount = {};
    const matchingCards = cards.filter(card =>
      selectedTags.some(tag => card.tags.includes(tag))
    );
    
    matchingCards.forEach(card => {
      card.tags.forEach(tag => {
        if (!selectedTags.includes(tag)) {
          relatedTagCount[tag] = (relatedTagCount[tag] || 0) + 1;
        }
      });
    });
    
    return Object.entries(relatedTagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag, count]) => ({ name: tag, count }));
  }, [selectedTags, cards, allTags]);

  // Tag management functions
  const toggleTag = (tagName) => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  return (
    <main className="px-6 py-10" id="featuredProjects" style={{backgroundColor:`${color}`}} >
      {/* Section Title */}
      <h2
        className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-8 text-center"
        style={{ 
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          letterSpacing: "-0.025em"
        }}
      >
        Featured Projects
      </h2>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-10">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects, tags, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm text-gray-700 placeholder-gray-400"
            style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          {/* Active Filters */}
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-3 mb-3">
              {selectedTags.length > 0 && (
                <div className="flex items-center gap-2 mr-4">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Active:</span>
                </div>
              )}
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 backdrop-blur-md bg-blue-100/70 text-blue-800 rounded-full text-sm font-medium border border-blue-200/50 shadow-sm"
                >
                  {tag}
                  <X
                    className="w-4 h-4 ml-1 cursor-pointer hover:text-blue-900 transition-colors"
                    onClick={() => toggleTag(tag)}
                  />
                </span>
              ))}
              {(selectedTags.length > 0 || searchQuery.trim()) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Suggested Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">
                {selectedTags.length > 0 ? 'Related:' : 'Popular:'}
              </span>
              {suggestedTags.map(({ name, count }) => (
                <button
                  key={name}
                  onClick={() => toggleTag(name)}
                  className="inline-flex items-center px-3 py-1 backdrop-blur-md bg-white/70 text-gray-700 rounded-full text-sm hover:bg-gray-100/70 transition-all duration-200 border border-gray-200/50 shadow-sm"
                >
                  {name}
                  <span className="ml-1 text-xs text-gray-500">({count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="backdrop-blur-md bg-white/70 border border-gray-200/50 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
              <option value="author">Author</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-6">
          {filteredCards.length} project{filteredCards.length !== 1 ? 's' : ''} found
          {(selectedTags.length > 0 || searchQuery.trim()) && (
            <span> matching your criteria</span>
          )}
        </p>
      </div>

      {/* Card Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl
               shadow-[8px_8px_rgba(41,97,255),-8px_-8px_rgba(67,27,227)] 
               hover:shadow-[12px_12px_rgba(0,0,0,0.2),-12px_-12px_rgba(255,255,255,0.9)] 
               transition-all duration-300 border border-gray-200 overflow-hidden group cursor-pointer hover:scale-102"
            >
              {/* Image */}
              <div
                className="relative h-48 w-full"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Glassmorphism Overlay for Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {card.tags?.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => toggleTag(tag)}
                      className={`backdrop-blur-md border text-xs font-medium px-2 py-1 rounded-full shadow-sm transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-200/60 border-blue-300/60 text-blue-800'
                          : 'bg-white/30 border-white/40 text-gray-900 hover:bg-white/40'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {card.description}
                </p>

                {/* Author + Rating */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    By <span className="font-medium text-gray-700">{card.author}</span>
                  </p>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm backdrop-blur-sm bg-white/30 px-2 py-0.5 rounded-full border border-white/40 shadow-sm">
                    <Star size={14} fill="currentColor" />
                    <span>{card.rating}</span>
                  </div>
                </div>

                {/* Pricing / Status */}
                <span
                  className={`mt-3 inline-block text-sm font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-md border ${
                    card.price === "Free"
                      ? "bg-green-100/60 text-green-700 border-green-200"
                      : "bg-blue-100/60 text-blue-700 border-blue-200"
                  }`}
                >
                  {card.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="mb-4">
            <Tag className="w-16 h-16 text-gray-300 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={clearAllFilters}
            className="backdrop-blur-md bg-blue-100/70 text-blue-700 px-6 py-2 rounded-full border border-blue-200/50 shadow-sm hover:bg-blue-200/70 transition-all duration-200"
          >
            Clear all filters
          </button>
        </div>
      )}
    </main>
  );
}

export default FeaturedCards;