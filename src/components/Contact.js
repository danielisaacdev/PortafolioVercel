import React from "react";
import { personalInfo } from "../data";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

function Contact() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="aurora-bg"></div>
      
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <p className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.15em] text-primary font-bold">Conversemos</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Ponte en <span className="text-gradient">Contacto</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-light max-w-xl mx-auto leading-relaxed">
            ¿Tienes alguna idea en mente o quieres colaborar en un proyecto de datos? Estoy disponible para charlar.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WhatsApp Card */}
          <a href={personalInfo.socials.whatsapp} target="_blank" rel="noreferrer" className="group p-8 bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-2xl transition-all hover:-translate-y-2 no-underline flex items-center gap-6">
             <div className="w-16 h-16 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                <FaWhatsapp size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                <p className="text-on-surface-variant text-sm font-light">Escríbeme directamente</p>
             </div>
          </a>

          {/* Email Card */}
          <a href={`mailto:${personalInfo.email}`} className="group p-8 bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-2xl transition-all hover:-translate-y-2 no-underline flex items-center gap-6">
             <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <AiOutlineMail size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                <p className="text-on-surface-variant text-sm font-light">{personalInfo.email}</p>
             </div>
          </a>

          {/* LinkedIn Card */}
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="group p-8 bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-2xl transition-all hover:-translate-y-2 no-underline flex items-center gap-6">
             <div className="w-16 h-16 rounded-xl bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] group-hover:scale-110 transition-transform">
                <FaLinkedinIn size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-1">LinkedIn</h3>
                <p className="text-on-surface-variant text-sm font-light">Conectemos en red</p>
             </div>
          </a>

          {/* GitHub Card */}
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="group p-8 bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-2xl transition-all hover:-translate-y-2 no-underline flex items-center gap-6">
             <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <AiFillGithub size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-1">GitHub</h3>
                <p className="text-on-surface-variant text-sm font-light">Explora mis repositorios</p>
             </div>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Contact;
