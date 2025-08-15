import React from "react";
import { Star } from "lucide-react";


function FeaturedCards({ cardList }) {
  return (
    <main className="px-6 py-10">
      {/* Section Title */}

<h2
  className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-12 text-center"
  style={{ 
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: "-0.025em"
  }}
>
  Featured Projects
</h2>
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cardList.map((card, index) => (
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
                  <span
                    key={i}
                    className="backdrop-blur-md bg-white/30 border border-white/40 text-gray-900 text-xs font-medium px-2 py-1 rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
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
    </main>
  );
}

export default FeaturedCards;
