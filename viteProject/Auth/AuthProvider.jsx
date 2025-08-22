// auth/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AuthModal from "./AuthModal";

const supabase = createClient(
  "https://ssvlbobqhyonwgbpqyjx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzdmxib2JxaHlvbndnYnBxeWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODgwNzcsImV4cCI6MjA3MTM2NDA3N30.okztMOEbYgWSwqTHYVkKsWO_99wQRnxTslqplV1qA7o"
);

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
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
      if (session) {
        setShowAuthModal(false); // Close modal when user signs in
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal = (mode = "signin") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Function to check if user needs to authenticate for an action
  const requireAuth = (callback, mode = "signin") => {
    if (session) {
      callback();
    } else {
      openAuthModal(mode);
    }
  };

  const value = {
    session,
    loading,
    showAuthModal,
    authMode,
    openAuthModal,
    closeAuthModal,
    signOut,
    requireAuth,
    user: session?.user || null,
    isAuthenticated: !!session,
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        defaultMode={authMode}
      />
    </AuthContext.Provider>
  );
};
