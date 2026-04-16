
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../constants';

interface ServiceDetailViewProps {
  service: Service;
  onBack: () => void;
  onBook: () => void;
}

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service, onBack, onBook }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

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
    <div className="overflow-hidden">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center text-slate-500 hover:text-blue-600 font-semibold mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Services
          </motion.button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <motion.div 
              variants={leftSlideVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-6"
            >
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl">
                {React.cloneElement(service.icon as React.ReactElement, { className: 'w-10 h-10' })}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{service.title}</h1>
                <p className="text-slate-500 font-medium text-lg mt-1">{service.description}</p>
              </div>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onBook}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
            >
              Request a Meeting
            </motion.button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Service Overview</h2>
                <p className="text-slate-600 text-xl leading-relaxed">
                  {service.longDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Experience</h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-3xl">
                  <p className="text-blue-900 text-lg leading-relaxed font-medium">
                    {service.experience}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Why We Are the Best Choice</h2>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {service.whyUs.map((point, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants}
                      className="flex gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700 font-semibold leading-snug">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-8">
              <motion.div 
                variants={rightSlideVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl font-bold mb-6">Ready to Scale?</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Join the growing list of enterprises that trust Think Outsource for their operational excellence.
                </p>
                <button 
                  onClick={onBook}
                  className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Book Your Discovery Call
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem]"
              >
                <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Capabilities Included</h4>
                <ul className="space-y-3">
                  {service.tags.map((tag, idx) => (
                    <li key={idx} className="flex items-center text-slate-600 font-medium text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8"
          >
            Start Your Journey with Think Outsource Today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Experience the difference that operational reliability and high-performance teams can make for your bottom line.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={onBook}
            className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl shadow-2xl hover:bg-slate-50 transition-all active:scale-95"
          >
            Get Started
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailView;
