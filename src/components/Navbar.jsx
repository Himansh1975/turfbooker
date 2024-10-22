import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, logout, getCurrentUser } from '../utils/auth';
import { Menu, X, User, LogOut, Home, Calendar, LogIn, Dribbble } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavItem = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        location.pathname === to
          ? 'bg-blue-600 text-white'
          : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
      }`}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          >
            <Dribbble size={28} className="text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              TurfBooker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavItem to="/" icon={Home}>Home</NavItem>
            <NavItem to="/turfs" icon={Dribbble}>Turfs</NavItem>
            {authenticated ? (
              <>
                <NavItem to="/profile" icon={User}>Profile</NavItem>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-300"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
                <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300">
                  <User size={16} />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                </div>
              </>
            ) : (
              <>
                <NavItem to="/login" icon={LogIn}>Login</NavItem>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  <Calendar size={18} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-t`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <MobileNavItem to="/" icon={Home} onClick={() => setIsOpen(false)}>
            Home
          </MobileNavItem>
          <MobileNavItem to="/turfs" icon={Dribbble} onClick={() => setIsOpen(false)}>
            Turfs
          </MobileNavItem>
          {authenticated ? (
            <>
              <MobileNavItem to="/profile" icon={User} onClick={() => setIsOpen(false)}>
                Profile
              </MobileNavItem>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <MobileNavItem to="/login" icon={LogIn} onClick={() => setIsOpen(false)}>
                Login
              </MobileNavItem>
              <MobileNavItem to="/signup" icon={Calendar} onClick={() => setIsOpen(false)}>
                Sign Up
              </MobileNavItem>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const MobileNavItem = ({ to, icon: Icon, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;
