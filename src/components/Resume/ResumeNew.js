import React, { useState, useEffect } from "react";
import { personalInfo } from "../../data";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../../Assets/Daniel_Elgueta_CV.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="aurora-bg"></div>
      
      {/* Header Section */}
      <header className="mb-20 text-center md:text-left">
        <p className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.15em] text-primary font-bold mb-4">Curriculum Vitae</p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">RESUMEN & <span className="text-gradient">HABILIDADES</span></h1>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed font-light">
            Estudiante de Ingeniería en Informática enfocado en el análisis de datos e inteligencia de negocios. 
            Apasionado por transformar datos en insights accionables.
          </p>
          <div className="md:ml-auto">
            <a href={pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-xl shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all no-underline">
              <AiOutlineDownload size={20} />
              Descargar CV Completo
            </a>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Timeline Column */}
        <section className="lg:col-span-7 space-y-16">
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">school</span>
              Educación
            </h2>
            <div className="relative border-l border-outline-variant/30 ml-3 space-y-12">
              {personalInfo.education.map((edu, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <span className="text-sm font-medium px-3 py-1 bg-surface-container-high text-primary rounded-full">{edu.period}</span>
                  </div>
                  <p className="text-primary-container font-semibold mb-3">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Proyectos Destacados
            </h2>
            <div className="space-y-6">
              {personalInfo.projects.map((project, index) => (
                <div key={index} className="p-6 bg-surface-container rounded-xl border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-2">{project.name}</h4>
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Column */}
        <aside className="lg:col-span-5 space-y-12">
          <div className="bg-surface-container p-8 rounded-xl border border-white/5 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-8">Habilidades Técnicas</h2>
            <div className="space-y-8">
              {personalInfo.skills.map((skill, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">{skill.label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.details.split(',').map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-surface-container-highest text-sm rounded-lg text-on-surface border border-white/5">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Preview */}
          <div className="bg-surface-container p-4 rounded-xl border border-white/5 hidden md:block overflow-hidden">
            <h3 className="text-sm font-bold text-white/40 mb-4 uppercase tracking-widest text-center">Vista Previa</h3>
            <div className="flex justify-center bg-black/20 rounded-lg p-2">
              <Document file={pdf} className="d-flex justify-content-center">
                <Page pageNumber={1} scale={width > 1200 ? 0.5 : 0.4} />
              </Document>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default ResumeNew;
