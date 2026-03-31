export const personalInfo = {
  name: process.env.REACT_APP_NAME,
  role: process.env.REACT_APP_ROLE,
  description: process.env.REACT_APP_DESCRIPTION,
  location: process.env.REACT_APP_LOCATION,
  email: process.env.REACT_APP_EMAIL,
  phone: process.env.REACT_APP_PHONE,
  socials: {
    github: process.env.REACT_APP_GITHUB,
    linkedin: process.env.REACT_APP_LINKEDIN,
    whatsapp: process.env.REACT_APP_WHATSAPP,
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
