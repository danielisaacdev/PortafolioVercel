import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import { AiFillGithub, AiOutlineGlobal } from "react-icons/ai";
import { FaLinkedinIn, FaPython, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiPowerbi, SiMicrosoftsqlserver, SiOracle } from "react-icons/si";
import ErrorBoundary from "./components/ErrorBoundary";
import Type from "./components/Home/Type";
import { personalInfo } from "./data";

// Styling
import "./index.css";

function App() {
  const [load, updateLoad] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/danielisaacdev/repos?per_page=100&sort=updated');
        if (!response.ok) throw new Error('GitHub API error');
        const repos = await response.json();
        const filtered = repos.filter(r => {
          const name = r.name.toLowerCase();
          return !name.includes('portafolio') && name !== 'danielisaacdev';
        });
        setGithubProjects(filtered);
      } catch (error) {
        console.error('Error loading GitHub repos:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchRepos();
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

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const filteredProjects = githubProjects
    .filter(repo => !repo.name.toLowerCase().includes('portafolio') && repo.name.toLowerCase() !== 'danielisaacdev');

  const projectsToShow = filteredProjects.length > 0 ? filteredProjects : [
    { id: 'static-1', name: 'Dashboard de Ventas – Power BI', description: 'Análisis de dataset de ventas para identificar tendencias comerciales y creación de dashboards interactivos para visualización de KPIs.', html_url: '#', language: 'Power BI', stargazers_count: 0 },
    { id: 'static-2', name: 'Análisis de Datos con Python', description: 'Limpieza y preparación de datos utilizando Python. Análisis exploratorio para identificar patrones y métricas relevantes.', html_url: '#', language: 'Python', stargazers_count: 0 },
    { id: 'static-3', name: 'Proyecto Extra', description: 'Prototipo de un proyecto extra para carrusel infinito.', html_url: '#', language: 'JavaScript', stargazers_count: 0 }
  ];

  const projectCards = (repos) => repos.map((repo, index) => {
    const matchedProject = personalInfo.projects.find((p) => {
      const repoName = repo.name.toLowerCase().replace(/\s|[-_]/g, '');
      const projectName = p.name.toLowerCase().replace(/\s|[-_]/g, '');
      return projectName.includes(repoName) || repoName.includes(projectName);
    });

    const localTarget = matchedProject ? `#project-${slugify(matchedProject.name)}` : repo.html_url || '#';
    const isExternal = !matchedProject;
    
    // Prioritize content from data.js
    const displayDescription = (matchedProject && matchedProject.description) || repo.description || 'Proyectos enfocados en la excelencia técnica y análisis profundo.';
    const displayTags = (matchedProject && matchedProject.tags) ? matchedProject.tags.slice(0, 3).join(', ') : (repo.language || 'Análisis');

    return (
      <a
        key={repo.id || repo.name}
        href={localTarget}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="card card-link group/card"
        style={{ minWidth: '320px', height: '240px' }}
        role="group"
        aria-label={isExternal ? `Abrir repositorio ${repo.name}` : `Ir al proyecto ${matchedProject.name}`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white group-hover/card:text-primary transition-colors line-clamp-1">{repo.name}</h3>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed line-clamp-3">
              {displayDescription}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{displayTags}</span>
               <div className="flex gap-3 text-on-surface-variant/40 text-[10px]">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">star</span>{repo.stargazers_count || 0}</span>
               </div>
            </div>
          </div>
        </div>
      </a>
    );
  });


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

        {/* Projects Section — Cinematic Scroll */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <motion.div
              className="mb-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-['Inter'] text-[0.6875rem] uppercase tracking-[0.2em] text-primary font-bold mb-4">
                // Proyectos
              </p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Mi <span className="text-gradient">Trabajo</span>
              </h2>
            </motion.div>

            {/* Project Cards — one by one */}
            {loadingProjects ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {projectsToShow.map((repo, index) => {
                  const matchedProject = personalInfo.projects.find((p) => {
                    const rn = repo.name.toLowerCase().replace(/[\s\-_]/g, '');
                    const pn = p.name.toLowerCase().replace(/[\s\-_]/g, '');
                    return pn.includes(rn) || rn.includes(pn);
                  });

                  const description =
                    matchedProject?.description ||
                    repo.description ||
                    'Proyecto open source con enfoque en excelencia técnica y buenas prácticas.';
                  const tags = matchedProject?.tags || (repo.language ? [repo.language] : ['Open Source']);
                  const previewSrc = repo.homepage
                    ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(repo.homepage)}?w=900&h=560`
                    : `https://opengraph.githubassets.com/1/danielisaacdev/${repo.name}`;

                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={repo.id || repo.name}
                      initial={{ opacity: 0, y: 80 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="group"
                    >
                      <div
                        className={`
                          relative flex flex-col gap-10 items-center overflow-hidden
                          ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                          bg-[#131722] border border-white/[0.07] rounded-3xl
                          p-8 lg:p-12
                          transition-all duration-500
                          hover:border-primary/20
                          hover:shadow-[0_16px_80px_-16px_rgba(147,204,255,0.12)]
                        `}
                      >
                        {/* Ghost number background */}
                        <span
                          className="absolute -bottom-6 right-6 text-[160px] font-black leading-none pointer-events-none select-none"
                          style={{ color: 'rgba(255,255,255,0.025)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Top glow line on hover */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* ── Browser Mockup ── */}
                        <motion.div
                          className="w-full lg:w-[55%] shrink-0"
                          whileHover={{ scale: 1.015, y: -4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        >
                          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                            {/* Browser bar */}
                            <div className="bg-[#1a1e2e] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
                              <div className="flex gap-1.5 shrink-0">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                              </div>
                              <div className="flex-1 min-w-0 bg-[#0f131f]/80 rounded-md px-3 py-1.5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[12px] text-white/20">lock</span>
                                <span className="text-[11px] text-white/20 font-mono truncate">
                                  {repo.homepage
                                    ? repo.homepage.replace(/^https?:\/\//, '')
                                    : `github.com/danielisaacdev/${repo.name}`}
                                </span>
                              </div>
                            </div>

                            {/* Screenshot */}
                            <div className="relative h-64 bg-[#0c0f1a] overflow-hidden">
                              <img
                                src={previewSrc}
                                alt={repo.name}
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://opengraph.githubassets.com/1/danielisaacdev/${repo.name}`;
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                          </div>
                        </motion.div>

                        {/* ── Project Info ── */}
                        <div className="flex-1 min-w-0 space-y-6 relative z-10">

                          {/* Counter */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.35em]">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1 h-px bg-white/[0.06]" />
                            <span className="text-[10px] font-bold text-white/15 tracking-widest">
                              {String(projectsToShow.length).padStart(2, '0')}
                            </span>
                          </div>

                          {/* Name */}
                          <h3 className="text-3xl lg:text-[2.6rem] font-black text-white tracking-tight leading-[1.1]">
                            {repo.name}
                          </h3>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                                style={{
                                  background: 'rgba(147,204,255,0.07)',
                                  borderColor: 'rgba(147,204,255,0.18)',
                                  color: 'rgba(147,204,255,0.85)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                            {description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-5 text-[11px] text-white/20 font-mono">
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[13px]">star</span>
                              {repo.stargazers_count || 0}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[13px]">fork_right</span>
                              {repo.forks_count || 0}
                            </span>
                            {repo.updated_at && (
                              <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[13px]">schedule</span>
                                {new Date(repo.updated_at).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })}
                              </span>
                            )}
                          </div>

                          {/* Links */}
                          <div className="flex flex-wrap gap-3 pt-1">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-bold text-white/60 hover:text-white hover:border-white/25 hover:bg-white/[0.07] transition-all duration-200 no-underline"
                            >
                              <AiFillGithub size={16} />
                              Ver Código
                            </a>
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-primary hover:text-white transition-all duration-200 no-underline"
                                style={{
                                  background: 'rgba(147,204,255,0.1)',
                                  border: '1px solid rgba(147,204,255,0.22)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(147,204,255,0.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(147,204,255,0.1)'; }}
                              >
                                <AiOutlineGlobal size={16} />
                                Demo Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

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
                ¿Buscas un especialista en análisis de datos y business intelligence?
                Estoy disponible para nuevos proyectos y colaboraciones.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: "email",
                  label: "EMAIL",
                  value: "daniel.isaac.dev@gmail.com",
                  href: "mailto:daniel.isaac.dev@gmail.com",
                  color: "text-primary"
                },
                {
                  icon: "phone",
                  label: "TELÉFONO",
                  value: "+56 9 9214 9141",
                  href: "tel:+56992149141",
                  color: "text-secondary-fixed"
                },
                {
                  icon: "business",
                  label: "LINKEDIN",
                  value: "danielisaacdev",
                  href: "https://www.linkedin.com/in/danielisaacdev/",
                  color: "text-blue-400"
                },
                {
                  icon: "code",
                  label: "GITHUB",
                  value: "danielisaacdev",
                  href: "https://github.com/danielisaacdev",
                  color: "text-gray-300"
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group bg-surface-container rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all hover:-translate-y-1"
                  variants={sectionVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mx-auto ${contact.color}`}>
                      <span className="material-symbols-outlined text-2xl">{contact.icon}</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1 text-center">
                        {contact.label}
                      </div>
                      <div className="text-sm text-on-surface-variant group-hover:text-white transition-colors text-center break-words">
                        {contact.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </ErrorBoundary>
  );
}

export default App;
