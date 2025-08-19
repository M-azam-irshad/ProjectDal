import { Suspense, useEffect, useState, lazy } from "react";
import Lenis from "@studio-freight/lenis";

const ProjectDalHomepage = lazy(()=> import("../components/HomePage.jsx"))
const FeaturedCards = lazy(()=> import("../components/FeaturedCards.jsx"))
const AdditionComponent = lazy(()=> import("../components/AdditionComponent.jsx"))
const FeedbackAdditionComponent = lazy(()=> import("../components/FeedbackAdditionComponent.jsx"))
const Footer = lazy(()=> import("../components/Footer.jsx"))

import cardList from "../components/cardList.jsx";
import ProjectUploader from "../components/ProjectUploader.jsx";

// Enhanced Loading Component
const EnhancedLoadingFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Animated spinner */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
        
        {/* Animated text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            <span className="inline-block animate-pulse">Loading</span>
            <span className="inline-block ml-2 animate-bounce" style={{animationDelay: '0.5s'}}>.</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.7s'}}>.</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.9s'}}>.</span>
          </h1>
          
          <p className="text-xl text-white/80 font-light opacity-0 animate-pulse" style={{
            animation: 'fadeInUp 1s ease-out 0.5s both'
          }}>
            Preparing your experience
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full"
              style={{
                animation: 'progress 2s ease-in-out infinite'
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

function App() {
  const [uploaderState, setUploaderState] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,       
      lerp: 0.25,          
      smoothWheel: true,   
      wheelMultiplier: 1.4 
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      {uploaderState ? (
        <ProjectUploader />
      ) : (
        <Suspense fallback={<EnhancedLoadingFallback />}>
          <ProjectDalHomepage />
          <FeaturedCards cardList={cardList} />
          <AdditionComponent prop={setUploaderState} />
          <FeedbackAdditionComponent />
          <Footer />
        </Suspense>
      )}
    </>
  );
}

export default App;