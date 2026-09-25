import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F6E]">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Contact Smart Rent Support
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Have questions about listing a property, tenant verification, or digital contracts? Our Kigali support team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white dark:bg-[#161D2A] p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
              Kigali Headquarters
            </h3>

            <div className="space-y-3 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5" />
                <span>Norrsken House Kigali, KN 78 St, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0E9F6E] shrink-0" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0E9F6E] shrink-0" />
                <span>support@smartrent.rw</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="font-bold mb-1">Direct Landlord Assistance</div>
            <p className="text-[11px] leading-relaxed">
              If you own multiple rental units in Rwanda, our team can help onboard and verify your properties in person free of charge.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-[#161D2A] p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
            {sent ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
                  Message sent successfully
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Thank you, {name}. A member of our support team will reply within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white mb-2">
                  Send a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kenny Mugabo"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kenny@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you?"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
