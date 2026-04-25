import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Check, AlertCircle, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
// Replace this URL with your generated Zapier Webhook URL, Formspree endpoint, or Make.com webhook.
const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/21234885/uv3oubg/";

// Reusable Polaroid Component to keep our code clean
const Polaroid = ({ src, alt, caption, date, rotation, fallback }) => (
  <div className={`bg-[#fcfcfb] p-3 pb-10 shadow-[0_15px_35px_rgb(0,0,0,0.1)] border border-stone-200 pointer-events-none ${rotation}`}>
    <div className="w-full aspect-[4/5] bg-stone-100 overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = fallback; }}
      />
    </div>
    <div className="mt-4 text-center">
      <p className="font-serif italic text-stone-700 text-xl">{caption}</p>
      <p className="text-stone-400 text-[9px] tracking-widest uppercase mt-2">{date}</p>
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    attending: 'yes',
    fullName: '',
    email: '',
    phone: '',
    guestName: '',
    dietary: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok || WEBHOOK_URL === "https://hooks.zapier.com/hooks/catch/21234885/uv3oubg/") {
        setStatus('success');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
        style={{
          backgroundColor: '#FDFBF7',
          backgroundImage: `url("/background.jpeg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl max-w-lg w-full text-center relative z-10 border border-stone-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h2 className="text-3xl font-serif text-stone-800 mb-4">Thank You!</h2>
          <p className="text-stone-600 mb-6 font-light">
            {formData.attending === 'yes' 
              ? "We have received your RSVP and are so excited to celebrate with you!" 
              : "We have received your RSVP. We are so sorry you won't be able to make it, but we'll be thinking of you!"}
          </p>
          <p className="text-sm text-stone-400 font-serif italic">Areej & Jack</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-stone-800 font-sans relative overflow-x-hidden"
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: `url("/background.jpeg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* Header Section */}
        <header className="text-center flex flex-col items-center mb-12">
          <div className="w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden border-[8px] border-white relative bg-white">
            <img 
              src="/invitation.jpeg" 
              alt="Areej & Jack Wedding Invitation" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1544591873-1f196ce21cb3?q=80&w=800&auto=format&fit=crop"; 
              }}
            />
          </div>
        </header>

        {/* Polaroids Section */}
        <div className="flex flex-row justify-center items-start gap-4 md:gap-8 mb-16 relative z-20 px-2">
          <div className="w-40 sm:w-48 md:w-56 mt-2 relative z-10">
            <Polaroid 
              src="/couple.jpeg" 
              alt="Double Denim" 
              caption="Double Denim Date" 
              date="05.09.2022" 
              rotation="rotate-[-4deg]"
              fallback="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="w-40 sm:w-48 md:w-56 mt-12 md:mt-16 relative z-20 -ml-2 md:ml-0">
            <Polaroid 
              src="/polaroid1.jpeg" 
              alt="Engagement" 
              caption="She said Yes!" 
              date="25/12/2025" 
              rotation="rotate-[3deg]"
              fallback="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
            />
          </div>
        </div>

        {/* Main Form Area */}
        <div className="relative z-20 max-w-3xl mx-auto">
          {/* RSVP Form Card */}
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 relative z-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-serif text-stone-800 mb-2">RSVP</h2>
              <p className="text-stone-500 text-sm font-light">Please kindly reply by July 5th, 2026</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Attendance Toggle */}
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                <label className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl border cursor-pointer transition-all ${formData.attending === 'yes' ? 'bg-[#F2B2A8] text-white border-[#F2B2A8] shadow-md' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}>
                  <input 
                    type="radio" 
                    name="attending" 
                    value="yes" 
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="sr-only" 
                  />
                  <span className="font-medium tracking-wide">Joyfully Accepts</span>
                </label>
                <label className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl border cursor-pointer transition-all ${formData.attending === 'no' ? 'bg-[#F2B2A8] text-white border-[#F2B2A8] shadow-md' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}>
                  <input 
                    type="radio" 
                    name="attending" 
                    value="no" 
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="sr-only" 
                  />
                  <span className="font-medium tracking-wide">Regretfully Declines</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 tracking-wide">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#F2B2A8] focus:border-[#F2B2A8] outline-none transition-colors bg-white/50"
                    placeholder="John & Jane Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700 tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#F2B2A8] focus:border-[#F2B2A8] outline-none transition-colors bg-white/50"
                    placeholder="hello@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700 tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#F2B2A8] focus:border-[#F2B2A8] outline-none transition-colors bg-white/50"
                    placeholder="+44 7700 900077"
                  />
                </div>

                {/* Conditional Fields based on Attendance */}
                {formData.attending === 'yes' && (
                  <>
                    {/* Plus One */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 tracking-wide">Name of +1 / Additional Guest (if applicable)</label>
                      <input
                        type="text"
                        name="guestName"
                        value={formData.guestName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#F2B2A8] focus:border-[#F2B2A8] outline-none transition-colors bg-white/50"
                        placeholder="Leave blank if not applicable"
                      />
                    </div>

                    {/* Dietary Requirements */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 tracking-wide">Dietary Requirements & Allergies</label>
                      <textarea
                        name="dietary"
                        rows="3"
                        value={formData.dietary}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#F2B2A8] focus:border-[#F2B2A8] outline-none transition-colors bg-white/50 resize-none"
                        placeholder="e.g., Vegetarian, Gluten-free, Peanut allergy..."
                      ></textarea>
                    </div>
                  </>
                )}
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 text-sm">
                  <AlertCircle size={18} />
                  <p>Something went wrong submitting your RSVP. Please try again.</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-[#F2B2A8] hover:bg-[#e6a196] text-white px-8 py-4 rounded-xl font-medium tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send RSVP</span>
                      <Heart size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}