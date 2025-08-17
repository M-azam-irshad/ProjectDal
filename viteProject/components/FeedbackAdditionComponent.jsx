import React, { useState, useEffect } from "react";
import { Send, User, MessageCircle, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

function FeedbackAdditionComponent() {
  const [formData, setFormData] = useState({
    email: '',
    feedback: ''
  });
  
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('');
      setIsEmailValid(false);
      return false;
    }
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setIsEmailValid(false);
      return false;
    }
    
    setEmailError('');
    setIsEmailValid(true);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email before submission
    const isValidEmail = validateEmail(formData.email);
    
    if (!isValidEmail) {
      return;
    }
    
    if (!formData.feedback.trim()) {
      alert('Please enter your feedback');
      return;
    }
    
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback! 🎉');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Handle email typing logic
    if (name === 'email') {
      setIsTyping(true);
      setEmailError(''); // Clear any existing errors while typing
      setIsEmailValid(false);
      
      // Clear existing timer
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
      
      // Set new timer for when user stops typing
      const newTimer = setTimeout(() => {
        setIsTyping(false);
        validateEmail(value);
      }, 800); // Wait 800ms after user stops typing
      
      setTypingTimer(newTimer);
    }
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [typingTimer]);
  return (
    <>
      <main className="px-6 py-10 max-w-full min-h-[400px]">
        <div
          className="flex flex-col items-center justify-center mb-8"
          style={{
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: "-0.025em",
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2 text-center">
            Feedback
          </h1>
          <p className="text-slate-500 text-sm font-medium">We'd love to hear your thoughts!</p>
        </div>
        
        <div className="w-full h-full min-h-[500px] relative bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-3xl  border border-blue-100/50 overflow-hidden">
          
          {/* Background decorative elements */}
          {/* Large floating orbs */}
          <div className="absolute top-6 right-10 w-24 h-24 bg-blue-200/25 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 bg-cyan-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-20 left-1/4 w-28 h-28 bg-blue-100/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-16 right-1/4 w-16 h-16 bg-cyan-300/15 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Medium floating elements */}
          <div className="absolute top-1/3 right-16 w-12 h-12 bg-blue-300/20 rounded-full blur-md animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/3 left-20 w-10 h-10 bg-cyan-250/25 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-3/4 right-1/3 w-14 h-14 bg-blue-200/18 rounded-full blur-lg animate-pulse" style={{animationDelay: '2.2s'}}></div>
          
          {/* Small accent dots */}
          <div className="absolute top-1/2 left-12 w-4 h-4 bg-blue-400/35 rounded-full animate-pulse" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-cyan-400/30 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-2/3 right-12 w-5 h-5 bg-cyan-500/35 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>

          {/* Main content area */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 py-12">
            <div className="w-full max-w-md">
              
              {/* Form container with claymorphism */}
              <div className="bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-sm rounded-2xl shadow-[inset_4px_4px_16px_rgba(59,130,246,0.08),inset_-4px_-4px_16px_rgba(255,255,255,0.9),6px_6px_20px_rgba(59,130,246,0.1)] border border-white/50 p-8">
                
                <div onSubmit={handleSubmit} className="space-y-6">
                  {/* Email field */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-blue-500" />
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full py-4 px-5 pr-12 rounded-xl bg-gradient-to-br from-white/90 to-blue-50/40 border ${
                          emailError ? 'border-red-300/80 shadow-[inset_2px_2px_8px_rgba(239,68,68,0.08),inset_-2px_-2px_8px_rgba(255,255,255,0.7)]' : 
                          isTyping && formData.email ? 'border-yellow-300/80 shadow-[inset_2px_2px_8px_rgba(251,191,36,0.08),inset_-2px_-2px_8px_rgba(255,255,255,0.7)]' :
                          isEmailValid ? 'border-green-300/80 shadow-[inset_2px_2px_8px_rgba(34,197,94,0.08),inset_-2px_-2px_8px_rgba(255,255,255,0.7)]' : 
                          'border-blue-100/60 shadow-[inset_2px_2px_8px_rgba(59,130,246,0.06),inset_-2px_-2px_8px_rgba(255,255,255,0.7)]'
                        } placeholder-slate-400 text-slate-700 font-medium focus:outline-none focus:shadow-[inset_3px_3px_10px_rgba(59,130,246,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8),0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300`}
                      />
                      
                      {/* Email validation icon */}
                      {formData.email && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          {emailError ? (
                            <AlertCircle size={20} className="text-red-400" />
                          ) : isTyping ? (
                            <AlertTriangle size={20} className="text-yellow-500 animate-pulse" />
                          ) : isEmailValid ? (
                            <CheckCircle size={20} className="text-green-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                    
                    {/* Email validation messages */}
                    {emailError && !isTyping && (
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-500 font-medium">{emailError}</p>
                      </div>
                    )}
                    
                    {isTyping && formData.email && (
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <AlertTriangle size={14} className="text-yellow-500 flex-shrink-0 animate-pulse" />
                        <p className="text-sm text-yellow-600 font-medium">Validating email format...</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Feedback field */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={16} className="text-cyan-500" />
                      <label htmlFor="feedback" className="text-sm font-semibold text-slate-700">Your Feedback</label>
                    </div>
                    <div className="relative">
                      <textarea 
                        name="feedback" 
                        id="feedback" 
                        placeholder="Share your thoughts, suggestions, or ideas with us..."
                        rows="5"
                        value={formData.feedback}
                        onChange={handleChange}
                        className="w-full py-4 px-5 rounded-xl bg-gradient-to-br from-white/90 to-blue-50/40 border border-blue-100/60 shadow-[inset_2px_2px_8px_rgba(59,130,246,0.06),inset_-2px_-2px_8px_rgba(255,255,255,0.7)] placeholder-slate-400 text-slate-700 font-medium resize-none focus:outline-none focus:shadow-[inset_3px_3px_10px_rgba(59,130,246,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8),0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <div className="pt-2">
                    <button 
                      type="button"
                      onClick={handleSubmit}
                      className="group w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-[4px_4px_16px_rgba(59,130,246,0.25),-2px_-2px_12px_rgba(147,197,253,0.3)] hover:shadow-[6px_6px_20px_rgba(59,130,246,0.3),-3px_-3px_16px_rgba(147,197,253,0.4)] active:shadow-[inset_2px_2px_8px_rgba(59,130,246,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      <span>Send Feedback</span>
                      <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
                
                {/* Thank you message hint */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-400 font-medium">
                    Your feedback helps us improve and grow 💙
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/3  via-cyan-400/3 to-blue-600/3 opacity-60 animate-pulse"></div>
        </div>
      </main>
    </>
  );
}

export default FeedbackAdditionComponent;