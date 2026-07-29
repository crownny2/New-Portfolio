"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { profile } from "@/data/profile";

function FloatingField({
  id,
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Comp
        id={id}
        type={type}
        placeholder=" "
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="peer w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 pb-3 pt-6 font-sans text-sm text-ink outline-none transition-colors focus:border-sky"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 font-sans text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire this up to your email provider / API route of choice.
    setSent(true);
  };

  const contactItems = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:+63${profile.phone.replace(/\D/g, "").slice(1)}` },
    { icon: Github, label: "GitHub", value: "crownny2", href: profile.socials.github },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-sky/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something together."
          description="Open to full-stack developer and UI/UX design roles  feel free to reach out."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-cursor-hover
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-sky/40"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky/10 text-sky transition-colors group-hover:bg-sky group-hover:text-white">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="font-sans text-xs text-muted">{item.label}</p>
                  <p className="font-sans text-sm font-medium text-ink">{item.value}</p>
                </div>
              </a>
            ))}
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
            >
              {sent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white"
                >
                  <CheckCircle2 className="text-sky" size={40} />
                  <p className="font-sans text-sm font-medium text-ink">
                    Message ready to send — thanks for reaching out!
                  </p>
                </motion.div>
              )}

              <div className="flex flex-col gap-5">
                <FloatingField
                  id="name"
                  label="Your Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <FloatingField
                  id="email"
                  label="Your Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
                <FloatingField
                  id="message"
                  label="Your Message"
                  textarea
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-hover
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-sans text-sm font-medium text-white transition-colors hover:bg-sky hover:text-ink"
                >
                  Send Message <Send size={15} />
                </motion.button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
