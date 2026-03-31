import React from "react";
import { personalInfo } from "../data";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="w-full py-12 border-t border-[#313442]/30 bg-[#0a0e1a] relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 gap-4">
        <div className="text-sm font-bold text-[#f4fff5]">
          {personalInfo.name.split(' ')[0]} {personalInfo.name.split(' ')[1]}
        </div>
        <div className="font-['Inter'] text-xs font-light tracking-wide text-[#bec7d3]">
          © {year} {personalInfo.name.split(' ')[0]} {personalInfo.name.split(' ')[1]}. Built with precision.
        </div>
        <div>
          <a className="font-['Inter'] text-xs font-light tracking-wide text-[#93ccff] hover:text-white transition-colors no-underline" href="#top">Volver Arriba</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
