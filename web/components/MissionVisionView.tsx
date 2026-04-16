
import React from 'react';
import { motion } from 'framer-motion';
import { ViewType } from '../App';

interface MissionVisionViewProps {
  onNavigate: (view: ViewType) => void;
}

const MissionVisionView: React.FC<MissionVisionViewProps> = ({ onNavigate }) => {
  const leftSlideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rightSlideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-[70vh] overflow-hidden">
      {/* Hero */}
      <header className="pt-24 pb-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          >
            Our Purpose
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            Mission & <span className="text-blue-400">Vision.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed"
          >
            The driving force behind every interaction, process, and partnership at Think Outsource.
          </motion.p>
        </div>
      </header>

      {/* Mission & Vision Grid */}
      <section className="py-24 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div 
              variants={leftSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 transform hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Our Mission</h2>
              <p className="text-slate-600 text-xl leading-relaxed">
                To empower businesses with intelligent outsourcing solutions that enhance service quality, operational efficiency, and customer satisfaction—while supporting scalable growth across global markets.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              variants={rightSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-900 p-12 md:p-16 rounded-[3rem] shadow-2xl border border-slate-800 transform hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-10 shadow-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-8">Our Vision</h2>
              <p className="text-slate-300 text-xl leading-relaxed">
                To become one of Africa’s leading BPO partners—recognized for consistency, innovation, and customer service excellence—while contributing to sustainable job creation and global market competitiveness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Conviction */}
      <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Contributing to a Global Africa
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 leading-relaxed mb-12"
          >
            Our vision extends beyond business metrics. We are dedicated to showcasing the high-caliber talent of the African continent to the global stage, proving that South Africa is the premier choice for premium outsourcing.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => onNavigate('contact')}
            className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-xl hover:bg-blue-50 transition-all active:scale-95"
          >
            Join Our Mission
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default MissionVisionView;
