import React from "react";

export default function FancyButton({ children, bgColor = "bg-white/100", textColor = "text-black" }) {
  return (
    <button
      className={`
        px-6 py-3 
        rounded-[26px] 
        
        ${textColor} font-semibold 
        shadow-[35px_35px_68px_0px_rgba(62,139,248,0.5),inset_-9px_-9px_6px_0px_rgba(62,139,248,0.6),inset_0px_11px_18px_0px_rgb(255,255,255)]
        ${bgColor}
        backdrop-blur-[0px]
        transition-transform duration-200
        hover:scale-105 active:scale-95
        cursor-pointer
      `}
    >
      {children || "Click Me"}
    </button>
  );
}
