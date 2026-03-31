import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import { AiFillGithub } from "react-icons/ai";
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

    return (
      <div
        key={repo.id || repo.name}
        className="card"
        style={{ minWidth: '240px' }}
        role="group"
        aria-label={repo.name}
      >
        <h3 className="text-xl font-bold text-white truncate">{repo.name}</h3>
        <p className="text-sm text-on-surface-variant mt-1 h-20 overflow-hidden text-ellipsis">{repo.description || 'Descripción no disponible'}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant">
          <span>{repo.language || 'N/A'}</span>
          <span>★ {repo.stargazers_count || 0}</span>
        </div>
        <a
          href={localTarget}
          {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="mt-3 inline-block text-xs font-semibold text-secondary-fixed hover:text-white transition-colors"
          aria-label={isExternal ? `Abrir repositorio ${repo.name}` : `Ir al proyecto ${matchedProject.name}`}
        >
          {isExternal ? 'Abrir repositorio' : `Ir al proyecto ${matchedProject.name}`}
        </a>
      </div>
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

            <div className="projects-carousel" aria-label="Carrusel de proyectos">
              {loadingProjects ? (
                <div className="text-center text-on-surface-variant">Cargando repositorios de GitHub...</div>
              ) : (
                <>
                  <div className="group">
                    {projectCards(projectsToShow)}
                  </div>
                  <div className="group" aria-hidden="true">
                    {projectCards(projectsToShow)}
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalInfo.projects.map((project) => (
                <article
                  key={project.name}
                  id={`project-${slugify(project.name)}`}
                  className="bg-surface-container rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{project.description}</p>
                  <div className="mt-4 text-xs text-primary">Tecnologías: {project.tags ? project.tags.join(', ') : project.language || 'N/A'}</div>
                </article>
              ))}
            </div>
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
