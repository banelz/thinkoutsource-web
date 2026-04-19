import React, { useState } from 'react';
import { Shield, CheckCircle, Lock, AlertTriangle, ArrowRight, HelpCircle, ChevronDown, ChevronUp, UserCheck, Search, FileText, Smartphone, TrendingUp, BookOpen, Activity, Heart, FileSearch, Users, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewType } from '../App';

interface ThinkDebtViewProps {
  onNavigate: (view: ViewType) => void;
}

const ThinkDebtView: React.FC<ThinkDebtViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [debtStatus, setDebtStatus] = useState('Currently under Debt Review');
  const [employmentStatus, setEmploymentStatus] = useState('Employed');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serviceInterest, setServiceInterest] = useState('Debt Review Removal');
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

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
          full_name: fullName,
          phone: formattedPhone,
          email,
          serviceInterest,
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
            content_name: 'ThinkDebt Form Submission',
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

  const faqs = [
    {
      question: "How do I know which financial service is right for me?",
      answer: "Every individual's situation is unique. When you submit your interest, you are matched with a trained specialist who conducts a comprehensive assessment to recommend the most effective path—whether it's debt restructuring, insurance protection, or digital budgeting tools."
    },
    {
      question: "What can I expect during the consultation process?",
      answer: "You'll speak with a vetted professional who will listen to your goals and challenges. They provide clear, expert guidance on the options available to you, helping you make an informed decision without any pressure."
    },
    {
      question: "How does ThinkDebt Solutions ensure the quality of its partners?",
      answer: "We employ a rigorous 5-step vetting process. Every partner must be fully compliant with South African regulations (like the NCR and FSCA), maintain a proven track record of success, and adhere to our strict ethical standards for transparency and service."
    },
    {
      question: "Is my personal information safe with ThinkDebt Solutions?",
      answer: "Absolutely. We are fully POPIA (Protection of Personal Information Act) compliant. Your data is encrypted and only shared with the specific vetted specialist assigned to your case. Your privacy and security are our highest priorities."
    }
  ];

  const steps = [
    {
      title: "Secure Submission",
      description: "Submit your details through our encrypted portal. Every request is reviewed by a professional to ensure the right path forward.",
      icon: <FileText className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Expert Consultation",
      description: "You are matched with a highly trained, NCR-compliant financial specialist equipped to assist with your specific service interest.",
      icon: <Search className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Professional Resolution",
      description: "Your assigned specialist manages the end-to-end process, providing expert guidance and administrative support for your chosen solution.",
      icon: <UserCheck className="w-8 h-8 text-blue-600" />
    }
  ];

  const specializedServices = [
    {
      title: "Debt Review Removal",
      desc: "Expert legal assistance to rescind your debt review status once your circumstances have improved or if you were incorrectly listed.",
      icon: <Shield className="w-10 h-10 text-blue-600 mb-4" />,
      features: ["Court order rescission", "Credit bureau flag clearing", "Financial name restoration"]
    },
    {
      title: "Debt Mediation",
      desc: "A voluntary alternative focused on expert negotiation directly with your creditors to achieve financial relief without a formal court order.",
      icon: <Users className="w-10 h-10 text-emerald-600 mb-4" />,
      features: ["No formal legal orders", "Negotiated interest rate reductions", "Flexible repayment terms"]
    },
    {
      title: "Debt Review",
      desc: "A formal, legally protected process to restructure your obligations into a single, affordable monthly installment.",
      icon: <FileText className="w-10 h-10 text-blue-500 mb-4" />,
      features: ["Consolidated repayments", "Legal protection from creditors", "Fixed installment plans"]
    }
  ];

  const lifestyleProducts = [
    { icon: <Smartphone className="w-8 h-8 text-blue-600" />, title: "Budgeting Tools & Apps", desc: "Subscription-based access to premium financial management tools and applications." },
    { icon: <TrendingUp className="w-8 h-8 text-blue-600" />, title: "Credit Score Monitoring Services", desc: "Real-time tracking and intelligent reports of your credit health with professional score monitoring." },
    { icon: <BookOpen className="w-8 h-8 text-blue-600" />, title: "Financial Education", desc: "Memberships or courses designed to help you master money management and financial literacy." },
    { icon: <Activity className="w-8 h-8 text-blue-600" />, title: "Spending Trackers", desc: "Advanced banking insight tools that provide deep visibility into your daily expenses and habits." }
  ];

  const financialProtection = [
    {
      title: "Credit Life Insurance",
      desc: "Comprehensive protection that covers your outstanding debt in the event of death, disability, or unemployment.",
      icon: <CreditCard className="w-12 h-12 text-blue-600" />
    },
    {
      title: "Funeral Cover Plans",
      desc: "Affordable, high-benefit funeral plans that provide financial security and peace of mind during difficult times.",
      icon: <Heart className="w-12 h-12 text-blue-600" />
    },
    {
      title: "Income Protector",
      desc: "Safeguards your primary income stream, ensuring monthly commitments are met despite unexpected life events.",
      icon: <Activity className="w-12 h-12 text-blue-600" />
    },
    {
      title: "Administration Order Removal",
      desc: "Expert legal assistance to rescind administration orders, clearing your name and restoring your full credit profile.",
      icon: <FileSearch className="w-12 h-12 text-blue-600" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 inline-block"
          >
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-slate-800">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-center">
                In Partnership with an NCR Compliant company that has • Over 30 Years Combined Expertise
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={leftSlideVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight"
          >
            A Holistic Approach to <br />
            <span className="text-blue-600">Financial Wellness.</span>
          </motion.h1>

          <motion.p
            variants={rightSlideVariants}
            initial="hidden"
            animate="visible"
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            ThinkDebt Solutions provides a gateway to total financial restoration. Through our partnership with a premier, NCR-vetted debt management company, we offer expert-led solutions for every stage of your financial journey.
          </motion.p>

          <div className="relative z-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="p-12 lg:p-20 bg-slate-900 text-white">
                <h2 className="text-4xl font-bold mb-8">Consult with a Trained Specialist</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Every financial specialist in our network undergoes a rigorous 5-step vetting process before they can help even a single ThinkDebt customer.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold">100% Secure</h4>
                      <p className="text-sm text-slate-500">Your data is encrypted and protected.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold">Vetted Specialists</h4>
                      <p className="text-sm text-slate-500">Only the best, compliant partners.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12 lg:p-20">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                        <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={phone} 
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError('');
                          }} 
                          className={`w-full px-6 py-4 bg-slate-50 border ${phoneError ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`} 
                          placeholder="082 123 4567" 
                        />
                        {phoneError && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            {phoneError}
                          </motion.p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Primary Service Interest</label>
                      <select 
                        value={serviceInterest} 
                        onChange={(e) => setServiceInterest(e.target.value)} 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        {specializedServices.map(s => (
                          <option key={s.title} value={s.title}>{s.title}</option>
                        ))}
                        <option>Administration Order Removal</option>
                        <optgroup label="Digital Lifestyle Products">
                          {lifestyleProducts.map(p => (
                            <option key={p.title} value={p.title}>{p.title}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Financial Protection">
                          {financialProtection.map(f => (
                            <option key={f.title} value={f.title}>{f.title}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Current Debt Status</label>
                      <select value={debtStatus} onChange={(e) => setDebtStatus(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none">
                        <option>Currently under Debt Review</option>
                        <option>Debts paid, but flag remains</option>
                        <option>Incorrectly placed under review</option>
                        <option>Other / Not sure</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Employment Status</label>
                        <select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none">
                          <option>Employed</option>
                          <option>Unemployed</option>
                          <option>Student</option>
                          <option>Retired</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Employment Type</label>
                        <div className="relative">
                          <select 
                            disabled={employmentStatus !== 'Employed'}
                            value={employmentType} 
                            onChange={(e) => setEmploymentType(e.target.value)} 
                            className={`w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none ${
                              (employmentStatus !== 'Employed') ? 'opacity-50 grayscale bg-slate-100 cursor-not-allowed' : 'opacity-100'
                            }`}
                          >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Self-Employed</option>
                            <option>Freelance</option>
                            <option>Other</option>
                          </select>
                          {(employmentStatus === 'Employed') && (
                            <motion.div 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute -right-2 -top-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-8">
                      {formError && (
                        <motion.div 
                          className="p-4 mb-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium">{formError}</p>
                        </motion.div>
                      )}
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-200 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Securely'}
                      </button>
                    </div>
                    <p className="text-center text-xs text-slate-400">
                      By submitting, you agree to our privacy policy and consent to being contacted by a vetted specialist.
                    </p>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-500 py-12">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h4 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted Successfully</h4>
                    <p className="text-lg text-slate-600 mb-10 max-w-sm mx-auto">One of our verified specialists will review your details and contact you shortly to discuss your unique needs.</p>
                    <button onClick={() => setIsSubmitted(false)} className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">Submit another request</button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Holistic Financial Restoration Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={leftSlideVariants}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Path to Financial Restoration</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                True financial wellness is about more than just managing debt—it's about restoring your financial integrity and building a foundation for sustainable growth. 
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Whether you're looking to clear legal flags from your profile, protect your family with specialized cover, or master your daily spending, ThinkDebt Solutions connects you with the exact expertise required to move forward with confidence.
              </p>
              <div className="space-y-4">
                {[
                  "Holistic profile restoration",
                  "Verified legal & administrative support",
                  "Proactive financial management tools"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={rightSlideVariants}
              className="bg-slate-50 p-12 rounded-3xl border border-slate-100 relative"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Trust Our Process?</h3>
              <p className="text-slate-600 mb-6">
                The financial services landscape can be overwhelming. ThinkDebt Solutions acts as your professional buffer, ensuring every service you access is:
              </p>
              <ul className="space-y-4">
                {[
                  "NCR & Regulatory Compliant",
                  "Vetted for Ethical Standards",
                  "Focused on Long-term Results"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 text-slate-700"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialized Solutions Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Expert Financial Solutions</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional services tailored to help you resolve your unique financial challenges safely and efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specializedServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
              >
                {service.icon}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8">{service.desc}</p>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Lifestyle Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={leftSlideVariants}
              className="lg:w-1/3"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Digital Lifestyle Products</h2>
              <p className="text-lg text-slate-600 mb-8">Empowering you with the digital tools and knowledge to stay financially healthy for life.</p>
              <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
                <h4 className="text-xl font-bold mb-2">Smart Subscriptions</h4>
                <p className="text-blue-100">Access elite financial tools through our partner ecosystem.</p>
              </div>
            </motion.div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lifestyleProducts.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all hover:shadow-lg group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{p.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Protection Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Financial Protection & Legal Restoration</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Securing your future means looking beyond debt removal. Our extended services provide a safety net for your family and legal clarity for your profile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {financialProtection.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">How ThinkDebt Solutions Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Our three-step process is designed to be simple, secure, and effective.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative p-10 bg-slate-800/50 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all group"
              >
                <div className="text-5xl font-bold text-slate-700 mb-8 group-hover:text-blue-500/20 transition-colors">0{idx + 1}</div>
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-4 overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="block"
                  >
                    {step.title}
                  </motion.span>
                </h3>
                <p className="text-slate-400 leading-relaxed overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.1 }}
                    viewport={{ once: true }}
                    className="block"
                  >
                    {step.description}
                  </motion.span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vetting & Scam Protection */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={leftSlideVariants}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Shield className="w-10 h-10 text-emerald-600 mb-4" />, title: "Verified Partners", desc: "Only NCR-compliant specialists.", bg: "bg-emerald-50", border: "border-emerald-100" },
                  { icon: <Lock className="w-10 h-10 text-blue-600 mb-4" />, title: "Data Security", desc: "Bank-grade encryption for your data.", bg: "bg-blue-50", border: "border-blue-100" },
                  { icon: <AlertTriangle className="w-10 h-10 text-amber-600 mb-4" />, title: "Scam Protection", desc: "We filter out fraudulent services.", bg: "bg-amber-50", border: "border-amber-100" },
                  { icon: <CheckCircle className="w-10 h-10 text-slate-600 mb-4" />, title: "Proven Results", desc: "Partners with high success rates.", bg: "bg-slate-50", border: "border-slate-100" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className={`p-8 ${item.bg} rounded-3xl border ${item.border}`}
                  >
                    {item.icon}
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={rightSlideVariants}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Security is Our Priority</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The debt review removal market in South Africa is unfortunately targeted by scammers who make unrealistic promises or mismanage sensitive data.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                ThinkDebt Solutions was founded to solve this problem. We perform deep due diligence on every company we affiliate with, checking their legal standing, past client reviews, and compliance with the National Credit Regulator.
              </p>
              <div className="p-6 bg-slate-900 text-white rounded-2xl flex items-center space-x-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="font-medium">We protect your data and your future.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about our service and the process.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900">{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThinkDebtView;
