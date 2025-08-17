import React from "react";
import { Plus } from "lucide-react";

function AdditionComponent({ prop }) {
  function openProjectUploader() {
    return prop(true);
  }

  return (
    <>
      <main className="px-6 py-10 max-w-full min-h-[400px]">
        <div
          className="flex flex-col items-center justify-center mb-4"
          style={{
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: "-0.025em",
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-8 text-center">
            Add Your Project
          </h1>
        </div>
        <div className="w-full h-full min-h-[350px] relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl  border border-blue-100/50 overflow-hidden">
          {/* Background decorative elements */}
          {/* Large floating orbs */}
          <div className="absolute top-8 right-8 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-12 left-12 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-16 left-1/4 w-24 h-24 bg-blue-100/25 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/4 w-18 h-18 bg-blue-400/15 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* Medium floating elements */}
          <div
            className="absolute top-1/3 right-12 w-12 h-12 bg-blue-250/20 rounded-full blur-md animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-16 w-10 h-10 bg-blue-350/25 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "0.8s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/3 w-14 h-14 bg-blue-200/15 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "2.2s" }}
          ></div>

          {/* Small accent dots */}
          <div
            className="absolute top-1/2 left-8 w-4 h-4 bg-blue-400/40 rounded-full animate-pulse"
            style={{ animationDelay: "1.8s" }}
          ></div>
          <div
            className="absolute top-1/4 right-1/3 w-6 h-6 bg-blue-300/30 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500/35 rounded-full animate-pulse"
            style={{ animationDelay: "1.2s" }}
          ></div>
          <div
            className="absolute top-2/3 right-8 w-5 h-5 bg-blue-350/40 rounded-full animate-pulse"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute top-12 left-1/2 w-2 h-2 bg-blue-600/45 rounded-full animate-pulse"
            style={{ animationDelay: "0.7s" }}
          ></div>
          <div
            className="absolute bottom-8 right-1/2 w-4 h-4 bg-blue-250/35 rounded-full animate-pulse"
            style={{ animationDelay: "1.9s" }}
          ></div>

          {/* Geometric shapes */}
          <div
            className="absolute top-1/5 left-20 w-8 h-8 bg-blue-300/20 rounded-lg rotate-12 blur-sm animate-pulse"
            style={{ animationDelay: "1.4s" }}
          ></div>
          <div
            className="absolute bottom-1/5 right-20 w-6 h-6 bg-blue-400/25 rounded-lg -rotate-12 blur-sm animate-pulse"
            style={{ animationDelay: "2.1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-7 h-7 bg-blue-200/30 rounded-md rotate-45 blur-md animate-pulse"
            style={{ animationDelay: "0.9s" }}
          ></div>

          {/* Subtle gradient streaks */}
          <div
            className="absolute top-6 left-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "1.6s" }}
          ></div>
          <div
            className="absolute bottom-6 right-1/3 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "2.3s" }}
          ></div>

          {/* Floating particles */}
          <div
            className="absolute top-1/4 left-1/5 w-1 h-1 bg-blue-500/50 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="absolute top-3/5 right-1/5 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse"
            style={{ animationDelay: "1.7s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-600/55 rounded-full animate-pulse"
            style={{ animationDelay: "2.4s" }}
          ></div>
          <div
            className="absolute top-4/5 right-1/6 w-1.5 h-1.5 bg-blue-300/65 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>

          {/* Main content area */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 py-12">
            <div
              className="group cursor-pointer transition-all duration-300 ease-out hover:scale-105 active:scale-95"
              onClick={openProjectUploader}
            >
              {/* Upload container */}
              <div className="bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-sm rounded-2xl shadow-[inset_4px_4px_12px_rgba(59,130,246,0.1),inset_-4px_-4px_12px_rgba(255,255,255,0.8),4px_4px_16px_rgba(59,130,246,0.08)] border border-white/40 p-12 text-center transition-all duration-300 ease-out group-hover:shadow-[inset_6px_6px_16px_rgba(59,130,246,0.12),inset_-6px_-6px_16px_rgba(255,255,255,0.9),6px_6px_20px_rgba(59,130,246,0.12)]">
                {/* Icon container */}
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-[4px_4px_12px_rgba(59,130,246,0.3),-2px_-2px_8px_rgba(147,197,253,0.4)] transition-all duration-300 ease-out group-hover:shadow-[6px_6px_16px_rgba(59,130,246,0.4),-3px_-3px_12px_rgba(147,197,253,0.5)] group-hover:scale-110 group-active:scale-95">
                  <Plus
                    size={32}
                    className="text-white transition-transform duration-300 ease-out group-hover:rotate-90"
                  />
                </div>

                {/* Text content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-700 mb-2 transition-colors duration-300 group-hover:text-blue-700">
                    Upload Your Project
                  </h3>
                  <p className="text-sm text-slate-500 font-medium transition-colors duration-300 group-hover:text-blue-600">
                    Click here to add your amazing work
                  </p>
                </div>

                {/* Subtle pulse animation */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-600/5 opacity-50 animate-pulse"></div>
        </div>
      </main>
    </>
  );
}

export default AdditionComponent;
