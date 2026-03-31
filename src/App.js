import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaPython, FaGitAlt, FaWhatsapp, FaDatabase } from "react-icons/fa";
import { SiPowerbi, SiMicrosoftsqlserver, SiOracle } from "react-icons/si";
import ErrorBoundary from "./components/ErrorBoundary";
import Type from "./components/Home/Type";

// Styling
import "./index.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <ErrorBoundary>
      <Preloader load={load} />
      <div className={`App transition-opacity duration-700 ${load ? "opacity-0" : "opacity-100"}`} id={load ? "no-scroll" : "scroll"}>
        <Navbar />

        {/* Hero Section */}
        <motion.section
          id="home"
          className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="aurora-bg"></div>
          <motion.div
            className="relative z-10 space-y-8 text-left max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20"
              variants={sectionVariants}
            >
              <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(0,255,171,0.6)]"></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary-fixed">Disponible para nuevos proyectos</span>
            </motion.div>

            <motion.div className="space-y-4" variants={sectionVariants}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface leading-[1.1]">
                Daniel Isaac <br/>
                <span className="text-gradient">Elgueta Fuentes</span>
              </h1>
              <div className="text-xl md:text-2xl font-bold text-primary min-h-[40px]">
                <Type />
              </div>
              <p className="text-xl md:text-2xl font-medium text-on-surface-variant max-w-2xl leading-relaxed">
                Especializado en análisis de datos, inteligencia de negocios y machine learning. Apasionado por transformar datos en decisiones estratégicas.
              </p>
            </motion.div>

            <motion.div className="space-y-8 pt-4" variants={sectionVariants}>
              <a
                href="#about"
                className="inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-lg font-bold text-base shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 no-underline"
              >
                Sobre Mí
              </a>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "GitHub", href: "https://github.com/danielisaacdev", Icon: AiFillGithub },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/danielisaacdev/", Icon: FaLinkedinIn },
                  { label: "WhatsApp", href: "https://wa.me/56992149141", Icon: FaWhatsapp },
                ].map(({ label, href, Icon }) => (
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
            </motion.div>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-32 px-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="aurora-bg"></div>
          <motion.div
            className="space-y-8 max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.15em] text-primary font-bold mb-4"
              variants={sectionVariants}
            >
              Sobre Mí
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-black tracking-tighter text-white"
              variants={sectionVariants}
            >
              ¿Quién <span className="text-gradient">SOY?</span>
            </motion.h1>
            <motion.div
              className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-light"
              variants={sectionVariants}
            >
              <p>
                Soy Daniel Isaac Elgueta Fuentes, estudiante de Ingeniería en Informática con una fuerte inclinación hacia el mundo de los datos.
              </p>
              <p>
                Mi objetivo principal es utilizar la tecnología para simplificar procesos complejos y extraer información valiosa que guíe la toma de decisiones estratégicas. Me especializo en Business Intelligence, Análisis de Datos y SQL.
              </p>
              <p>
                Además de programar, me apasiona aprender nuevas tecnologías y mantenerme al tanto de las tendencias en IA y Machine Learning.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              variants={sectionVariants}
            >
              {[
                { label: "GitHub", href: "https://github.com/danielisaacdev", Icon: AiFillGithub },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/danielisaacdev/", Icon: FaLinkedinIn },
              ].map(({ label, href, Icon }) => (
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
            </motion.div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.h2
              className="text-3xl font-bold text-white mb-12 flex items-center gap-3"
              variants={sectionVariants}
            >
              <span className="material-symbols-outlined text-primary">terminal</span>
              Habilidades Profesionales
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { Icon: FaPython, label: "Python" },
                { Icon: SiPowerbi, label: "Power BI" },
                { Icon: SiMicrosoftsqlserver, label: "SQL Server" },
                { Icon: SiOracle, label: "Oracle SQL" },
                { Icon: FaGitAlt, label: "Git" },
                { Icon: FaDatabase, label: "Data Mining" }
              ].map(({ Icon, label }, index) => (
                <motion.div
                  key={label}
                  className="w-20 h-20 rounded-xl bg-surface-container flex flex-col items-center justify-center border border-white/5 text-primary hover:bg-surface-container-high hover:scale-105 transition-all group"
                  variants={sectionVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} className="mb-1" />
                  <span className="text-[10px] font-bold text-center leading-tight">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-32 px-6 bg-surface-container-lowest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p
                className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.15em] text-primary font-bold mb-4"
                variants={sectionVariants}
              >
                Proyectos
              </motion.p>
              <motion.h2
                className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8"
                variants={sectionVariants}
              >
                Mi <span className="text-gradient">Trabajo</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Dashboard de Ventas – Power BI",
                  description: "Análisis de dataset de ventas para identificar tendencias comerciales y creación de dashboards interactivos para visualización de KPIs.",
                  image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=Power+BI+Dashboard",
                  tags: ["Power BI", "Data Analysis", "KPIs"]
                },
                {
                  name: "Análisis de Datos con Python",
                  description: "Limpieza y preparación de datos utilizando Python. Análisis exploratorio para identificar patrones y métricas relevantes.",
                  image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=Python+Data+Analysis",
                  tags: ["Python", "Pandas", "EDA"]
                }
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  className="bg-surface-container rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all group"
                  variants={sectionVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="space-y-4">
                    <div className="aspect-video rounded-xl bg-surface-container-high overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-32 px-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <motion.div
            className="text-center space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={sectionVariants}>
              <p className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.15em] text-primary font-bold mb-4">
                Contacto
              </p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Hablemos de tu <span className="text-gradient">Proyecto</span>
              </h2>
            </motion.div>

            <motion.div
              className="max-w-2xl mx-auto space-y-8"
              variants={sectionVariants}
            >
              <p className="text-xl text-on-surface-variant leading-relaxed">
                ¿Tienes un proyecto de análisis de datos o business intelligence?
                Estoy disponible para discutir cómo podemos trabajar juntos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:daniel.isaac.dev@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined">email</span>
                  Enviar Email
                </a>
                <a
                  href="https://wa.me/56992149141"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 bg-surface-container text-on-surface-variant rounded-lg font-bold hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined">phone</span>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </ErrorBoundary>
  );
}

export default App;
