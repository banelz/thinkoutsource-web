import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WhatsAppChat from './components/WhatsAppChat';
import Logo from './components/Logo';
import { SERVICES } from './constants';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import ServiceDetailView from './components/ServiceDetailView';
import ContactView from './components/ContactView';
import HomeView from './components/HomeView';
import MissionVisionView from './components/MissionVisionView';
import ThinkDebtView from './components/ThinkDebtView';

export type ViewType = 'home' | 'about' | 'mission-vision' | 'services' | 'contact' | 'service-detail' | 'think-debt';

// Map URL paths to views
const getInitialView = (): ViewType => {
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  const pathMap: Record<string, ViewType> = {
    'thinkdebt-solutions': 'think-debt',
    'about': 'about',
    'services': 'services',
    'contact': 'contact',
    'mission-vision': 'mission-vision',
  };
  return pathMap[path] || 'home';
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(getInitialView);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);

  // Update title and scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const titles: Record<ViewType, string> = {
      'home': 'Think Outsource | Premier BPO & Customer Experience',
      'about': 'About Us | Think Outsource',
      'mission-vision': 'Mission & Vision | Think Outsource',
      'services': 'Our Services | Think Outsource',
      'contact': 'Contact Us | Think Outsource',
      'service-detail': 'Service Details | Think Outsource',
      'think-debt': 'ThinkDebt Solutions | Holistic Financial Wellness & Restoration'
    };
    
    document.title = titles[currentView] || 'Think Outsource';
  }, [currentView, selectedServiceIndex]);

  // Meta Pixel Initialization
  useEffect(() => {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (!pixelId || pixelId === 'your_pixel_id_here') return;

    // Base Code
    if (!(window as any).fbq) {
      (window as any).fbq = function() {
        (window as any).fbq.callMethod ? (window as any).fbq.callMethod.apply((window as any).fbq, arguments) : (window as any).fbq.queue.push(arguments);
      };
      if (!(window as any)._fbq) (window as any)._fbq = (window as any).fbq;
      (window as any).fbq.push = (window as any).fbq;
      (window as any).fbq.loaded = true;
      (window as any).fbq.version = '2.0';
      (window as any).fbq.queue = [];
      
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }

    (window as any).fbq('init', pixelId);
    (window as any).fbq('track', 'PageView');

    // Manually capture fbclid for subdomains
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      const now = new Date();
      now.setTime(now.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days
      document.cookie = `_fbc=fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}; expires=${now.toUTCString()}; path=/; domain=.thinkoutsource.co.za`;
    }
  }, []);

  const handleNavigateToService = (index: number) => {
    if (SERVICES[index].title === 'ThinkDebt Solutions') {
      setCurrentView('think-debt');
    } else {
      setSelectedServiceIndex(index);
      setCurrentView('service-detail');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={setCurrentView} onSelectService={handleNavigateToService} />;
      case 'about': return <AboutView onNavigate={setCurrentView} />;
      case 'mission-vision': return <MissionVisionView onNavigate={setCurrentView} />;
      case 'services': return <ServicesView onSelectService={handleNavigateToService} />;
      case 'think-debt': return <ThinkDebtView onNavigate={setCurrentView} />;
      case 'service-detail': 
        return selectedServiceIndex !== null ? (
          <ServiceDetailView 
            service={SERVICES[selectedServiceIndex]} 
            onBack={() => setCurrentView('services')} 
            onBook={() => setCurrentView('contact')}
          />
        ) : <ServicesView onSelectService={handleNavigateToService} />;
      case 'contact': return <ContactView />;
      default: return <HomeView onNavigate={setCurrentView} onSelectService={handleNavigateToService} />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="pt-20">
        {renderView()}
      </main>

      {/* Shared Footer */}
      <footer className="bg-slate-50 text-slate-900 pt-32 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-10">
                <Logo size="lg" />
              </div>
              <p className="text-slate-500 max-w-sm mb-10 text-lg leading-relaxed">
                Dedicated customer experience and business process outsourcing partner, established in 2023. Dedicated to operational excellence and global support solutions.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 flex items-center justify-center border-2 border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-slate-400">Services</h4>
              <ul className="space-y-5 text-slate-700 font-medium">
                {SERVICES.map((s, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleNavigateToService(idx)} 
                      className="hover:text-blue-600 transition-colors text-left"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-slate-400">Company</h4>
              <ul className="space-y-5 text-slate-700 font-medium">
                <li><button onClick={() => setCurrentView('about')} className="hover:text-blue-600 transition-colors text-left">About Us</button></li>
                <li><button onClick={() => setCurrentView('mission-vision')} className="hover:text-blue-600 transition-colors text-left">Mission & Vision</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-blue-600 transition-colors text-left">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-medium">
            <p>&copy; 2024 Think Outsource. All rights reserved. Established 2023.</p>
            <div className="mt-6 md:mt-0 flex space-x-8 uppercase tracking-widest text-xs">
              <span>Claremont, Cape Town</span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppChat />
    </div>
  );
};

export default App;