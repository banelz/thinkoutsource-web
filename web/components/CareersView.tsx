import React from 'react';

const CareersView: React.FC = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cvLink, setCvLink] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const eventId = 'career_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.thinkoutsource.co.za';
      const response = await fetch(`${apiUrl}/submit_career`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          cvLink,
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
          (window as any).fbq('track', 'Lead', {
            content_name: 'Career Application',
          }, { eventID: eventId });
        }

        setIsSubmitted(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setCvLink('');
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

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-blue-600 py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Empowering African Talent</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Think Outsource is more than a workplace. We are a community dedicated to professional growth, accountability, and excellence in global customer service.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Why Grow With Us?</h2>
              <div className="space-y-8">
                {[
                  { title: "World-Class Training", desc: "Access to industry-leading operational standards and global compliance expertise." },
                  { title: "Global Exposure", desc: "Work with international brands and learn global market standards." },
                  { title: "Accountability Culture", desc: "A supportive environment where continuous improvement is rewarded." },
                  { title: "Career Progression", desc: "We promote from within. Your growth is our success." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-200">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Express Interest</h3>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">First Name</label>
                      <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Last Name</label>
                      <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">CV / Resume Link</label>
                    <input required type="text" value={cvLink} onChange={(e) => setCvLink(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="LinkedIn or Google Drive link" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Expression of Interest'}
                  </button>
                  <p className="text-xs text-slate-400 text-center">By submitting, you agree to our recruitment data processing policy.</p>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">Application Received!</h4>
                  <p className="text-slate-600 mb-8 max-w-sm">Thank you for your interest in growing with us. Our recruitment team will review your details shortly.</p>
                  <button onClick={() => setIsSubmitted(false)} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-colors">Submit Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersView;