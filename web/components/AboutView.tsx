import React from 'react';
import { motion } from 'framer-motion';
import { ViewType } from '../App';
import { SERVICES } from '../constants';
import aboutImage from '../src/assets/images/pexels-mikhail-nilov-8101453.jpg';

interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
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
      {/* Our Story Header */}
      <header className="relative py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              variants={leftSlideVariants}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-8 border border-blue-100">
                Established 2023
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                Our <span className="text-blue-600">Story.</span>
              </h1>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Think Outsource is a customer experience and business process outsourcing partner dedicated to helping companies operate smarter, faster, and more cost-effectively.
                </p>
                <p className="font-semibold text-slate-900">
                  Built on a foundation of operational excellence, we leverage deep industry expertise to deliver high-quality outsourced services tailored to the demands of the modern global enterprise.
                </p>
                <p>
                  We exist to give organizations the freedom to scale without the burden of administrative overhead, staffing limitations, or rising operational costs. Our goal is simple: create efficient, reliable, and customer-centric support systems that drive measurable performance improvements.
                </p>
              </div>
            </motion.div>
            <motion.div 
              variants={rightSlideVariants}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={aboutImage} 
                  alt="Think Outsource Workspace" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Who We Are</h2>
            <p className="text-slate-600 text-xl max-w-4xl leading-relaxed">
              Think Outsource was built to meet a growing demand for professional, flexible, and high-performance BPO services. Our capabilities are designed around one core principle: <span className="text-blue-600 font-bold">operational excellence.</span>
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {[
              { title: "Skilled Customer Service Teams", icon: "👥" },
              { title: "Advanced Workflow Systems", icon: "⚙️" },
              { title: "Process-Driven Operations", icon: "📊" },
              { title: "Compliance-Based Management", icon: "🛡️" },
              { title: "Culture of Accountability", icon: "🤝" },
              { title: "Continuous Improvement", icon: "📈" }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl border border-slate-200 group hover:border-blue-500 transition-colors"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-blue-600 text-white rounded-3xl text-center font-medium text-lg"
          >
            Our teams undergo rigorous training and quality checks to ensure consistent delivery, whether handling inbound queries, outbound engagements, or back-office processes.
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-16 text-center"
          >
            What We Do
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 group hover:bg-white hover:shadow-xl transition-all h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
                <button 
                  onClick={() => onNavigate('services')}
                  className="text-blue-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform"
                >
                  Learn More <span className="ml-2">→</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Businesses Choose Us</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Strategic advantages that define our operational reliability and market authority.</p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                title: "Operational Reliability", 
                desc: "We maintain strict service-level management, performance monitoring, and compliance checks.",
                icon: "⚡"
              },
              { 
                title: "High-Quality Talent", 
                desc: "Our agents are trained to deliver professional communication, empathy, and problem-solving at scale.",
                icon: "🌟"
              },
              { 
                title: "Process-Driven Systems", 
                desc: "Every workflow is optimized for speed, accuracy, and measurable output.",
                icon: "🌀"
              },
              { 
                title: "Cost Efficiency", 
                desc: "We help organizations reduce operational expenses without compromising service quality.",
                icon: "💰"
              },
              { 
                title: "Scalable Infrastructure", 
                desc: "As your business grows, we grow with you—staffing, systems, and resources scale on demand.",
                icon: "🚀"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
