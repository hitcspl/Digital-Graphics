import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, MapPin, Phone, Check } from "lucide-react";

function ServiceHighlights() {
  const items = ["Strategy", "Design", "Development", "Branding"];
  return (
    <div className="mt-10 hidden lg:block">
      <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500 mb-6">Expertise</p>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up all active timers on component unmount
  useEffect(() => {
    return () => {
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    
    setStatus('loading');
    
    submitTimerRef.current = setTimeout(() => {
      setStatus('success');
      setIsFadingOut(false);

      // Show success state for 3.5 seconds, then initiate smooth transition back
      resetTimerRef.current = setTimeout(() => {
        setIsFadingOut(true);

        fadeTimerRef.current = setTimeout(() => {
          setStatus('idle');
          setIsFadingOut(false);
        }, 600);
      }, 3500);
    }, 1200);
  };

  return (
    <section id="contact" className="w-full bg-background text-foreground transition-colors duration-300 scroll-mt-[70px] md:scroll-mt-[80px]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT: 40% Contact Details - Uses predictable gap-based spacing so height never shifts */}
        <div className="w-full lg:w-[40%] p-8 md:p-16 lg:p-24 bg-secondary/30 flex flex-col justify-start space-y-12 md:space-y-16 shrink-0 border-b lg:border-b-0 lg:border-r border-border">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 md:mb-8 leading-tight">
              Let's build <br />something new.
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm sm:text-base">
              We are currently accepting new projects. Our team typically responds within 24 hours.
            </p>
            
            <ServiceHighlights />
          </div>

<div className="space-y-6 pt-4 border-t border-border/40">
  <ContactLink
    icon={<Mail size={18} />}
    text="digitalgraphicsranchi@gmail.com"
    href="mailto:digitalgraphicsranchi@gmail.com"
  />

  <ContactLink
    icon={<Phone size={18} />}
    text="+91 6205114112"
    href="tel:+916205114112"
  />

  <ContactLink
  icon={<MapPin size={18} />}
  text="Ranchi, Jharkhand, India"
  href="https://www.google.com/maps/search/?api=1&query=507,+Gridhar+Plaza+(5th+Floor),+Harmu+Rd,+Ranchi,+Jharkhand+834001"
/>
</div>


        </div>

        {/* RIGHT: 60% Clean Form / Success State */}
        <div className="w-full lg:w-[60%] p-6 md:p-12 lg:p-24 flex items-center justify-center min-h-[500px]">
          {status === 'success' ? (
            <div 
              className={`w-full max-w-md text-center transition-all duration-600 ease-out transform ${
                isFadingOut 
                  ? 'opacity-0 scale-95 translate-y-2' 
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              <div className="flex flex-col items-center">
                {/* 200 OK Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-8 ring-1 ring-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Message Delivered</span>
                </div>

                {/* Check Icon */}
                <div className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
                  <Check className="h-8 w-8 sm:h-10 sm:w-10 stroke-[2.5] animate-in zoom-in-50 duration-500 ease-out" />
                </div>

                {/* Main Heading */}
                <h3 className="text-3xl sm:text-4xl font-serif tracking-tight text-foreground mb-3">
                  Inquiry Received.
                </h3>
                
                {/* Responsive & Clear Success Copy */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. We've received your details and our team will get back to you shortly.
                </p>

                {/* Progress bar timer indicator */}
                <div className="mt-10 w-24 h-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full origin-left animate-[shrink_3.5s_linear_forwards]" />
                </div>
              </div>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="w-full max-w-xl space-y-10 transition-opacity duration-500 ease-in" 
              aria-label="Contact Form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="Full Name" placeholder="John Doe" required />
                <FormInput label="Email" placeholder="john@company.com" type="email" required />
              </div>
              
              <FormInput label="Company" placeholder="Your Agency" />
              
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] uppercase tracking-widest font-bold"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell us about your project goals..."
                  className="
                    w-full
                    bg-transparent
                    border-b
                    border-border
                    py-3
                    text-foreground
                    placeholder:text-muted-foreground/30
                    focus:outline-none
                    focus:border-primary
                    transition-colors
                    resize-none
                  "
                />
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label={status === "loading" ? "Sending message" : "Send message"}
                  className="
                    group
                    relative
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-none
                    bg-black
                    dark:bg-white
                    px-8
                    sm:px-10
                    py-4
                    min-h-[56px]
                    text-[10px]
                    sm:text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    dark:text-black
                    transition-all
                    duration-500
                    ease-out
                    hover:-translate-y-1
                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)]
                    dark:hover:shadow-[0_18px_40px_rgba(255,255,255,0.15)]
                    active:translate-y-0
                    active:scale-[0.98]
                    disabled:pointer-events-none
                    disabled:opacity-50
                  "
                >
                  {/* Sliding Shine */}
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      skew-x-12
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover:translate-x-[220%]
                      dark:via-black/15
                    "
                  />

                  {/* Text */}
                  <span className="relative z-10">
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </span>

                  {/* Arrow */}
                  <ArrowRight
                    size={14}
                    className="
                      relative
                      z-10
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:scale-110
                    "
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


function ContactLink({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  const isMail = href.startsWith("mailto:");
  
  // Direct Gmail webmail URL fallback if they are on a browser
  const gmailUrl = isMail 
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${href.replace("mailto:", "")}` 
    : href;

  const isExternal = href.startsWith("http") || isMail;

  return (
    <a
      href={isMail ? gmailUrl : href}
      {...(isExternal
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      className="group flex items-center gap-4 text-sm hover:text-primary transition-colors cursor-pointer"
    >
      <span className="transition-transform group-hover:scale-110">{icon}</span>
      <span className="break-all sm:break-normal">{text}</span>
    </a>
  );
}

function FormInput({ label, placeholder, type = "text", required = false }: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  required?: boolean 
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold">{label}</label>
      <input 
        required={required}
        type={type}
        placeholder={placeholder}
        className="
          w-full 
          bg-transparent 
          border-b 
          border-border 
          py-3 
          text-foreground 
          placeholder:text-muted-foreground/30 
          focus:outline-none 
          focus:border-primary 
          transition-colors
        " 
      />
    </div>
  );
}