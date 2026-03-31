import React from "react";
import { personalInfo } from "../../data";
import Github from "./Github";
import { FaPython, FaDatabase, FaGitAlt } from "react-icons/fa";
import { SiPowerbi, SiMicrosoftsqlserver, SiOracle } from "react-icons/si";

function About() {

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="aurora-bg"></div>
      
      {/* Bio Section */}
      <section className="mb-24">
        <div className="space-y-8 max-w-4xl">
          <p className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.15em] text-primary font-bold mb-4">Sobre Mí</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            ¿Quién <span className="text-gradient">SOY?</span>
          </h1>
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-light">
            <p>
              Soy Daniel Isaac Elgueta Fuentes, estudiante de Ingeniería en Informática con una fuerte inclinación hacia el mundo de los datos.
            </p>
            <p>
              Mi objetivo principal es utilizar la tecnología para simplificar procesos complejos y extraer información valiosa que guíe la toma de decisiones estratégicas. Me especializo en Business Intelligence, Análisis de Datos y SQL.
            </p>
            <p>
              Además de programar, me apasiona aprender nuevas tecnologías y mantenerme al tanto de las tendencias en IA y Machine Learning.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="mb-24">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">terminal</span>
          Habilidades Profesionales
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <SkillIcon Icon={FaPython} label="Python" />
          <SkillIcon Icon={SiPowerbi} label="Power BI" />
          <SkillIcon Icon={SiMicrosoftsqlserver} label="SQL Server" />
          <SkillIcon Icon={SiOracle} label="Oracle SQL" />
          <SkillIcon Icon={FaGitAlt} label="Git" />
          <SkillIcon Icon={FaDatabase} label="Data Mining" />
        </div>
      </section>

      {/* GitHub Calendar */}
      <section className="bg-surface-container/40 rounded-2xl p-8 border border-white/5 overflow-x-auto">
        <Github />
      </section>
    </main>
  );
}

function SkillIcon({ Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
      <Icon size={48} className="text-primary/80" />
      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default About;
