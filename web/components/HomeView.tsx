import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Lock, AlertTriangle } from 'lucide-react';
import { ViewType } from '../App';
import { SERVICES } from '../constants';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectService: (index: number) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectService }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [debtStatus, setDebtStatus] = useState('Currently under Debt Review');
  const [employmentStatus, setEmploymentStatus] = useState('Employed');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    const eventId = 'lead_home_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    const formatPhoneSA = (p: string) => {
      let digits = p.replace(/\D/g, '');
      if (digits.startsWith('0') && digits.length === 10) {
        digits = '27' + digits.substring(1);
      }
      if (digits.length === 9) {
        digits = '27' + digits;
      }
      if (digits.length !== 11 || !digits.startsWith('27')) {
        return null;
      }
      return '+' + digits;
    };

    const formattedPhone = formatPhoneSA(phone);
    if (!formattedPhone) {
      setPhoneError("Please enter a valid South African phone number (e.g., 082 123 4567)");
      setIsSubmitting(false);
      return;
    }
    setPhoneError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.thinkoutsource.co.za';
      const response = await fetch(`${apiUrl}/submit_debt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone: formattedPhone,
          email,
          debtStatus,
          employmentStatus,
          employmentType: employmentStatus === 'Employed' ? employmentType : 'N/A',
          event_id: eventId,
        }),
      });

      const result = await response.json();
      if (response.status === 409) {
        setFormError(result.message);
        return;
      }

      if (result.success) {
        // Meta Pixel Lead Tracking
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Home ThinkDebt Form Submission',
            status: debtStatus,
          }, { eventID: eventId });
        }
        
        setIsSubmitted(true);
        setFullName('');
        setPhone('');
        setEmail('');
      } else {
        setFormError("Error: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Mega Hero */}
      <section className="relative pt-0 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-white -z-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-200"
              >
                Africa's Leading BPO Partner
              </motion.div>
              <motion.h1 
                variants={leftSlideVariants}
                initial="hidden"
                animate="visible"
                className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-8"
              >
                Outsource with <span className="text-blue-600">Confidence.</span>
              </motion.h1>
              <motion.p 
                variants={leftSlideVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl"
              >
                Operational excellence, scalable talent, and process-driven systems for the modern enterprise.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6"
              >
                <button onClick={() => onNavigate('contact')} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95">
                  Get a Free Proposal
                </button>
                <button onClick={() => onNavigate('services')} className="px-12 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all">
                  Our Services
                </button>
              </motion.div>
            </div>
            <motion.div 
              variants={rightSlideVariants}
              initial="hidden"
              animate="visible"
              className="lg:w-2/5 relative"
            >
              <div className="w-full aspect-square bg-blue-600 rounded-[4rem] rotate-3 absolute top-0 -z-10 shadow-2xl"></div>
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1470&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-[4rem] shadow-2xl" alt="Professional office" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.6em] block mb-4">Enterprise Partnerships</span>
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tighter">
              Brands that <span className="font-black text-blue-600 italic">trust us.</span>
            </h2>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-16 md:gap-32"
          >
            <motion.div variants={itemVariants}>
              <img 
                src="https://www.mbolo-sa.co.za/wp-content/uploads/2026/01/WhatsApp-removebg-preview-269x151-1.png" 
                alt="Partner Brand Logo" 
                className="h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-500 transform hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySAXwR6SJii9z4LOIjt-_12_H7WYdwGXDsg&s" 
                alt="Partner Brand Logo" 
                className="h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-500 transform hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQpFPKTEz2xaV9_-gQIGrlzxJcM-y0afTGA&s" 
                alt="Partner Brand Logo" 
                className="h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-500 transform hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Global BPO Advantage Section */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 500 Q250 200 500 500 T1000 500" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 600 Q250 300 500 600 T1000 600" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              variants={leftSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="inline-flex px-3 py-1 bg-blue-600 rounded-md text-[10px] font-black uppercase tracking-[0.2em] mb-6">Market Authority</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                The World’s #1 Destination <br className="hidden md:block" /> for <span className="text-blue-400">Customer Success.</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                South Africa is globally recognized as a top BPO destination, ranked first in customer lifecycle management and value delivery, and voted one of the most favored offshore outsourcing hubs.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Leveraging this regional excellence, <span className="text-white font-bold">Think Outsource</span> provides affordable, high-quality lead generation, trained SDRs, and talent hiring solutions to help businesses in <span className="text-blue-400 font-semibold">South Africa, USA, UK, Australia, and Europe</span> scale smarter and faster—at a fraction of the cost.
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 grid grid-cols-1 gap-6"
            >
              {[
                { label: 'Ranked 1st', value: 'Lifecycle Management' },
                { label: 'Top Hub', value: 'Voted Most Favored Offshore' },
                { label: 'Global Scale', value: 'USA • UK • AU • EU • SA' }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all"
                >
                  <div className="text-blue-400 font-black text-2xl mb-1">{stat.label}</div>
                  <div className="text-slate-100 font-bold uppercase tracking-widest text-xs">{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ThinkDebt Solutions Featured Section */}
      <section className="py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 transform translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[3rem] shadow-2xl shadow-blue-200/50 overflow-hidden flex flex-col lg:flex-row"
          >
            <div className="lg:w-1/2 p-12 md:p-20">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">New Solution</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                ThinkDebt <br />
                <span className="text-blue-600">Solutions.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Struggling with debt review? We connect you to vetted, reputable specialists in South Africa who help you remove debt review legally and ethically. Protect yourself from scams with our trusted intermediary service.
              </p>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm" placeholder="John Doe" />
                    </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={phone} 
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError('');
                          }} 
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${phoneError ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-100'} rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all`} 
                          placeholder="082 123 4567" 
                        />
                        {phoneError && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1 pl-1"
                          >
                            <AlertTriangle className="w-2.5 h-2.5" />
                            {phoneError}
                          </motion.p>
                        )}
                      </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Debt Status</label>
                    <select value={debtStatus} onChange={(e) => setDebtStatus(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none text-xs">
                      <option>Currently under Debt Review</option>
                      <option>Debts paid, but flag remains</option>
                      <option>Incorrectly placed under review</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Employment</label>
                      <select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none text-xs">
                        <option>Employed</option>
                        <option>Unemployed</option>
                        <option>Student</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Type</label>
                      <select 
                        disabled={employmentStatus !== 'Employed'}
                        value={employmentType} 
                        onChange={(e) => setEmploymentType(e.target.value)} 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none text-xs"
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Self-Employed</option>
                      </select>
                    </div>
                  </div>
                  {formError && (
                    <motion.div 
                      className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium leading-relaxed">{formError}</p>
                    </motion.div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-xl disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center mt-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Get Connected Now'}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Request Submitted</h4>
                  <p className="text-slate-500 text-xs mb-6 max-w-[200px] mx-auto">A specialist will contact you shortly.</p>
                  <button onClick={() => setIsSubmitted(false)} className="px-5 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-200 transition-colors">Submit another</button>
                </div>
              )}
            </div>
            <div className="lg:w-1/2 bg-slate-900 p-12 md:p-20 flex flex-col justify-center">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">Vetted Specialists</h4>
                    <p className="text-slate-400">We only refer you to NCR-compliant, verified professionals with proven track records.</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">Secure & Confidential</h4>
                    <p className="text-slate-400">Your data is protected under POPIA compliance and bank-grade encryption.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            How We Drive Growth
          </motion.h2>
          <button onClick={() => onNavigate('services')} className="text-blue-600 font-bold hover:underline">View All Capabilities &rarr;</button>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES.slice(0, 3).map((s, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group" 
              onClick={() => onSelectService(i)}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.description}</p>
              <div className="text-blue-600 text-xs font-bold uppercase tracking-widest flex items-center">
                Learn More
                <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomeView;
