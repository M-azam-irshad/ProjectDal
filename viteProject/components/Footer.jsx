import { Mail, Linkedin, Instagram, ExternalLink, Heart } from "lucide-react";
import {Link} from "react-router-dom"
import {HashLink} from "react-router-hash-link"
function Footer() {
  const centerMenuItem = [
    {name:"Home", path:"/"},
    {name:"Discover", path:"/projects"},
    {name:"About", path:"/about"},
  ]
  return (
    <footer className="w-full bg-gradient-to-br from-blue-700 via-blue-500 to-blue-200 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-20 w-16 h-16 bg-white/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-32 w-12 h-12 bg-white/20 rounded-full blur-lg"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-6 py-8 min-h-28 relative z-10">
        {/* Left Section - Copyright */}
        <div className="flex flex-col space-y-3">
          <p
            className="font-light text-white/95 text-sm"
            style={{ fontFamily: "Segoe UI, sans-serif" }}
          >
            © 2025 ProjectDal. All rights reserved.
          </p>
          <p
            className="font-light text-white/90 text-sm flex items-center"
            style={{ fontFamily: "Segoe UI, sans-serif" }}
          >
            Made with <Heart size={14} className="mx-1 text-red-300 fill-current" /> by team ProjectDal
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex flex-col space-y-4 items-center">
          {/* Navigation Links with Claymorphism */}
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30 shadow-lg">
          <nav className="flex space-x-6">
  {centerMenuItem.map((item) =>
    item.name === "Home" ? (
      <HashLink
        key={item.name}
        smooth
        to="/#top"   // make sure your home page has <div id="top"></div>
        className="text-white/90 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center group"
        style={{ fontFamily: "Segoe UI, sans-serif" }}
      >
        {item.name}
      </HashLink>
    ) : (
      <Link
        key={item.name}
        to={item.path}
        className="text-white/90 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center group"
        style={{ fontFamily: "Segoe UI, sans-serif" }}
      >
        {item.name}
        <ExternalLink
          size={12}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </Link>
    )
  )}
</nav>

          </div>

          {/* Company Tagline */}
          <p className="text-white/80 text-xs text-center max-w-xs leading-relaxed" style={{ fontFamily: "Segoe UI, sans-serif" }}>
            Crafting digital experiences that matter
          </p>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex flex-row space-x-4">
          {[
            { Icon: Mail, href: 'mailto:hello@projectdal.com', label: 'Email' },
            { Icon: Linkedin, href: '#', label: 'LinkedIn' },
            { Icon: Instagram, href: '#', label: 'Instagram' }
          ].map(({ Icon: SocialIcon, href, label }) => (
            <a
              key={label}
              href={href}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-lg border border-white/30 group"
              aria-label={label}
            >
              <SocialIcon 
                size={18} 
                className="text-white/90 group-hover:text-white transition-colors" 
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-6 relative z-10">
        {/* Top Row - Copyright */}
        <div className="text-center mb-6">
          <p
            className="font-light text-white/95 text-sm mb-2"
            style={{ fontFamily: "Segoe UI, sans-serif" }}
          >
            © 2025 ProjectDal. All rights reserved.
          </p>
          <p
            className="font-light text-white/90 text-sm flex items-center justify-center"
            style={{ fontFamily: "Segoe UI, sans-serif" }}
          >
            Made with <Heart size={14} className="mx-1 text-red-300 fill-current" /> by team ProjectDal
          </p>
        </div>

        {/* Middle Row - Navigation */}
        
        <div className="mb-6">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-lg">
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {[
                {name:"Home", path:"/"},
                {name:"Projects", path:"/allprojects"},
                {name:"About", path:"/about"},
                
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white/90 hover:text-white text-sm font-medium transition-all duration-300"
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Tagline */}
          <p className="text-white/80 text-xs text-center mt-3 leading-relaxed" style={{ fontFamily: "Segoe UI, sans-serif" }}>
            Crafting digital experiences that matter
          </p>
        </div>

        {/* Bottom Row - Social Icons */}
        <div className="flex justify-center space-x-6">
          {[
            { Icon: Mail, href: 'mailto:hello@projectdal.com', label: 'Email' },
            { Icon: Linkedin, href: '#', label: 'LinkedIn' },
            { Icon: Instagram, href: '#', label: 'Instagram' }
          ].map(({ Icon: SocialIcon, href, label }) => (
            <a
              key={label}
              href={href}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-lg border border-white/30 group"
              aria-label={label}
            >
              <SocialIcon 
                size={20} 
                className="text-white/90 group-hover:text-white transition-colors" 
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;