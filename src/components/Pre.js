import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Pre({ load }) {
  return (
    <AnimatePresence>
      {load && (
        <motion.div
          id="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            y: -1000,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#05070a] flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white flex gap-1"
            >
              {"DANIEL".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
               className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-4 opacity-70"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 text-xs uppercase tracking-[0.4em] font-light text-white"
            >
              Cargando Portafolio de Datos
            </motion.p>
          </div>
          
          <div className="absolute inset-0 pointer-events-none opacity-20">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4facfe] rounded-full blur-[120px] animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Pre;
