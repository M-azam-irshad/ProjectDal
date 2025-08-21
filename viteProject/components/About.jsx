import { Suspense } from "react";
function About({prop}) {
    return (
      <Suspense fallback={prop}>
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-8">About ProjectDal</h1>
            <div className="prose prose-lg mx-auto">
              <p>Welcome to ProjectDal - your platform for amazing projects and collaboration.</p>
              <p>We believe in the power of community-driven development and showcase.</p>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }

  export default About