import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import { AiFillGithub, AiOutlineGlobal } from "react-icons/ai";
import { FaLinkedinIn, FaPython, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiPowerbi, SiMicrosoftsqlserver, SiOracle } from "react-icons/si";
import ErrorBoundary from "./components/ErrorBoundary";
import Type from "./components/Home/Type";
import { personalInfo } from "./data";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const VERTEBRA_COUNT = 22;

function App() {
  const [load, updateLoad] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const vertebraeRef = useRef([]);
  const aboutPanelRef = useRef(null);
  const contactPanelRef = useRef(null);
  const lenisRef = useRef(null);

  /* ── Preloader timer ── */
  useEffect(() => {
    const t = setTimeout(() => updateLoad(false), 2000);
    return () => clearTimeout(t);
  }, []);

  /* ── GitHub repos ── */
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/danielisaacdev/repos?per_page=100&sort=updated"
        );
        if (!res.ok) throw new Error("GitHub API error");
        const repos = await res.json();
        setGithubProjects(
          repos.filter((r) => {
            const n = r.name.toLowerCase();
            return !n.includes("portafolio") && n !== "danielisaacdev";
          })
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchRepos();
  }, []);

  /* ── GSAP + Lenis (spine + static section flip-ins) ── */
  useEffect(() => {
    if (load) return;

    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* Spine wave — vertebrae spin on their Y axis as you scroll */
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        vertebraeRef.current.forEach((v, i) => {
          if (!v) return;
          /* Staggered phase offset → creates a traveling wave down the column */
          const phase = (i / VERTEBRA_COUNT) * 360;        // 0..360 spread across the column
          const totalDeg = self.progress * 1440 + phase;   // 4 full spins over full scroll
          v.style.transform = `rotateY(${totalDeg}deg)`;
          /* Brightness peaks when facing front (0°,360°) or back (180°) */
          const cos = Math.cos((totalDeg * Math.PI) / 180);
          v.style.opacity = (Math.abs(cos) * 0.6 + 0.2).toString();
        });
      },
    });

    /* About section flip-in */
    if (aboutPanelRef.current) {
      gsap.fromTo(
        aboutPanelRef.current,
        { rotateY: 65, opacity: 0, y: 60 },
        {
          rotateY: 0,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutPanelRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    /* Contact section flip-in */
    if (contactPanelRef.current) {
      gsap.fromTo(
        contactPanelRef.current,
        { rotateY: -65, opacity: 0, y: 60 },
        {
          rotateY: 0,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactPanelRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [load]);

  /* ── Per-project atmosphere colors (like the video's atmospheric backgrounds) ── */
  const atmospheres = [
    { primary: "rgba(14,165,233,0.28)",  secondary: "rgba(6,182,212,0.15)",  accent: "#0ea5e9" },   // blue
    { primary: "rgba(232,121,249,0.28)", secondary: "rgba(192,38,211,0.14)", accent: "#e879f9" },   // pink
    { primary: "rgba(34,197,94,0.25)",   secondary: "rgba(16,185,129,0.13)", accent: "#22c55e" },   // green
    { primary: "rgba(251,146,60,0.25)",  secondary: "rgba(239,68,68,0.13)",  accent: "#fb923c" },   // orange
    { primary: "rgba(168,85,247,0.28)",  secondary: "rgba(124,58,237,0.14)", accent: "#a855f7" },   // purple
    { primary: "rgba(14,165,233,0.25)",  secondary: "rgba(99,102,241,0.13)", accent: "#818cf8" },   // indigo
  ];

  /* ── Projects data ── */
  const projectsToShow =
    githubProjects.length > 0
      ? githubProjects
      : personalInfo.projects.map((p, i) => ({
          id: `static-${i}`,
          name: p.name,
          description: p.description,
          html_url: "#",
          language: p.tags?.[0] || "Code",
          stargazers_count: 0,
          forks_count: 0,
          tags: p.tags,
        }));

  return (
    <ErrorBoundary>
      <Preloader load={load} />
      <div
        className={`transition-opacity duration-700 ${
          load ? "opacity-0 overflow-hidden h-screen" : "opacity-100"
        }`}
      >
        <Navbar />

        {/* ══════════════════════════════════
             DECORATIVE SPINE
        ══════════════════════════════════ */}
        <div className="spine-track" aria-hidden="true">
          <div className="spine-center-line" />
          <div className="spine-vertebrae">
            {Array.from({ length: VERTEBRA_COUNT }).map((_, i) => (
              <div
                key={i}
                className="vertebra"
                ref={(el) => (vertebraeRef.current[i] = el)}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
             HERO
        ══════════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-28 overflow-hidden"
        >
          {/* ── Neon beam columns — the "spine" backdrop ── */}
          <div className="neon-beams">
            {/* blue beam */}
            <div className="neon-beam neon-beam-blue" style={{ left: "30%", opacity: 0.75 }} />
            {/* pink beam */}
            <div className="neon-beam neon-beam-pink" style={{ left: "36%", opacity: 0.65 }} />
            {/* purple beam */}
            <div className="neon-beam neon-beam-purple" style={{ left: "33%", opacity: 0.5 }} />
            {/* second set — right cluster, more subtle */}
            <div className="neon-beam neon-beam-blue" style={{ left: "64%", opacity: 0.4 }} />
            <div className="neon-beam neon-beam-pink" style={{ left: "68%", opacity: 0.32 }} />
          </div>

          {/* ambient radial glows */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "20%",
                width: 500,
                height: 800,
                background:
                  "radial-gradient(ellipse at center, rgba(14,165,233,0.07) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "28%",
                width: 400,
                height: 800,
                background:
                  "radial-gradient(ellipse at center, rgba(232,121,249,0.07) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                right: "5%",
                width: 500,
                height: 500,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />
          </div>

          <div className="relative max-w-4xl" style={{ zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="badge-available mb-8"
            >
              <span className="pulse-dot" />
              Disponible para nuevos proyectos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-black tracking-tighter leading-[0.95] text-white mb-6"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
            >
              Daniel
              <br />
              <span className="text-purple-gradient">Isaac</span>
              <br />
              Elgueta
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-xl md:text-2xl font-bold mb-6"
              style={{ color: "var(--purple-bright)", minHeight: 40 }}
            >
              <Type />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl"
              style={{ color: "var(--text-muted)" }}
            >
              Especializado en análisis de datos, inteligencia de negocios y
              machine learning. Transformando datos en decisiones estratégicas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="btn-purple">
                Ver Proyectos
              </a>
              <a href="#about" className="btn-ghost">
                Sobre Mí
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 mt-12"
            >
              <span
                className="text-[9px] uppercase tracking-widest font-black"
                style={{ color: "var(--text-muted)" }}
              >
                Stack
              </span>
              {[
                { Icon: FaPython, label: "Python" },
                { Icon: SiPowerbi, label: "Power BI" },
                { Icon: SiMicrosoftsqlserver, label: "SQL" },
                { Icon: FaGitAlt, label: "Git" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="skill-orb"
                  style={{ width: 56, height: 56 }}
                >
                  <Icon size={18} />
                  <span style={{ fontSize: "0.5rem" }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
             ABOUT
        ══════════════════════════════════ */}
        <section id="about" className="py-32 px-6 md:px-20 lg:px-28">
          <div className="section-sep mb-24" />
          <div
            className="max-w-6xl mx-auto"
            ref={aboutPanelRef}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              perspective: "1400px",
            }}
          >
            <p
              className="text-[0.625rem] uppercase tracking-[0.22em] font-black mb-4"
              style={{ color: "var(--purple)" }}
            >
              {"// Sobre Mí"}
            </p>
            <h2
              className="font-black tracking-tighter text-white mb-16"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              ¿Quién{" "}
              <span className="text-purple-gradient">SOY?</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                {[
                  "Soy Daniel Isaac Elgueta Fuentes, estudiante de Ingeniería en Informática con una fuerte inclinación hacia el mundo de los datos.",
                  "Mi objetivo es utilizar la tecnología para simplificar procesos complejos y extraer información valiosa que guíe la toma de decisiones estratégicas.",
                  "Me especializo en Business Intelligence, Análisis de Datos y SQL. Apasionado por IA y Machine Learning.",
                ].map((text, i) => (
                  <p
                    key={i}
                    className="text-lg leading-relaxed font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {text}
                  </p>
                ))}

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    {
                      label: "GitHub",
                      href: "https://github.com/danielisaacdev",
                      Icon: AiFillGithub,
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/danielisaacdev/",
                      Icon: FaLinkedinIn,
                    },
                  ].map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost"
                      style={{ padding: "10px 20px" }}
                    >
                      <Icon size={16} /> {label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-[0.625rem] uppercase tracking-widest font-black mb-6"
                  style={{ color: "var(--purple)" }}
                >
                  Habilidades
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { Icon: FaPython, label: "Python" },
                    { Icon: SiPowerbi, label: "Power BI" },
                    { Icon: SiMicrosoftsqlserver, label: "SQL Server" },
                    { Icon: SiOracle, label: "Oracle SQL" },
                    { Icon: FaGitAlt, label: "Git" },
                    { Icon: FaDatabase, label: "Data Mining" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="skill-orb">
                      <Icon size={22} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
             PROJECTS
        ══════════════════════════════════ */}
        <section id="projects" className="py-32 px-6 md:px-20 lg:px-28">
          <div className="section-sep mb-24" />
          <div className="max-w-6xl mx-auto">
            <p
              className="text-[0.625rem] uppercase tracking-[0.22em] font-black mb-4"
              style={{ color: "var(--purple)" }}
            >
              {"// Proyectos"}
            </p>
            <h2
              className="font-black tracking-tighter text-white mb-24"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Mi <span className="text-purple-gradient">Trabajo</span>
            </h2>

            {loadingProjects ? (
              <div className="flex justify-center items-center h-64">
                <div
                  className="animate-spin rounded-full h-12 w-12"
                  style={{ borderBottom: "2px solid var(--purple)" }}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-14">
                {projectsToShow.map((repo, index) => {
                  const matched = personalInfo.projects.find((p) => {
                    const rn = repo.name
                      .toLowerCase()
                      .replace(/[\s\-_]/g, "");
                    const pn = p.name.toLowerCase().replace(/[\s\-_]/g, "");
                    return pn.includes(rn) || rn.includes(pn);
                  });
                  const desc =
                    matched?.description ||
                    repo.description ||
                    "Proyecto open source enfocado en excelencia técnica y buenas prácticas.";
                  const tags =
                    matched?.tags ||
                    (repo.language ? [repo.language] : ["Open Source"]);
                  const previewSrc = repo.homepage
                    ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(
                        repo.homepage
                      )}?w=800&h=600`
                    : `https://opengraph.githubassets.com/1/danielisaacdev/${repo.name}`;
                  const isEven = index % 2 === 0;
                  const atm = atmospheres[index % atmospheres.length];

                  return (
                    <div
                      key={repo.id || repo.name}
                      style={{ perspective: "1400px" }}
                    >
                      <motion.div
                        initial={{
                          rotateY: isEven ? 75 : -75,
                          opacity: 0,
                          y: 60,
                        }}
                        whileInView={{ rotateY: 0, opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 1.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div
                          className={`project-card flex flex-col ${
                            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                          } overflow-hidden`}
                        >
                          {/* ── Laptop mockup side ── */}
                          <div
                            className="w-full lg:w-[50%] flex items-center justify-center py-14 px-8 relative overflow-hidden"
                            style={{ background: "var(--surface)", minHeight: 320 }}
                          >
                            {/* Atmospheric glow — unique per project */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 60%, ${atm.primary} 0%, transparent 70%)`,
                                pointerEvents: "none",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `radial-gradient(ellipse at 20% 80%, ${atm.secondary} 0%, transparent 60%)`,
                                pointerEvents: "none",
                              }}
                            />

                            {/* Neon beam accent — matches video column effect */}
                            <div style={{
                              position: "absolute",
                              left: isEven ? "18%" : "auto",
                              right: isEven ? "auto" : "18%",
                              top: 0,
                              width: 2,
                              height: "100%",
                              background: `linear-gradient(to bottom, transparent, ${atm.accent}, transparent)`,
                              opacity: 0.5,
                              filter: "blur(1px)",
                            }} />
                            <div style={{
                              position: "absolute",
                              left: isEven ? "18%" : "auto",
                              right: isEven ? "auto" : "18%",
                              top: 0,
                              width: 40,
                              height: "100%",
                              background: `linear-gradient(to bottom, transparent, ${atm.accent}, transparent)`,
                              opacity: 0.12,
                              filter: "blur(16px)",
                            }} />

                            {/* Ghost number */}
                            <span
                              className="absolute bottom-4 right-6 font-black leading-none select-none pointer-events-none"
                              style={{ fontSize: 80, color: `${atm.accent}10` }}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Top glow line */}
                            <div style={{
                              position: "absolute",
                              top: 0,
                              left: "15%",
                              right: "15%",
                              height: 1,
                              background: `linear-gradient(to right, transparent, ${atm.accent}80, transparent)`,
                            }} />

                            {/* Laptop mockup */}
                            <div className="laptop-wrapper relative z-10">
                              <div className="laptop-3d" style={{
                                borderColor: `${atm.accent}55`,
                                boxShadow: `0 0 0 1px ${atm.accent}10, 0 50px 100px rgba(0,0,0,0.85), 0 0 80px ${atm.accent}20`,
                              }}>
                                <div className="laptop-camera" style={{ background: `${atm.accent}60` }} />
                                <div className="laptop-screen">
                                  <img
                                    src={previewSrc}
                                    alt={repo.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://opengraph.githubassets.com/1/danielisaacdev/${repo.name}`;
                                    }}
                                  />
                                </div>
                                <div className="laptop-chin" />
                              </div>
                            </div>
                          </div>

                          {/* ── Info side ── */}
                          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center gap-6">
                            {/* Counter */}
                            <div className="flex items-center gap-3">
                              <span
                                className="text-[10px] font-black uppercase tracking-[0.35em]"
                                style={{ color: "rgba(168,85,247,0.45)" }}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div
                                className="flex-1 h-px"
                                style={{
                                  background: "rgba(168,85,247,0.1)",
                                }}
                              />
                              <span
                                className="text-[10px] font-bold"
                                style={{ color: "rgba(255,255,255,0.08)" }}
                              >
                                {String(projectsToShow.length).padStart(
                                  2,
                                  "0"
                                )}
                              </span>
                            </div>

                            <h3
                              className="font-black text-white tracking-tight leading-tight"
                              style={{
                                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                              }}
                            >
                              {repo.name}
                            </h3>

                            <div className="flex flex-wrap gap-2">
                              {tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="tag-pill">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <p
                              className="text-sm leading-relaxed font-light"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {desc}
                            </p>

                            {/* Stats */}
                            <div
                              className="flex gap-5 text-[11px] font-mono"
                              style={{ color: "rgba(255,255,255,0.18)" }}
                            >
                              <span className="flex items-center gap-1">
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: 13 }}
                                >
                                  star
                                </span>
                                {repo.stargazers_count || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: 13 }}
                                >
                                  fork_right
                                </span>
                                {repo.forks_count || 0}
                              </span>
                              {repo.updated_at && (
                                <span className="flex items-center gap-1">
                                  <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 13 }}
                                  >
                                    schedule
                                  </span>
                                  {new Date(repo.updated_at).toLocaleDateString(
                                    "es-CL",
                                    {
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              )}
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-3">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost"
                                style={{
                                  padding: "10px 20px",
                                  fontSize: "0.8125rem",
                                }}
                              >
                                <AiFillGithub size={15} /> Ver Código
                              </a>
                              {repo.homepage && (
                                <a
                                  href={repo.homepage}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn-purple"
                                  style={{
                                    padding: "10px 20px",
                                    fontSize: "0.8125rem",
                                  }}
                                >
                                  <AiOutlineGlobal size={15} /> Demo Live
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════
             CONTACT
        ══════════════════════════════════ */}
        <section id="contact" className="py-32 px-6 md:px-20 lg:px-28">
          <div className="section-sep mb-24" />
          <div
            className="max-w-4xl mx-auto text-center"
            ref={contactPanelRef}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              perspective: "1400px",
            }}
          >
            <p
              className="text-[0.625rem] uppercase tracking-[0.22em] font-black mb-4"
              style={{ color: "var(--purple)" }}
            >
              {"// Contacto"}
            </p>
            <h2
              className="font-black tracking-tighter text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Hablemos de tu{" "}
              <span className="text-purple-gradient">Proyecto</span>
            </h2>
            <p
              className="text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              ¿Buscas un especialista en análisis de datos y business
              intelligence? Estoy disponible para nuevos proyectos y
              colaboraciones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "email",
                  label: "Email",
                  value: "daniel.isaac.dev@gmail.com",
                  href: "mailto:daniel.isaac.dev@gmail.com",
                },
                {
                  icon: "phone",
                  label: "Teléfono",
                  value: "+56 9 9214 9141",
                  href: "tel:+56992149141",
                },
                {
                  icon: "business",
                  label: "LinkedIn",
                  value: "danielisaacdev",
                  href: "https://www.linkedin.com/in/danielisaacdev/",
                },
                {
                  icon: "code",
                  label: "GitHub",
                  value: "danielisaacdev",
                  href: "https://github.com/danielisaacdev",
                },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="contact-card"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: "rgba(168,85,247,0.08)",
                      border: "1px solid rgba(168,85,247,0.22)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ color: "var(--purple-bright)" }}
                    >
                      {icon}
                    </span>
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-widest font-black mb-2"
                    style={{ color: "var(--purple)" }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-sm font-light break-words"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {value}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default App;
