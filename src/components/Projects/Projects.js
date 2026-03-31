import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillGithub, AiOutlineGlobal, AiOutlineClose } from "react-icons/ai";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get("https://api.github.com/users/danielisaacdev/repos");
        const filteredRepos = response.data.filter(repo => repo.name !== "PortafolioVercel");
        setRepos(filteredRepos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const getPreviewImage = (repo) => {
    if (repo.homepage) {
      // Use WordPress mshots service for a 600x400 screenshot of the live site
      return `https://s0.wp.com/mshots/v1/${encodeURIComponent(repo.homepage)}?w=600&h=400`;
    }
    // Fallback to official GitHub OpenGraph image
    return `https://opengraph.githubassets.com/1/danielisaacdev/${repo.name}`;
  };

  return (
    <main className="relative pt-32 pb-20 px-6 min-h-screen">
      <div className="aurora-bg"></div>
      
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-block">
            <span className="font-['Inter'] font-semibold text-[10px] uppercase tracking-[0.2em] text-primary/80">GitHub Portfolio</span>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-2"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Mis Proyectos <span className="text-gradient">En Vivo</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl font-light max-w-2xl mx-auto">
            Explora mis proyectos con previsualizaciones en vivo y acceso directo al código fuente.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {repos.map((repo) => (
              <div 
                key={repo.id} 
                onClick={() => setSelectedProject(repo)}
                className="group bg-surface-container hover:bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getPreviewImage(repo)} 
                    alt={repo.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://opengraph.githubassets.com/1/danielisaacdev/${repo.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                     <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest">{repo.language || "Open Source"}</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{repo.name}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-light line-clamp-2 h-10">
                    {repo.description || "Sin descripción proporcionada en el repositorio."}
                  </p>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                      Ver Detalles <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                    <div className="flex gap-4">
                       <span className="flex items-center gap-1 text-[11px] text-on-surface-variant/50">
                          <span className="material-symbols-outlined text-[14px]">star</span>
                          {repo.stargazers_count}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1b1f2c] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors z-10"
            >
              <AiOutlineClose size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto bg-black relative">
                <img 
                  src={getPreviewImage(selectedProject)} 
                  alt={selectedProject.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1f2c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1b1f2c]"></div>
              </div>
              
              <div className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">{selectedProject.language || "Proyecto"}</span>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{selectedProject.name}</h2>
                  <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                    {selectedProject.description || "Proyecto open source desarrollado en GitHub. Enfoque en soluciones escalables y buenas prácticas."}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <a 
                    href={selectedProject.html_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all no-underline"
                  >
                    <AiFillGithub size={24} />
                    Ver Código Fuente
                  </a>
                  {selectedProject.homepage && (
                    <a 
                      href={selectedProject.homepage} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold transition-all no-underline shadow-lg shadow-primary/20"
                    >
                      <AiOutlineGlobal size={24} />
                      Ver Demo en Vivo
                    </a>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 mb-1">Stars</p>
                    <p className="text-lg font-bold text-white">{selectedProject.stargazers_count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 mb-1">Forks</p>
                    <p className="text-lg font-bold text-white">{selectedProject.forks_count}</p>
                  </div>
                   <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 mb-1">Issues</p>
                    <p className="text-lg font-bold text-white">{selectedProject.open_issues_count}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;
