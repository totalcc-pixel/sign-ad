import React, { useState } from "react";
import { Phone, Mail, Facebook, Send, MapPin } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-black min-h-screen pt-28 lg:pt-44 pb-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <span className="text-[#F39C12] text-sm font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
          Contact Signad
        </h1>
        <p className="mt-5 text-lg text-white/70 leading-relaxed">
          Have a question or ready to start your project? Reach out — we're here to help.
        </p>
      </section>

      {/* Body */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 mt-12 grid lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-8">
          {/* Jason — Shop Signage */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase">
              Jason <span className="text-[#F39C12] font-normal normal-case tracking-normal">· Shop Signage</span>
            </p>
            <ul className="space-y-3 mt-3 text-sm">
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4 text-[#F39C12]" /> 027-4320-180
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4 text-[#F39C12]" /> totalcc@gmail.com
              </li>
            </ul>
          </div>

          {/* Vincent — Vehicle Graphics */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white text-xs font-semibold tracking-[0.15em] uppercase">
              Vincent <span className="text-[#F39C12] font-normal normal-case tracking-normal">· Vehicle Graphics</span>
            </p>
            <ul className="space-y-3 mt-3 text-sm">
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4 text-[#F39C12]" /> 021 0296 4174
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4 text-[#F39C12]" /> vincentsignad@gmail.com
              </li>
            </ul>
          </div>

          {/* Location & Socials */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
              <MapPin className="w-4 h-4 text-[#F39C12]" /> Auckland, New Zealand
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/signad04nz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-[#F39C12]/30 text-white hover:bg-[#F39C12] hover:text-black transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Signad+Vehicle+Graphics+New+Zealand"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-[#F39C12]/30 text-white hover:bg-[#F39C12] hover:text-black transition-all"
              >
                <GoogleIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <Send className="w-12 h-12 text-[#F39C12] mb-3" />
              <p className="text-white font-semibold text-lg">Message sent!</p>
              <p className="text-white/50 text-sm mt-1">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white text-sm font-medium block mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#F39C12] focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium block mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#F39C12] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium block mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:border-[#F39C12] focus:outline-none resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#F39C12] text-black font-semibold hover:bg-[#ffb84d] transition-all"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}