
import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { ViewType } from '../App';
import { SERVICES } from '../constants';
import { ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Mission & Vision', view: 'mission-vision' },
  ];

  const handleNavigate = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => handleNavigate('home')} className="flex items-center hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </button>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavigate(item.view)}
                className={`text-sm font-semibold transition-all relative py-1 ${currentView === item.view
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                {item.label}
                {currentView === item.view && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300"></span>
                )}
              </button>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                onClick={() => handleNavigate('services')}
                className={`text-sm font-semibold transition-all flex items-center space-x-1 py-1 ${currentView === 'services' || currentView === 'think-debt' || currentView === 'service-detail'
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 py-4 overflow-hidden">
                    <div className="px-4 mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our Solutions</span>
                    </div>
                    <div className="space-y-1">
                      <button
                        onClick={() => window.location.href = 'https://thinkoutsource.co.za/thinkdebt-solutions'}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-bold text-slate-900 group-hover:text-blue-600">ThinkDebt Solutions</div>
                        <div className="text-xs text-slate-500">Trusted debt review removal intermediary</div>
                      </button>
                      <div className="h-px bg-slate-100 mx-4 my-2"></div>
                      {SERVICES.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavigate('services')}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors group"
                        >
                          <div className="font-semibold text-slate-700 group-hover:text-slate-900">{service.title}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{service.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigate('contact')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${currentView === 'contact'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
            >
              Contact Us
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-6 px-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigate(item.view)}
              className={`block w-full text-left px-4 py-2 text-lg font-bold ${currentView === item.view ? 'text-blue-600' : 'text-slate-600'
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <span className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Services</span>
            <button
              onClick={() => window.location.href = 'https://thinkoutsource.co.za/thinkdebt-solutions'}
              className={`block w-full text-left px-4 py-3 rounded-xl ${currentView === 'think-debt' ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                }`}
            >
              <div className="font-bold">ThinkDebt Solutions</div>
              <div className="text-xs opacity-70">Debt Review Removal</div>
            </button>
            {SERVICES.map((service, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigate('services')}
                className="block w-full text-left px-4 py-3 text-slate-600 font-medium"
              >
                {service.title}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleNavigate('contact')}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg"
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
