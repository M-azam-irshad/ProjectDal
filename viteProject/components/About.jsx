import { Suspense } from "react";

function About({ prop }) {
  return (
    <Suspense fallback={prop}>
      <div
        className="flex justify-center px-4 py-16"
        style={{ backgroundColor: "hsl(210, 60%, 80%)" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4"
              style={{
                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                letterSpacing: "-0.025em",
              }}
            >
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid gap-8 md:gap-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-gradient-to-r from-pink-300 via-blue-300 to-cyan-300 hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-blue-200/20 to-cyan-200/20 rounded-2xl"></div>
              <div className="relative z-10 space-y-6 text-gray-800">
                <p className="text-lg leading-relaxed font-medium">
                  Welcome to <span className="font-bold text-blue-700">ProjectDal</span> - your platform for amazing projects and collaboration! 🚀
                </p>
                
                <p className="text-lg leading-relaxed">
                  We believe in the power of community-driven development and showcase, creating meaningful connections that drive innovation forward.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-3 border-dashed border-orange-300 hover:border-orange-400 hover:shadow-xl hover:rotate-1 transition-all duration-300 hover:bg-orange-50/10">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-xl font-bold text-gray-800">Our Mission ✨</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our aim is to create a vibrant community that shares knowledge and resources effectively and efficiently.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-3 border-dotted border-green-300 hover:border-green-400 hover:shadow-xl hover:-rotate-1 transition-all duration-300 hover:bg-green-50/10">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mr-3 animate-bounce"></div>
                  <h3 className="text-xl font-bold text-gray-800">Our Team 👥</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-blue-700">ProjectLaga</span> is powered by 3 dedicated engineers who care about solving the problems of our local engineering community.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 rounded-3xl p-8 border-4 border-double border-purple-300 shadow-2xl relative overflow-hidden hover:shadow-3xl hover:scale-102 transition-all duration-500">
              <div className="absolute top-4 right-4 text-4xl animate-spin-slow">🎉</div>
              <div className="absolute bottom-4 left-4 text-2xl animate-bounce">💫</div>
              <div className="text-center relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment 💪</h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  We are committed to fostering a culture of collaboration and innovation, where every voice is heard and valued. Together, we build something greater than the sum of our parts! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default About;