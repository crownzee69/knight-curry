'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


export default function SplashAnimation() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    
    // Start fading out after 4 seconds
    const fadeTimer = setTimeout(() => setIsVisible(false), 4000);
    
    // Completely remove from DOM after fade completes (5 seconds)
    const removeTimer = setTimeout(() => setIsRendered(false), 5000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted) return null;
  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-neutral-950 transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none blur-sm'
      }`}
    >
      {/* Subtle noise background for premium texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="relative flex items-center justify-center w-full h-full max-h-[400px]">
        
        {/* The Elegant Line Drawn Kadahi */}
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease: "easeInOut" }}
          className="absolute z-20"
        >
          <svg viewBox="0 0 100 60" className="w-48 h-48 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] overflow-visible">
            {/* Bowl body */}
            <motion.path
              d="M20,30 Q20,55 50,55 Q80,55 80,30 Z"
              fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
            {/* Bowl rim */}
            <motion.ellipse
              cx="50" cy="30" rx="30" ry="7"
              fill="none" stroke="#f59e0b" strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            />
            {/* Handles */}
            <motion.path d="M10,30 Q5,35 15,38" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
            <motion.path d="M90,30 Q95,35 85,38" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
          </svg>
        </motion.div>

        {/* Flavor Burst Explosion */}
        {[...Array(20)].map((_, i) => {
          const angle = (i * 18) * (Math.PI / 180);
          const radius = 120 + Math.random() * 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const colors = ['bg-red-600', 'bg-amber-400', 'bg-orange-500', 'bg-yellow-400'];
          return (
            <motion.div
              key={`burst-${i}`}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x, y, scale: Math.random() * 2 + 0.5, opacity: 0 }}
              transition={{ duration: 1.0, delay: 1.5, ease: "easeOut" }}
              className={`absolute z-10 w-5 h-5 rounded-full ${colors[i % colors.length]} blur-[2px] mix-blend-screen pointer-events-none`}
            />
          );
        })}
        
        {/* Inner Glow expanding and fading */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 5, 8], opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
          className="absolute z-0 w-24 h-24 bg-amber-500/30 rounded-full blur-3xl pointer-events-none"
        />

        {/* Actual Brand Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1, type: "spring", bounce: 0.4 }}
          className="absolute z-30 flex flex-col items-center"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            <Image
              src="/assets/images/logo.svg"
              alt="Knights Curry Express Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8, ease: "easeOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="text-amber-500 font-poppins text-xs md:text-sm tracking-[0.5em] uppercase font-bold mt-4 drop-shadow-md whitespace-nowrap"
          >
            Authentic Indian Flavors
          </motion.p>
        </motion.div>

      </div>
    </div>
  );
}
