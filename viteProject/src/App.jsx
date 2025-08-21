import { Suspense, useEffect, useState, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import Navbar from "../components/sub-components/Navbar.jsx"; // Your navbar component
import { createClient } from "@supabase/supabase-js";
// Remove these problematic imports:
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://ssvlbobqhyonwgbpqyjx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzdmxib2JxaHlvbndnYnBxeWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODgwNzcsImV4cCI6MjA3MTM2NDA3N30.okztMOEbYgWSwqTHYVkKsWO_99wQRnxTslqplV1qA7o"
);

// Lazy load components
const ProjectDalHomepage = lazy(() => import("../components/HomePage.jsx"));
const FeaturedCards = lazy(() => import("../components/FeaturedCards.jsx"));
const AdditionComponent = lazy(() =>
  import("../components/AdditionComponent.jsx")
);
const FeedbackAdditionComponent = lazy(() =>
  import("../components/FeedbackAdditionComponent.jsx")
);
const Footer = lazy(() => import("../components/Footer.jsx"));
const About = lazy(() => import("../components/About.jsx"));

import cardList from "../components/cardList.jsx";
import ProjectUploader from "../components/ProjectUploader.jsx";

// Custom Authentication Component
const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Clear messages when switching between sign up/sign in
  useEffect(() => {
    setError(null);
    setMessage(null);
    setConfirmPassword('');
  }, [isSignUp]);

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        if (data.user && !data.user.email_confirmed_at) {
          setMessage('Check your email for a confirmation link!');
        } else {
          setMessage('Account created successfully!');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        setMessage('Signed in successfully!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      setMessage('Password reset link sent to your email!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Sign up to get started with your account' 
              : 'Sign in to your account to continue'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{message}</p>
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleOAuthSignIn('github')}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Email Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </div>

        {/* Forgot Password */}
        {!isSignUp && (
          <button
            onClick={handlePasswordReset}
            disabled={loading}
            className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none disabled:opacity-50"
          >
            Forgot your password?
          </button>
        )}

        {/* Toggle Sign Up/Sign In */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={loading}
              className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium focus:outline-none disabled:opacity-50"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

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
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Animated spinner */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <div className="flex justify-center space-x-1">
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>

        {/* Animated text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            <span className="inline-block animate-pulse">Loading</span>
            <span
              className="inline-block ml-2 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "0.7s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "0.9s" }}
            >
              .
            </span>
          </h1>

          <p
            className="text-xl text-white/80 font-light opacity-0 animate-pulse"
            style={{
              animation: "fadeInUp 1s ease-out 0.5s both",
            }}
          >
            Preparing your experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{
                animation: "progress 2s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 100%;
            transform: translateX(0%);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
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

// Layout component that includes navbar
function Layout() {
  const [uploaderState, setUploaderState] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      lerp: 0.25,
      smoothWheel: true,
      wheelMultiplier: 1.4,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {uploaderState ? (
          <ProjectUploader />
        ) : (
          <Outlet context={{ setUploaderState }} />
        )}
      </main>
    </>
  );
}

// Home page component
function HomePage() {
  return (
    <Suspense fallback={<EnhancedLoadingFallback />}>
      <ProjectDalHomepage />
      <FeaturedCards cardList={cardList} />
      <AdditionComponent prop={useOutletContext().setUploaderState} />
      <FeedbackAdditionComponent />
      <Footer />
    </Suspense>
  );
}

// Projects page component
function ProjectsPage() {
  return (
    <Suspense fallback={<EnhancedLoadingFallback />}>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Our Projects</h1>
          <FeaturedCards id={"featuredProjects"} cardList={cardList} />
        </div>
      </div>
    </Suspense>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading while checking auth state
  if (loading) {
    return <EnhancedLoadingFallback />;
  }

  // Show auth form if no session
  if (!session) {
    return <AuthForm />;
  }

  // User is authenticated, show main app
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/projects"
            element={<ProjectsPage id={"featuredProjects"} />}
          />
          <Route
            path="/about"
            element={<About prop={<EnhancedLoadingFallback />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;