import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Phone, Calendar, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: null },
    { to: '/#services', label: 'Services', icon: null },
    { to: '/#about', label: 'About', icon: null },
    { to: '/#contact', label: 'Contact', icon: null },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.hash === path.replace('/', '');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-600 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                  JediCare
                </span>
                <span className="text-xs text-gray-500 block leading-tight">Medical Centre</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <a
                href="tel:+254700000000"
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">Emergency</span>
              </a>
              <a
                href="#appointment"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden lg:inline">Book Now</span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="absolute inset-0 bg-primary-600 rounded-full blur-sm opacity-0 hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Quick Actions */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                <a
                  href="tel:+254700000000"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <div>
                    <div>Emergency Hotline</div>
                    <div className="text-sm opacity-75">+254 700 000 000</div>
                  </div>
                </a>
                
                <a
                  href="#appointment"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                >
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div>Book Appointment</div>
                    <div className="text-sm opacity-75">Schedule your visit</div>
                  </div>
                </a>
                
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-gray-500">Kapsoya Ward, Uasin Gishu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
