
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

interface ServicesViewProps {
  onSelectService: (index: number) => void;
}

const ServicesView: React.FC<ServicesViewProps> = ({ onSelectService }) => {
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

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            Tailored BPO Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            We provide high-performance business process outsourcing designed to handle complexity, ensure compliance, and drive customer satisfaction at global scale.
          </motion.p>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="flex flex-col md:flex-row gap-8 group cursor-pointer"
                onClick={() => onSelectService(idx)}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm border border-blue-100">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.tags?.map((tag, i) => (
                      <li key={i} className="flex items-center text-sm font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 transition-colors group-hover:bg-blue-50/30 group-hover:border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
                    View Full Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work - Process */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Implementation Process</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From the initial consultation to full-scale operations, we ensure a seamless integration into your business model.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your unique business requirements and KPIs.' },
              { step: '02', title: 'Onboarding', desc: 'Custom workflow setup and rigorous talent training.' },
              { step: '03', title: 'Pilot', desc: 'Controlled launch to validate processes and quality.' },
              { step: '04', title: 'Optimization', desc: 'Continuous scaling and data-driven performance improvement.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl border border-slate-200 relative overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="text-6xl font-black text-slate-50 absolute -top-4 -right-2 transition-colors group-hover:text-blue-50/50">{item.step}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesView;
