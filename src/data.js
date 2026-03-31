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
