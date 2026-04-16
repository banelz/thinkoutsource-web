import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactView: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Customer Support');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const slots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const eventId = 'contact_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.thinkoutsource.co.za';
      const response = await fetch(`${apiUrl}/submit_contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          serviceInterest,
          message,
          selectedDate,
          selectedSlot,
          event_id: eventId,
        }),
      });

      const result = await response.json();
      if (response.status === 409) {
        alert(result.message);
        return;
      }

      if (result.success) {
        // Meta Pixel Tracking
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Contact', {
            content_name: 'Contact Form Submission',
            service: serviceInterest,
          }, { eventID: eventId });
        }

        setIsSubmitted(true);
        // Reset form
        setFullName('');
        setEmail('');
        setMessage('');
        setSelectedDate(null);
        setSelectedSlot(null);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
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
    <div className="pb-24 overflow-hidden">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Let's Connect</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Ready to scale? Provide your details and pick a time for a strategy session below.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
              {!isSubmitted ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 animate-in fade-in duration-500">
                  {/* Inquiry Details Side */}
                  <div className="lg:col-span-3 p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
                    <h3 className="text-2xl font-bold mb-8 text-slate-900">1. Tell us about your business</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                        <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Email</label>
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="name@company.com" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Service Interest</label>
                        <select value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer">
                          <option>Customer Support</option>
                          <option>Lead Generation</option>
                          <option>Back-Office Operations</option>
                          <option>Debt Review Support</option>
                          <option>International Campaigns</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Inquiry Message</label>
                        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="How can we help you scale?"></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Side */}
                  <div className="lg:col-span-2 p-10 md:p-12 bg-slate-50/50">
                    <h3 className="text-2xl font-bold mb-8 text-slate-900">2. Select a Strategy Slot</h3>

                    <div className="mb-8">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block text-center">March 2024</label>
                      <div className="grid grid-cols-7 gap-2">
                        {days.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setSelectedDate(day)}
                            className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all border ${selectedDate === day
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                              }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedDate ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="duration-300"
                      >
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block text-center">Available Times</label>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${selectedSlot === slot
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-900'
                                }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-center p-4">
                        <span className="text-2xl mb-2">📅</span>
                        <p className="text-xs font-medium">Pick a date to see available strategy slots</p>
                      </div>
                    )}

                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting || !selectedDate || !selectedSlot}
                        className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                      >
                        {isSubmitting ? 'Sending...' : 'Confirm Inquiry & Booking'}
                      </button>
                      <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-widest font-bold">
                        {selectedDate && selectedSlot
                          ? `Selected: March ${selectedDate} @ ${selectedSlot}`
                          : 'Please complete all fields'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 px-10 text-center animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-4">Inquiry & Booking Received!</h4>
                  <p className="text-lg text-slate-600 mb-10 max-w-lg">Thank you for reaching out to Think Outsource. Our strategic team has received your details and locked in your selected slot.</p>
                  <button onClick={() => setIsSubmitted(false)} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95">Send Another Inquiry</button>
                </div>
              )}
            </form>
          </motion.div>

          {/* Location Sidebar equivalent info below */}
          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={leftSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-900 text-white p-10 rounded-[2.5rem]"
            >
              <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">📍</span>
                Headquarters
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                21 Dreyer Street, Claremont, Cape Town, South Africa
              </p>
            </motion.div>
            <motion.div
              variants={rightSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100"
            >
              <h4 className="text-xl font-bold text-blue-900 mb-4">Support Hours</h4>
              <p className="text-blue-800 text-sm font-medium">Monday - Friday: 24 Hours Operations</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactView;
