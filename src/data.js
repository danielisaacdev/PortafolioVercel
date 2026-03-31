export const personalInfo = {
  name: process.env.REACT_APP_NAME || "Daniel Isaac Elgueta Fuentes",
  role: process.env.REACT_APP_ROLE || "Estudiante de Ingeniería en Informática",
  description: process.env.REACT_APP_DESCRIPTION || "Especializado en análisis de datos, inteligencia de negocios y machine learning. Apasionado por transformar datos en decisiones estratégicas.",
  location: process.env.REACT_APP_LOCATION || "Santiago, Chile",
  email: process.env.REACT_APP_EMAIL || "daniel.isaac.dev@gmail.com",
  phone: process.env.REACT_APP_PHONE || "+56 9 9214 9141",
  socials: {
    github: process.env.REACT_APP_GITHUB || "https://github.com/danielisaacdev",
    linkedin: process.env.REACT_APP_LINKEDIN || "https://www.linkedin.com/in/danielisaacdev/",
    whatsapp: process.env.REACT_APP_WHATSAPP || "https://wa.me/56992149141",
  },
  skills: [
    { label: "Análisis de Datos", details: "Python (pandas, numpy), ML Intermedio" },
    { label: "Business Intelligence", details: "Power BI (Dashboards & KPIs)" },
    { label: "Bases de Datos", details: "SQL Server, Oracle SQL" },
    { label: "Herramientas", details: "GitHub, VS Code" }
  ],
  projects: [
    {
      name: "Dashboard de Ventas – Power BI",
      description: "Visualización estratégica de KPIs comerciales mediante dashboards interactivos, facilitando la toma de decisiones basada en datos sintéticos y reales.",
      image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=Power+BI+Dashboard",
      tags: ["Power BI", "DAX", "Business Intelligence"]
    },
    {
      name: "Análisis de Datos con Python",
      description: "Entorno de análisis exploratorio (EDA) y limpieza de datos masivos utilizando Pandas y NumPy para extraer insights accionables.",
      image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=Python+Data+Analysis",
      tags: ["Python", "Pandas", "Scikit-Learn"]
    },
    {
      name: "OnStore – E-commerce Prototipo",
      description: "Desarrollo de una tienda en línea moderna utilizando Astro.js, enfocada en la optimización de carga y arquitectura de componentes.",
      image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=Astro+OnStore",
      tags: ["Astro", "Tailwind CSS", "UX/UI"]
    },
    {
      name: "FastAPI CRM Backend",
      description: "API robusta para gestión de relaciones con clientes, implementada con FastAPI para asegurar baja latencia y alta concurrencia.",
      image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=FastAPI+CRM",
      tags: ["Python", "FastAPI", "REST API"]
    },
    {
      name: "Web Scraping Pipeline",
      description: "Automatización de recolección de datos web a gran escala, procesando información desestructurada para bases de datos relacionales.",
      image: "https://via.placeholder.com/600x400/1b1f2c/93ccff?text=Web+Scraping",
      tags: ["Python", "Selenium", "Data Mining"]
    }
  ],
  education: [
    {
      institution: "Duoc UC",
      degree: "Ingeniería en Informática",
      period: "2023 - 2026"
    }
  ],
  mission: "Comprometido con el análisis de datos estratégico y el desarrollo de soluciones tecnológicas eficientes."
};
