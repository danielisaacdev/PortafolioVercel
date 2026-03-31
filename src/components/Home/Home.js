import React from "react";
import Type from "./Type";
import { personalInfo } from "../../data";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaPython, FaGitAlt, FaWhatsapp } from "react-icons/fa";
import { SiPowerbi, SiMicrosoftsqlserver } from "react-icons/si";
import { Link } from "react-router-dom";

function Home() {
  const quickLinks = [
    { label: "GitHub", href: personalInfo.socials.github, Icon: AiFillGithub },
    { label: "LinkedIn", href: personalInfo.socials.linkedin, Icon: FaLinkedinIn },
    { label: "WhatsApp", href: personalInfo.socials.whatsapp, Icon: FaWhatsapp },
  ];

  return (
    <main className="relative pt-16">
      <div className="aurora-bg"></div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(0,255,171,0.6)]"></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary-fixed">Disponible para nuevos proyectos</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface leading-[1.1]">
                {personalInfo.name.split(' ').slice(0, 2).join(' ')} <br/>
                <span className="text-gradient">
                  {personalInfo.name.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              <div className="text-xl md:text-2xl font-bold text-primary min-h-[40px]">
                <Type />
              </div>
              <p className="text-xl md:text-2xl font-medium text-on-surface-variant max-w-2xl leading-relaxed">
                {personalInfo.description}
              </p>
            </div>

            <div className="space-y-8 pt-4">
              <Link to="/about" className="inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-lg font-bold text-base shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 no-underline">
                Sobre Mí
              </Link>

              <div className="flex flex-wrap gap-3">
                {quickLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-surface-container text-on-surface-variant hover:text-white hover:border-primary/40 hover:bg-surface-container-high transition-colors no-underline"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
                  </a>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Tecnologías Core</span>
                <div className="flex gap-4">
                  <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-white/5 text-primary hover:bg-surface-container-high transition-colors" title="Python"><FaPython size={20} /></span>
                  <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-white/5 text-primary hover:bg-surface-container-high transition-colors" title="Power BI"><SiPowerbi size={20} /></span>
                  <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-white/5 text-primary hover:bg-surface-container-high transition-colors" title="SQL Server"><SiMicrosoftsqlserver size={20} /></span>
                  <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-white/5 text-primary hover:bg-surface-container-high transition-colors" title="Git"><FaGitAlt size={20} /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento-style decorative element */}
          <div className="lg:col-span-5 hidden lg:block relative h-[500px]">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4">
              {/* Card 1: Data Infrastructure */}
              <div className="bg-surface-container-high rounded-xl p-6 flex flex-col justify-between border border-white/5 hover:bg-surface-container-highest transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">terminal</span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] font-black text-primary mb-1">Expertise</div>
                  <div className="text-sm font-bold opacity-90 leading-tight">Data Infrastructure</div>
                </div>
              </div>

              {/* Card 2: Analytics - Added 'relative' to fix the overlap issue */}
              <div className="relative bg-primary/10 rounded-xl p-6 flex flex-col items-center justify-center border border-primary/20 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-primary text-9xl">analytics</span>
                </div>
                <div className="relative z-10 text-center">
                  <span className="material-symbols-outlined text-primary text-5xl mb-3 block">auto_awesome</span>
                  <div className="text-xs font-black uppercase tracking-widest text-primary/80">Smart Analysis</div>
                </div>
              </div>

              {/* Card 3: Clean Insights */}
              <div className="col-span-2 bg-surface-container rounded-xl p-8 border border-white/5 relative overflow-hidden group hover:bg-surface-container-high transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-8xl">database</span>
                </div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="space-y-3">
                    <div className="inline-block px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold uppercase tracking-widest">
                      BI Optimization
                    </div>
                    <div>
                      <div className="text-3xl font-black mb-1 tracking-tighter text-gradient">Clean Insights.</div>
                      <div className="text-sm text-on-surface-variant max-w-[240px] leading-relaxed">
                        Transformando bases de datos en valor estratégico accionable mediante Power BI y SQL.
                      </div>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-secondary-fixed text-4xl">bolt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro/Bio Section */}
      <section className="py-32 px-6 bg-surface-container-lowest relative">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-block">
            <span className="font-['Inter'] font-semibold text-[10px] uppercase tracking-[0.2em] text-primary/80">La Misión</span>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-2"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {personalInfo.mission}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-left pt-8">
            <p className="text-on-surface-variant leading-loose text-lg font-light">
              Mi enfoque se centra en la excelencia técnica y el análisis profundo. Especializado en Business Intelligence y Machine Learning, busco optimizar procesos mediante el uso estratégico de la tecnología.
            </p>
            <p className="text-on-surface-variant leading-loose text-lg font-light">
              Creo que los datos son el combustible de la era moderna. Mi objetivo es asegurar que cada infraestructura que diseño no solo funcione, sino que impulse el crecimiento y la eficiencia.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
