import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  Shield, Terminal as TerminalIcon, Send, Volume2, VolumeX, 
  ExternalLink, Cpu, Layers, Globe, Compass, 
  Mail, User, ArrowUp, Menu, X, Play, RotateCcw, Flame, CheckCircle, Briefcase, Calendar
} from 'lucide-react';

// ==========================================
// --- MEMOIZED HIGH-PERFORMANCE SUB-COMPONENTS ---
// ==========================================

// --- NAVBAR COMPONENT ---
const Navbar = React.memo(({ activeSection, mobileMenuOpen, setMobileMenuOpen, playUiSound, isMuted, setIsMuted, volume, setVolume, hoverProps }) => {
  return (
    <>
      <motion.nav 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-20 glass-matte border-b border-white/5 flex items-center justify-between px-6 md:px-16"
      >
        {/* Left Side: Mockup Horned Samurai Helmet Red Circle Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-3 group relative cursor-pointer"
          {...hoverProps}
          onClick={() => {
            playUiSound('click');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* Mockup Helmet Crest SVG */}
          <div className="text-white relative">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_8px_rgba(255,26,26,0.5)]">
              <circle cx="50" cy="50" r="45" fill="#ff1a1a" />
              {/* Horned Samurai silhouette inside circle */}
              <path d="M50 18C33 18 25 30 25 45C25 48 27 52 28 56C21 56 18 62 18 69C18 75 23 80 29 80H71C77 80 82 75 82 69C82 62 79 56 72 56C73 52 75 48 75 45C75 30 67 18 50 18ZM50 33C50 33 41 22 31 24C39 30 44 33 47 38C48 38 50 33 50 33ZM50 33C50 33 59 22 69 24C61 30 56 33 53 38C52 38 50 33 50 33Z" fill="#020205" />
              {/* Visor Area inside helmet in red */}
              <rect x="34" y="48" width="32" height="7" rx="1.5" fill="#ff1a1a" />
              {/* Mask grid jaw shape in black */}
              <path d="M37 56L43 70H57L63 56" stroke="#020205" strokeWidth="2.5" fill="#020205"/>
            </svg>
          </div>
          <div className="text-left flex flex-col justify-center leading-none">
            <span className="font-gaming font-black text-xs md:text-sm tracking-[3.5px] text-white">
              DEATH
            </span>
            <span className="font-gaming text-[9px] tracking-[1.5px] text-cyber-red font-bold block mt-0.5">
              VAULT
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-12">
          {[
            { id: 'mastery', label: 'Mastery' },
            { id: 'path', label: 'The Path' },
            { id: 'vault-deck', label: 'The Vault' }
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-2 font-gaming text-[10px] md:text-xs uppercase tracking-[3px] transition-colors duration-300 ${activeSection === item.id ? 'text-cyber-red font-bold' : 'text-white/60 hover:text-white'}`}
              {...hoverProps}
              onClick={() => playUiSound('click')}
            >
              {item.label}
              
              {/* Thin neon red sliding line under active nav */}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNavLine"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-cyber-red shadow-[0_0_8px_#ff1a1a]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Side: CTA Button with slitted corner cuts + mute fader */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Subtle Ambient Volume Control */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 py-1.5 px-3 rounded-full">
            <button 
              onClick={() => {
                setIsMuted(!isMuted);
                playUiSound('click');
              }}
              className="text-cyber-red/80 hover:text-cyber-red transition-colors duration-300"
              {...hoverProps}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="animate-pulse" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-12 h-1 bg-[#101018] rounded-full appearance-none cursor-pointer accent-cyber-red outline-none border-none"
            />
          </div>

          {/* Sliced CTA Button (Slanted Top-Right & Bottom-Left) */}
          <a 
            href="#nexus"
            className="relative font-gaming text-[10px] font-bold tracking-[3px] text-white py-2.5 px-6 border border-cyber-red/60 bg-[#020205]/60 hover:bg-cyber-red hover:border-cyber-red transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(255,26,26,0.15)] focus:outline-none clip-sci-fi-small"
            {...hoverProps}
            onClick={() => playUiSound('click')}
          >
            CONTACT US
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            playUiSound('click');
          }}
          className="block md:hidden text-white hover:text-cyber-red transition-colors duration-300"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-[#05050e] bg-grain border-l border-white/5 pt-24 px-6 flex flex-col gap-8 shadow-2xl md:hidden"
          >
            {[
              { id: 'mastery', label: 'Mastery' },
              { id: 'path', label: 'The Path' },
              { id: 'vault-deck', label: 'The Vault' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playUiSound('click');
                }}
                className={`font-gaming text-sm uppercase tracking-[3px] ${activeSection === item.id ? 'text-cyber-red font-bold' : 'text-white/60'}`}
              >
                {item.label}
              </a>
            ))}

            <div className="mt-auto mb-10 border-t border-white/5 pt-8">
              <span className="font-gaming text-[9px] uppercase tracking-wider text-[#707080] block mb-4">TACTICAL AUDIO CHANNEL</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setIsMuted(!isMuted);
                    playUiSound('click');
                  }}
                  className="p-2 border border-white/5 rounded-full text-cyber-red/80 hover:text-cyber-red"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <div className="flex-1">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#101018] rounded-full accent-cyber-red appearance-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

// --- MASTERY COMPONENT ---
const Mastery = React.memo(({ hoverProps }) => {
  return (
    <section 
      id="mastery" 
      className="relative py-24 z-10 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="absolute top-1/2 left-0 w-[200px] h-[200px] bg-cyber-red/5 rounded-full filter blur-[70px] pointer-events-none" />

      <div className="text-center mb-16">
        <div className="font-gaming text-xs font-bold tracking-[6px] text-cyber-red text-glow-red mb-2 uppercase">
          // CRITICAL SKILLSETS DEPLOYED //
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          CREATIVE MASTERY
        </h2>
        <div className="w-16 h-[2px] bg-cyber-red mx-auto mt-4" />
      </div>

      {/* Services Operator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Card 1: Full Stack */}
        <div 
          className="group relative glass-matte p-8 rounded-sm overflow-hidden flex flex-col hover:border-cyber-red/40 hover:bg-cyber-red/5 transition-all duration-500 clip-sci-fi"
          {...hoverProps}
        >
          <div className="absolute inset-x-0 h-[1.5px] bg-cyber-red/60 shadow-[0_0_10px_#ff1a1a] top-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ animation: 'scan 2.8s linear infinite' }} />
          
          <div className="text-cyber-red mb-6 relative">
            <Cpu size={32} />
            <div className="absolute inset-0 bg-cyber-red/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <h4 className="font-gaming font-extrabold text-lg tracking-wider mb-3 group-hover:text-cyber-red transition-colors duration-300">
            FULL STACK CODING
          </h4>
          <p className="text-sm text-[#8a8a9e] leading-relaxed mb-6">
            Scalable backends, blazing-fast optimized static pages, and complex visual architecture engineered for maximum stability.
          </p>

          <div className="mt-auto pt-6 border-t border-white/5 font-gaming text-[10px] text-[#555566] flex justify-between uppercase">
            <span>ENG: NODE / VITE</span>
            <span className="text-cyber-red">98% OPTIMIZED</span>
          </div>
        </div>

        {/* Card 2: Video Pro */}
        <div 
          className="group relative glass-matte p-8 rounded-sm overflow-hidden flex flex-col hover:border-cyber-red/40 hover:bg-cyber-red/5 transition-all duration-500 clip-sci-fi"
          {...hoverProps}
        >
          <div className="absolute inset-x-0 h-[1.5px] bg-cyber-red/60 shadow-[0_0_10px_#ff1a1a] top-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ animation: 'scan 2.8s linear infinite', animationDelay: '0.8s' }} />

          <div className="text-cyber-red mb-6 relative">
            <Layers size={32} />
            <div className="absolute inset-0 bg-cyber-red/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <h4 className="font-gaming font-extrabold text-lg tracking-wider mb-3 group-hover:text-cyber-red transition-colors duration-300">
            VIDEO PRO & FX
          </h4>
          <p className="text-sm text-[#8a8a9e] leading-relaxed mb-6">
            High-impact cinematic editing, motion graphics design, and premium particle overlay assets engineered for raw visual storytelling.
          </p>

          <div className="mt-auto pt-6 border-t border-white/5 font-gaming text-[10px] text-[#555566] flex justify-between uppercase">
            <span>SOFTWARE: AE / PREMIERE</span>
            <span className="text-cyber-red">60FPS TARGET</span>
          </div>
        </div>

        {/* Card 3: 3D Systems */}
        <div 
          className="group relative glass-matte p-8 rounded-sm overflow-hidden flex flex-col hover:border-cyber-red/40 hover:bg-cyber-red/5 transition-all duration-500 clip-sci-fi"
          {...hoverProps}
        >
          <div className="absolute inset-x-0 h-[1.5px] bg-cyber-red/60 shadow-[0_0_10px_#ff1a1a] top-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ animation: 'scan 2.8s linear infinite', animationDelay: '1.6s' }} />

          <div className="text-cyber-red mb-6 relative">
            <Globe size={32} />
            <div className="absolute inset-0 bg-cyber-red/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <h4 className="font-gaming font-extrabold text-lg tracking-wider mb-3 group-hover:text-cyber-red transition-colors duration-300">
            3D SYSTEMS & VR
          </h4>
          <p className="text-sm text-[#8a8a9e] leading-relaxed mb-6">
            Bespoke WebGL configurations, interactive 3D particle landscapes, and optimized virtual worlds that render natively in any viewport.
          </p>

          <div className="mt-auto pt-6 border-t border-white/5 font-gaming text-[10px] text-[#555566] flex justify-between uppercase">
            <span>ENG: THREE.JS / BLENDER</span>
            <span className="text-cyber-red">GPU ACCELERATED</span>
          </div>
        </div>

      </div>
    </section>
  );
});

// --- PATH COMPONENT ---
const Path = React.memo(({ hoverProps }) => {
  return (
    <section 
      id="path" 
      className="relative py-24 z-10 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-cyber-red/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: HUD Kabuto Helmet HUD */}
        <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
          <div 
            className="relative p-6 glass-matte-glow rounded-md shadow-2xl flex items-center justify-center max-w-[340px] w-full aspect-square border border-cyber-red/20 group"
            style={{
              transform: 'translate(calc(var(--mx) * 4px), calc(var(--my) * 4px))',
              willChange: 'transform'
            }}
          >
            
            <div className="absolute inset-0 border border-white/5 rounded-md pointer-events-none" />
            <div className="absolute top-2 left-2 font-gaming text-[8px] text-[#666677] uppercase tracking-wider">
              TACTICAL HUD ACTIVE // ID: DV_CREATOR
            </div>
            <div className="absolute bottom-2 right-2 font-gaming text-[8px] text-cyber-red uppercase tracking-wider animate-pulse">
              SYS: STABLE
            </div>

            {/* Glowing Helmet vector icon */}
            <div className="text-cyber-red filter drop-shadow-[0_0_15px_rgba(255,26,26,0.5)] transform group-hover:scale-105 transition-transform duration-500">
              <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5C25 5 15 25 15 45C15 50 18 55 20 60C12 60 8 70 8 78C8 85 14 90 20 90H80C86 90 92 85 92 78C92 70 88 60 80 60C82 55 85 50 85 45C85 25 75 5 50 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M50 25C50 25 38 12 25 15C35 22 42 26 46 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                <path d="M50 25C50 25 62 12 75 15C65 22 58 26 54 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                <rect x="28" y="44" width="44" height="10" rx="3" fill="#ff1a1a" />
                <path d="M35 60L42 75H58L65 60" stroke="currentColor" strokeWidth="2"/>
                <line x1="50" y1="60" x2="50" y2="82" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Copy */}
        <div className="lg:col-span-7 text-left order-1 lg:order-2">
          <div className="font-gaming text-xs font-bold tracking-[6px] text-cyber-red text-glow-red mb-2 uppercase">
            // PATH TO ASCENSION //
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            THE CREATOR
          </h2>
          <div className="w-16 h-[2px] bg-cyber-red mb-8" />

          <p className="text-sm md:text-base text-[#a5a5c0] leading-relaxed mb-6 font-medium">
            Specialized in high-performance digital environments, full-stack systems engineering, and creative media design. I merge raw code logic with high-impact aesthetics to engineer products that captivate and dominate in the viewport.
          </p>
          
          <p className="text-sm md:text-base text-[#8a8a9e] leading-relaxed mb-8">
            Over the path of my ascension, I have developed dozens of tactical modules, WebGL systems, and secure applications. Dominating latency, caching issues, and responsive constraints is my ultimate calling.
          </p>

          {/* Microstats blocks */}
          <div className="flex gap-12 font-gaming">
            <div>
              <h4 className="text-3xl font-black text-cyber-red text-glow-red">4+</h4>
              <p className="text-[10px] tracking-[2px] text-[#666677] uppercase mt-1">YEARS EXP</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-cyber-red text-glow-red">50+</h4>
              <p className="text-[10px] tracking-[2px] text-[#666677] uppercase mt-1">PROJECTS COMPLETED</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

// --- VAULT DECK COMPONENT ---
const VaultDeck = React.memo(({ vaultUnlocked, assetCounter, enteredPasscode, passcodeError, setEnteredPasscode, handlePasscodeSubmit, playUiSound, hoverProps, projects }) => {
  return (
    <section 
      id="vault-deck" 
      className="relative py-24 z-10 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="text-center mb-16">
        <div className="font-gaming text-xs font-bold tracking-[6px] text-cyber-red text-glow-red mb-2 uppercase">
          // TACTICAL PROJECT DECK //
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          THE VAULT
        </h2>
        <div className="font-gaming text-[9px] text-[#6c6c82] mt-4 uppercase tracking-[3px]">
          <span className="text-cyber-red font-bold text-glow-red">{vaultUnlocked ? assetCounter : 0}</span> ASSETS SECURED // SYSTEM STATE: {vaultUnlocked ? 'NOMINAL' : 'LOCKED'}
        </div>
        <div className="w-16 h-[2px] bg-cyber-red mx-auto mt-4" />
      </div>

      {/* Password Decryption System Interface */}
      {!vaultUnlocked ? (
        <div className="max-w-md w-full mx-auto glass-matte p-8 md:p-10 border border-cyber-red/20 rounded-sm relative z-20 clip-sci-fi shadow-[0_0_30px_rgba(255,26,26,0.1)]">
          <div className="absolute inset-x-0 h-[1.5px] bg-cyber-red/60 shadow-[0_0_10px_#ff1a1a] top-0 animate-pulse pointer-events-none" />
          
          <div className="flex flex-col items-center text-center">
            {/* Pulsing Lock Shield */}
            <div className={`p-4 rounded-full border border-cyber-red/30 bg-cyber-red/5 text-cyber-red mb-6 ${passcodeError ? 'animate-bounce border-cyber-red bg-cyber-red/20' : 'animate-pulse'}`}>
              <Shield size={36} />
            </div>

            <h3 className="font-gaming font-extrabold text-lg tracking-wider mb-2 text-white uppercase">
              VAULT SECURITY LOCKOUT
            </h3>
            
            <p className="text-xs text-[#8a8a9e] mb-6 tracking-wide font-gaming uppercase h-5">
              {passcodeError ? (
                <span className="text-cyber-red font-bold text-glow-red animate-pulse">
                  ACCESS DENIED // CRITICAL ERR
                </span>
              ) : (
                <span>LEVEL 5 SECURE PASSCODE REQUIRED</span>
              )}
            </p>

            {/* Glowing Passcode Input Fields */}
            <div className="flex justify-center gap-2 mb-8 w-full max-w-[280px]">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-10 h-12 flex items-center justify-center border font-gaming text-lg font-bold rounded-sm bg-[#040409]/95 transition-all duration-300 ${
                    passcodeError 
                      ? 'border-cyber-red text-cyber-red shadow-[0_0_8px_#ff1a1a]' 
                      : idx === enteredPasscode.length 
                        ? 'border-cyber-red shadow-[0_0_6px_#ff1a1a] text-white' 
                        : enteredPasscode.length > idx 
                          ? 'border-cyber-red/60 text-white' 
                          : 'border-white/10 text-white/20'
                  }`}
                >
                  {enteredPasscode.length > idx ? '●' : '_'}
                </div>
              ))}
            </div>

            {/* Keypad Grid for Tactility */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (enteredPasscode.length < 6 && !passcodeError) {
                      playUiSound('hover');
                      const nextCode = enteredPasscode + num;
                      setEnteredPasscode(nextCode);
                      if (nextCode.length === 6) {
                        handlePasscodeSubmit(nextCode);
                      }
                    }
                  }}
                  className="py-3 bg-white/5 hover:bg-cyber-red/20 border border-white/5 hover:border-cyber-red/40 rounded-sm font-gaming text-sm font-bold text-white transition-all duration-200 focus:outline-none"
                  {...hoverProps}
                >
                  {num}
                </button>
              ))}
              
              {/* Clear Key */}
              <button
                onClick={() => {
                  playUiSound('click');
                  setEnteredPasscode('');
                }}
                className="py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-sm font-gaming text-[10px] font-bold text-white/60 hover:text-white transition-all duration-200 focus:outline-none uppercase"
                {...hoverProps}
              >
                CLEAR
              </button>
              
              {/* 0 Key */}
              <button
                onClick={() => {
                  if (enteredPasscode.length < 6 && !passcodeError) {
                    playUiSound('hover');
                    const nextCode = enteredPasscode + '0';
                    setEnteredPasscode(nextCode);
                    if (nextCode.length === 6) {
                      handlePasscodeSubmit(nextCode);
                    }
                  }
                }}
                className="py-3 bg-white/5 hover:bg-cyber-red/20 border border-white/5 hover:border-cyber-red/40 rounded-sm font-gaming text-sm font-bold text-white transition-all duration-200 focus:outline-none"
                {...hoverProps}
              >
                0
              </button>

              {/* Submit Key */}
              <button
                onClick={() => {
                  playUiSound('click');
                  handlePasscodeSubmit(enteredPasscode);
                }}
                className="py-3 bg-gradient-to-br from-cyber-red to-cyber-darkRed hover:brightness-125 rounded-sm font-gaming text-[10px] font-bold text-white transition-all duration-200 focus:outline-none uppercase"
                {...hoverProps}
              >
                ENTER
              </button>
            </div>
            
            <div className="font-gaming text-[9px] text-[#555566] tracking-[2px] uppercase">
              &gt; HINT: 123456
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {projects.map((project, idx) => (
            <a 
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative glass-matte p-6 rounded-sm overflow-hidden flex flex-col hover:border-cyber-red hover:bg-cyber-red/5 transition-all duration-500 clip-sci-fi-small cursor-pointer"
              {...hoverProps}
              onClick={() => playUiSound('click')}
            >
              <div className="absolute inset-x-0 h-[1px] bg-cyber-red shadow-[0_0_8px_#ff1a1a] top-0 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ animation: 'scan 2s linear infinite' }} />

              <div className="flex items-center justify-between font-gaming text-[9px] text-[#6c6c82] mb-6">
                <span>{project.id}</span>
                <span className="text-cyber-red border border-cyber-red/30 px-2 py-0.5 rounded-sm uppercase font-bold text-[8px] tracking-wider bg-cyber-red/5">
                  {project.tag}
                </span>
              </div>

              <h3 className="font-gaming font-extrabold text-base tracking-wider mb-2 text-white group-hover:text-cyber-red transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-xs text-[#8a8a9e] mb-8 leading-relaxed">
                {project.desc}
              </p>

              <div className="absolute inset-x-6 bottom-16 bg-[#040409]/95 border border-white/5 p-3 rounded-sm font-gaming text-[8px] text-[#7c7c8f] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 pointer-events-none flex flex-col gap-1">
                <div>&gt; ENGINE: {project.engine}</div>
                <div>&gt; PROTOCOL: {project.type}</div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between font-gaming text-[9px] uppercase">
                <span className="text-cyber-red">ENG: {project.engine.split('/')[0]}</span>
                <div className="flex items-center gap-1.5 text-[#00ff00]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00] animate-pulse" />
                  <span>{project.status}</span>
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      )}
    </section>
  );
});

// --- NEXUS COMPONENT ---
const Nexus = React.memo(({ formattedTime, terminalLogs, terminalInput, setTerminalInput, handleTerminalSubmit, terminalRef, hoverProps, playUiSound }) => {
  return (
    <section 
      id="nexus" 
      className="relative py-24 z-10 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyber-red/5 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="text-center mb-16">
        <div className="font-gaming text-xs font-bold tracking-[6px] text-cyber-red text-glow-red mb-2 uppercase">
          // OPERATIONAL CONTROL STATION //
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          NEXUS DECK
        </h2>
        <div className="w-16 h-[2px] bg-cyber-red mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Column: Interactive Web Terminal Emulator */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex-1 glass-matte rounded-sm border border-white/5 overflow-hidden flex flex-col h-[400px] shadow-2xl relative">
            
            <div className="bg-[#05050f]/80 px-4 py-2 border-b border-white/5 flex items-center justify-between font-gaming text-[9px] uppercase tracking-wider text-[#6a6a80]">
              <span>VAULT_OS TERMINAL SIMULATOR v1.1.0</span>
              <span className="text-cyber-red font-bold text-glow-red animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-cyber-red rounded-full" />
                ONLINE: {formattedTime}
              </span>
            </div>

            <div 
              ref={terminalRef}
              className="flex-1 p-4 font-gaming text-[10px] md:text-xs text-[#00ff00] overflow-y-auto flex flex-col gap-2 no-scrollbar"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            >
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text">
                  {log}
                </div>
              ))}
            </div>

            <form 
              onSubmit={handleTerminalSubmit}
              className="flex items-center gap-2 bg-[#040409] border-t border-white/5 p-3"
            >
              <span className="font-gaming text-xs text-cyber-red font-bold select-none">guest@deathvault:~$</span>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help' to unlock channels..."
                className="flex-1 bg-transparent border-none outline-none font-gaming text-xs text-[#00ff00] placeholder-[#004400] p-0"
                autoComplete="off"
              />
              <button 
                type="submit"
                className="text-[#00aa00] hover:text-[#00ff00] transition-colors p-1"
              >
                <TerminalIcon size={14} />
              </button>
            </form>

          </div>
        </div>

        {/* Right Column: Secure Signal Downlink Form */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex-1 glass-matte p-8 rounded-sm border border-white/5 shadow-2xl flex flex-col justify-between">
            
            <div>
              <h4 className="font-gaming font-extrabold text-base tracking-wider mb-6 text-cyber-red text-glow-red uppercase">
                ESTABLISH SECURE LINK
              </h4>
              
              <form 
                action="https://formspree.io/f/mqakvjwr" 
                method="POST"
                className="flex flex-col gap-4 text-left"
              >
                <div>
                  <label className="font-gaming text-[9px] uppercase tracking-wider text-[#66667a] block mb-1">Tactical Operator Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    required
                    className="w-full bg-white/5 border border-white/5 focus:border-cyber-red/60 focus:bg-cyber-red/5 rounded-sm p-3 font-display text-xs text-white placeholder-white/20 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="font-gaming text-[9px] uppercase tracking-wider text-[#66667a] block mb-1">Downlink Return Signal Address</label>
                  <input 
                    type="email" 
                    name="_replyto" 
                    placeholder="Email" 
                    required
                    className="w-full bg-white/5 border border-white/5 focus:border-cyber-red/60 focus:bg-cyber-red/5 rounded-sm p-3 font-display text-xs text-white placeholder-white/20 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="font-gaming text-[9px] uppercase tracking-wider text-[#66667a] block mb-1">Secure Data Packet Message</label>
                  <textarea 
                    name="message" 
                    rows="3" 
                    placeholder="Signal Description" 
                    required
                    className="w-full bg-white/5 border border-white/5 focus:border-cyber-red/60 focus:bg-cyber-red/5 rounded-sm p-3 font-display text-xs text-white placeholder-white/20 outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-2 group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold font-gaming tracking-[2px] text-white rounded-sm bg-gradient-to-br from-cyber-red to-cyber-darkRed hover:text-white"
                  {...hoverProps}
                  onClick={() => playUiSound('click')}
                >
                  <span className="w-full relative px-5 py-3 transition-all ease-in duration-75 bg-[#020205] rounded-sm group-hover:bg-opacity-0 clip-sci-fi-small flex items-center justify-center gap-2">
                    SEND SIGNAL <Send size={12} />
                  </span>
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

// --- FOOTER COMPONENT ---
const Footer = React.memo(({ playUiSound, hoverProps }) => {
  return (
    <footer className="relative z-10 py-12 px-6 md:px-16 bg-[#010103] border-t border-white/5 text-center font-gaming">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[#4d4d62]">
        
        <div className="flex items-center gap-3">
          <span className="text-cyber-red font-black text-sm tracking-[2px]">DEATHVAULT</span>
          <div className="w-[1.5px] h-3 bg-white/10" />
          <span className="text-[10px] tracking-wider uppercase">SECURE NETWORK SYSTEMS</span>
        </div>

        <p className="text-[10px] uppercase tracking-widest leading-relaxed">
          &copy; 2026 PIXELVAULT // DEATHVAULT CREATIVE DIRECTIVE. ALL RIGHTS SECURED.
        </p>

        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playUiSound('click');
          }}
          className="w-8 h-8 rounded-full border border-white/5 hover:border-cyber-red flex items-center justify-center text-white hover:text-cyber-red transition-all duration-300"
          {...hoverProps}
          title="SCROLL TO UPPER DECK"
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
});

// ==========================================
// --- MAIN CORE APPLICATION ---
// ==========================================

function App() {
  // --- States ---
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bootTextIndex, setBootTextIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    'VAULT_OS v1.1.0 // ESTABLISHING SECURE PROTOCOLS...',
    'NEURAL LINK: ENCRYPTED DOWNLINK ACQUIRED',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [assetCounter, setAssetCounter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPerfMode, setLowPerfMode] = useState(false);

  // --- Password Locked Vault States ---
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // --- Audio Synthesis Engine ---
  const playUiSound = useCallback((type) => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else if (type === 'impact') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(25, audioCtx.currentTime + 0.95);
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.95);
        
        osc.disconnect(gain);
        osc.connect(filter);
        filter.connect(gain);
        
        gain.gain.setValueAtTime(0.28, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.95);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.95);
      } else if (type === 'boot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2200, audioCtx.currentTime + 1.6);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.6);
      } else if (type === 'denied') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.setValueAtTime(125, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch (err) {
      console.warn('Audio synthesis support error:', err);
    }
  }, [isMuted]);

  // --- Stable Hover Properties ---
  const hoverProps = useMemo(() => ({
    onMouseEnter: () => {
      setIsHoveringClickable(true);
      playUiSound('hover');
    },
    onMouseLeave: () => {
      setIsHoveringClickable(false);
    }
  }), [playUiSound]);

  // --- Password Locked Vault Handlers ---
  const handlePasscodeSubmit = useCallback((codeToCheck) => {
    if (vaultUnlocked || passcodeError || !codeToCheck) return;
    if (codeToCheck === '123456') {
      playUiSound('impact');
      setVaultUnlocked(true);
      setPasscodeError(false);
      setTerminalLogs(prev => [
        ...prev,
        'guest@deathvault:~$ unlock-vault --key=######',
        'STATUS: AUTHORIZED // LEVEL 5 DECRYPTION KEY SYNCED.',
        'DECRYPTING PROJECT ASSET ARCHIVES...'
      ]);
    } else {
      playUiSound('denied');
      setPasscodeError(true);
      setTerminalLogs(prev => [
        ...prev,
        'guest@deathvault:~$ unlock-vault --key=######',
        'ERR: SECURITY LOCKOUT // PASSCODE INCORRECT // ACCESS DENIED.'
      ]);
      setTimeout(() => {
        setEnteredPasscode('');
        setPasscodeError(false);
      }, 1200);
    }
  }, [vaultUnlocked, passcodeError, playUiSound]);

  // --- Real-time Adaptive FPS Monitoring Manager ---
  useEffect(() => {
    if (loading) return;
    
    let lastTime = performance.now();
    let frameCount = 0;
    let lowFpsCount = 0;
    let animationFrameId;

    const checkFps = (time) => {
      frameCount++;
      const delta = time - lastTime;
      
      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        frameCount = 0;
        lastTime = time;

        if (fps < 45) {
          lowFpsCount++;
          if (lowFpsCount >= 3) {
            setLowPerfMode(true);
          }
        } else {
          lowFpsCount = 0;
        }
      }
      animationFrameId = requestAnimationFrame(checkFps);
    };

    animationFrameId = requestAnimationFrame(checkFps);
    return () => cancelAnimationFrame(animationFrameId);
  }, [loading]);

  useEffect(() => {
    if (lowPerfMode) {
      document.documentElement.classList.add('low-perf');
      console.warn('System running below 45 FPS: Activated Low Performance Mode.');
    } else {
      document.documentElement.classList.remove('low-perf');
    }
  }, [lowPerfMode]);

  // Keyboard support for security passcode matrix
  useEffect(() => {
    if (vaultUnlocked || loading) return;
    
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      const key = e.key;
      if (/^[0-9]$/.test(key)) {
        if (enteredPasscode.length < 6 && !passcodeError) {
          playUiSound('hover');
          const nextCode = enteredPasscode + key;
          setEnteredPasscode(nextCode);
          if (nextCode.length === 6) {
            handlePasscodeSubmit(nextCode);
          }
        }
      } else if (key === 'Backspace') {
        playUiSound('click');
        setEnteredPasscode(prev => prev.slice(0, -1));
      } else if (key === 'Enter') {
        playUiSound('click');
        handlePasscodeSubmit(enteredPasscode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enteredPasscode, vaultUnlocked, passcodeError, loading, handlePasscodeSubmit, playUiSound]);

  // --- Refs ---
  const canvasRef = useRef(null);
  const musicRef = useRef(null);
  const heroRef = useRef(null);
  const terminalRef = useRef(null);

  // --- Boot Text Sequence ---
  const bootLogs = [
    'SCANNING NEURAL INTERFACE...',
    'INJECTING AGGRESSIVE REACTION MATRIX...',
    'CONNECTING TO DEATHVAULT SECURE VAULT...',
    'MAPPING 3D SYSTEM GRID...',
    'RENDERING SAMURAI GRAPHICS LAYER...',
    'SYNCHRONIZING AUDIO BLADES...',
    'ACCESS GRANTED. ENCRYPTED DOWNLINK READY.'
  ];

  // --- Project Data (Retained from original site) ---
  const projects = useMemo(() => [
    { id: 'DV-001', tag: 'Core', title: 'PORTFOLIO', desc: 'Showcase Platform', engine: 'HTML/CSS/JS', type: 'INTERACTIVE', status: 'Online', link: 'https://portfolio-azx.netlify.app/' },
    { id: 'DV-002', tag: 'Social', title: 'LINKEDIN', desc: 'Professional Hub', engine: 'TACTICAL LINK', type: 'NETWORK', status: 'Online', link: 'https://www.linkedin.com/in/bhupender-deathgod-b18758279/' },
    { id: 'DV-003', tag: 'Code', title: 'GITHUB', desc: 'Repositories', engine: 'SOURCE MATRIX', type: 'DEVELOPMENT', status: 'Online', link: 'https://github.com/DEATHGOD89' },
    { id: 'DV-004', tag: 'Local', title: 'RESUME ANALYZER', desc: 'Local Processing Engine', engine: 'REACT/NLP', type: 'LOGIC ENGINE', status: 'Online', link: 'https://resumesuit.netlify.app/' },
    { id: 'DV-005', tag: 'Web', title: 'BOLT BROWSER', desc: 'Speed Browser', engine: 'V8 OPT', type: 'NAVIGATION', status: 'Online', link: 'https://boltbrowser01.netlify.app/' },
    { id: 'DV-006', tag: 'Data', title: 'INFOHUB', desc: 'Central Data Node', engine: 'NODE/SQL', type: 'DATABASE', status: 'Online', link: 'https://infohub-powerd-boltnew.netlify.app/' },
    { id: 'DV-007', tag: 'App', title: 'REWARDS CHALLENGE', desc: 'Finance Challenge System', engine: 'FINTECH', type: 'TRIAL MODULE', status: 'Online', link: 'https://makemonyxchallange.netlify.app/' }
  ], []);

  // --- Device Detection ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Boot Loading Progress Loop ---
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 180);
    return () => clearInterval(interval);
  }, [loading]);

  // --- Boot Loading Side Effects ---
  useEffect(() => {
    if (!loading) return;

    if (loadingProgress >= 100) {
      let shakeTimeout;
      const exitTimeout = setTimeout(() => {
        setLoading(false);
        shakeTimeout = setTimeout(() => {
          playUiSound('impact');
          // Shake only the isolated Hero section to eliminate full-page layout thrashing!
          gsap.fromTo('#home', 
            { x: -12, y: -12, rotation: -0.7 }, 
            { x: 0, y: 0, rotation: 0, ease: "elastic.out(1.2, 0.38)", duration: 1.35 }
          );
        }, 850);
      }, 600);
      return () => {
        clearTimeout(exitTimeout);
        if (shakeTimeout) clearTimeout(shakeTimeout);
      };
    } else {
      const logIndex = Math.floor((loadingProgress / 100) * bootLogs.length);
      setBootTextIndex(Math.min(logIndex, bootLogs.length - 1));
    }
  }, [loadingProgress, loading]);

  // --- Background Ambient Audio Control ---
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = volume;
      if (!isMuted) {
        musicRef.current.play().catch(() => {});
      } else {
        musicRef.current.pause();
      }
    }
  }, [isMuted, volume]);

  // --- High-Performance Scroll Spy using IntersectionObserver (Zero Layout Thrashing!) ---
  useEffect(() => {
    const sections = ['home', 'mastery', 'path', 'vault-deck', 'nexus'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Sweet spot of the viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // --- High-Performance Viewport Observer for Hero Section (Zero Scroll Listeners!) ---
  useEffect(() => {
    const homeEl = document.getElementById('home');
    if (!homeEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          homeEl.classList.remove('scrolled-past-hero');
        } else {
          homeEl.classList.add('scrolled-past-hero');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(homeEl);
    return () => observer.disconnect();
  }, []);

  // --- Dynamic Count-up Triggered on Successful Password Decryption ---
  useEffect(() => {
    if (vaultUnlocked) {
      let count = 0;
      const target = projects.length;
      setAssetCounter(0);
      const interval = setInterval(() => {
        count += 1;
        setAssetCounter(count);
        if (count >= target) {
          clearInterval(interval);
        }
      }, 120);
      return () => clearInterval(interval);
    }
  }, [vaultUnlocked, projects]);

  // --- High-Performance Lag-Free Parallax & Cursor CSS Variables Matrix ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const x = (clientX - width / 2) / (width / 2);
      const y = (clientY - height / 2) / (height / 2);
      
      document.documentElement.style.setProperty('--mx', x);
      document.documentElement.style.setProperty('--my', y);
      document.documentElement.style.setProperty('--cx', clientX);
      document.documentElement.style.setProperty('--cy', clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Particle Engine (Canvas Sparks & Ash) ---
  useEffect(() => {
    if (loading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class SparkParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 2.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 1.6;
        this.speedY = -(Math.random() * 2.8 + 1.2);
        this.life = Math.random() * 160 + 40;
        this.maxLife = this.life;
        this.color = Math.random() > 0.28 ? '#ff1a1a' : '#ffffff';
        this.alpha = Math.random() * 0.8 + 0.2;
        this.wiggle = Math.random() * 0.04;
        this.wiggleSpeed = Math.random() * 0.02;
      }
      update(speedBoost = 0) {
        this.y += (this.speedY - speedBoost);
        this.x += this.speedX + Math.sin(this.life * this.wiggleSpeed) * this.wiggle;
        this.life--;
        this.alpha = this.life / this.maxLife;
        if (this.life <= 0 || this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Skip glow aura drawing in low performance mode to unlock absolute GPU speed
        if (!lowPerfMode) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2.3, 0, Math.PI * 2);
          ctx.globalAlpha = this.alpha * 0.28;
          ctx.fill();
        }
        
        // Intense solid spark core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particleCount = isMobile ? 15 : (lowPerfMode ? 20 : 80);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new SparkParticle());
    }

    let lastScrollTop = window.scrollY;
    let scrollVelocity = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // NATIVE FRAME-BY-FRAME SCROLL VELOCITY MATHEMATICS
      // Bypasses React updates and DOM listeners, keeping scrolling liquid smooth at 60/120fps!
      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScrollTop);
      lastScrollTop = currentScroll;
      scrollVelocity = Math.min(scrollVelocity + diff * 0.08, 30);
      scrollVelocity *= 0.94; // Decay velocity boost smoothly

      const activeSpeedBoost = Math.min(scrollVelocity, 18);

      particles.forEach(p => {
        p.update(activeSpeedBoost);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loading, isMobile, lowPerfMode]);

  // --- Terminal Commands ---
  const handleTerminalSubmit = useCallback((e) => {
    e.preventDefault();
    const command = terminalInput.toLowerCase().trim();
    if (!command) return;
    let output = '';
    playUiSound('click');

    if (command.startsWith('unlock-vault')) {
      const match = command.match(/--key=(\d+)/);
      const key = match ? match[1] : '';
      if (key === '123456') {
        playUiSound('impact');
        setVaultUnlocked(true);
        output = 'STATUS: AUTHORIZED // LEVEL 5 DECRYPTION KEY SYNCED.\nDECRYPTING PROJECT ASSET ARCHIVES...';
      } else {
        playUiSound('denied');
        output = 'ERR: SECURITY LOCKOUT // PASSCODE INCORRECT // ACCESS DENIED.';
      }
    } else {
      switch (command) {
        case 'help':
          output = 'AVAILABLE CHANNELS:\n > ABOUT    - System parameters of DeathVault Creator\n > VAULT    - Scroll to the Locked Project Vault\n > CLEAR    - Wipe terminal logs buffer\n > MUSIC    - Toggle background ambiance state\n > UNLOCK-VAULT --key=[code] - Unlock project archives';
          break;
        case 'about':
          output = 'CREATOR FILE: DEATHVAULT CORE\n > CLASS: FULL STACK CREATOR // 3D SYSTEMS\n > EXPERIENCE: 4+ YEARS ACTIVE DEPLOYMENT\n > OBJECTIVE: BENDING DIGITAL LIMITS AT 60FPS';
          break;
        case 'vault':
        case 'projects':
          output = 'REDRAWING VAULT DECK... SECURING PASSCODE UPLINK...';
          document.getElementById('vault-deck')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'clear':
          setTerminalLogs([]);
          setTerminalInput('');
          return;
        case 'music':
          setIsMuted(!isMuted);
          output = `BACKGROUND AUDIO SET TO: ${isMuted ? 'ACTIVE (ON)' : 'MUTED (OFF)'}`;
          break;
        default:
          playUiSound('denied');
          output = `ERR: COMMAND '${command.toUpperCase()}' UNRECOGNIZED. TYPE 'HELP' FOR SYSTEM DECK OPTIONS.`;
      }
    }

    setTerminalLogs(prev => [
      ...prev,
      `guest@deathvault:~$ ${terminalInput}`,
      ...output.split('\n')
    ]);
    setTerminalInput('');

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 50);
  }, [terminalInput, isMuted, playUiSound]);

  const formattedTime = useMemo(() => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }, [terminalLogs]);

  // --- Organic Custom White Paint Splatter backdrop component ---
  const PaintSplatterCircle = useCallback(({ children, url }) => (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-11 h-11 flex items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-110"
      {...hoverProps}
      onClick={() => playUiSound('click')}
    >
      {/* SVG dry-brush organic background */}
      <svg className="absolute inset-0 w-full h-full text-white fill-current filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] group-hover:text-cyber-red transition-colors duration-300" viewBox="0 0 100 100">
        <path d="M50,8 C26,12 11,28 13,50 C15,72 29,88 50,86 C71,84 88,71 86,50 C84,29 74,4 50,8 Z M22,33 C23,31 26,32 27,34 C28,36 27,39 25,40 C23,41 20,40 19,38 C18,36 20,34 22,33 Z M82,65 C80,67 77,66 76,64 C75,62 76,59 78,58 C80,57 83,58 84,60 C85,62 84,64 82,65 Z" className="opacity-95" />
        <path d="M48,5 C43,12 45,19 41,24 C38,27 32,29 30,33 C28,37 32,41 31,45 C30,49 26,51 28,55 C30,59 36,57 39,61 C42,65 40,72 45,75 C50,78 53,73 58,75 C63,77 66,82 70,80 C74,78 72,71 76,68 C80,65 86,64 87,59 C88,54 82,51 83,46 C84,41 89,38 87,33 C85,28 79,28 77,23 C75,18 78,11 73,8 C68,5 65,10 60,8 C55,6 53,1 48,5 Z" />
      </svg>
      {/* Icon overlay in black (mockup design style) */}
      <div className="relative z-10 text-[#020205] group-hover:text-white transition-colors duration-300">
        {children}
      </div>
    </a>
  ), [hoverProps, playUiSound]);

  return (
    <div className="relative min-h-screen text-white select-none bg-[#020205] overflow-x-hidden font-display">
      
      {/* Dynamic Sound backing */}
      <audio id="bgMusic" ref={musicRef} loop>
        <source src="/MUSIC.mp3" type="audio/mpeg" />
      </audio>

      {/* Trailing Custom Cursor (Rendered lag-free in GPU space!) */}
      {!isMobile && (
        <>
          <div className="custom-cursor-dot" />
          <div className={`custom-cursor-glow ${isHoveringClickable ? 'w-[60px] h-[60px] border-cyber-red bg-cyber-red/10' : 'w-[40px] h-[40px] border-cyber-red/30 bg-cyber-red/2'}`} />
        </>
      )}

      {/* Ambient Pulsing Background Glow (GPU accelerated and composited) */}
      {!loading && (
        <div 
          className="fixed inset-0 z-10 pointer-events-none animate-pulse-glow-gpu"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 26, 26, 0.14) 0%, rgba(2, 2, 5, 0) 72%)',
          }}
        />
      )}

      {/* Grain texture overlay (Reduced opacity to 8% to maximize panel brightness!) */}
      <div className="fixed inset-0 z-50 bg-grain pointer-events-none" style={{ opacity: 0.08 }} />

      {/* Vignette framing (Soften gradient shadow to keep center fully illuminated) */}
      <div className="fixed inset-0 z-40 vignette pointer-events-none" style={{ opacity: 0.45 }} />

      {/* Background Interactive canvas particles */}
      {!loading && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 z-20 pointer-events-none"
        />
      )}

      {/* --- PREMIUM INTRO LOADING SCREEN --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)', scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010103] bg-grain"
          >
            <div className="absolute w-[400px] h-[400px] bg-cyber-red/5 rounded-full filter blur-[80px] animate-pulse" />

            {/* Glowing Samurai helmet logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative mb-8 text-cyber-red"
            >
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M50 20C38 20 32 30 32 42C32 45 33 48 34 51C30 51 28 55 28 60C28 65 32 68 36 68H64C68 68 72 65 72 60C72 55 70 51 66 51C67 48 68 45 68 42C68 30 62 20 50 20Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" />
                <rect x="36" y="44" width="28" height="8" rx="2" fill="#ff1a1a" className="animate-pulse" />
              </svg>
              <div className="absolute inset-[-10px] border border-cyber-red/20 rounded-full animate-spin [animation-duration:15s]" />
            </motion.div>

            {/* Simulated Decryption Terminal */}
            <div className="w-[300px] md:w-[500px] text-center font-gaming text-[10px] md:text-xs text-[#808090]">
              <div className="mb-2 uppercase tracking-[2px] text-cyber-red font-bold text-glow-red animate-pulse">
                DECRYPTING TACTICAL NEXUS // SYSTEM BOOT
              </div>
              <div className="h-6 overflow-hidden flex items-center justify-center font-semibold">
                <span className="text-[#a0a0b5]">{bootLogs[bootTextIndex]}</span>
              </div>
              
              <div className="w-full h-[3px] bg-[#101018] rounded-full overflow-hidden mt-4 relative border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyber-darkRed to-cyber-red"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <div className="flex justify-between mt-2 text-[9px] uppercase tracking-wider font-semibold font-gaming text-cyber-red/70">
                <span>SECTOR: DEATHVAULT</span>
                <span>{loadingProgress}% COMPLETE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar Panel */}
      <Navbar 
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        playUiSound={playUiSound}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        volume={volume}
        setVolume={setVolume}
        hoverProps={hoverProps}
      />

      {/* --- HERO SECTION --- */}
      <section 
        id="home"
        ref={heroRef}
        className="relative h-screen min-h-[600px] md:min-h-0 flex flex-col justify-between pt-20 pb-6 z-10 px-6 md:px-16 overflow-hidden"
      >
        {/* Layer 1: Background Board (Empty of Samurai) */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <img 
            src="/hero_bg_empty_clean.png" 
            alt="DEATHVAULT Arena Backdrop" 
            className="w-full h-full object-cover filter brightness-[1.18] contrast-[1.06]"
          />
          {/* Dark mask blending core cover into the dark panels */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020205] to-transparent z-10" />
        </div>

        {/* Layer 2: Center Canvas (Holds the transparent samurai and swirling wisps) */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center pointer-events-none z-10">
          
          {/* Center Samurai Frame */}
          <div className="relative w-[340px] sm:w-[540px] md:w-[780px] h-[340px] sm:h-[440px] md:h-[490px] flex items-center justify-center">
            {/* Ultra-professional AAA Game Menu Breathing Container */}
            <div className="w-full h-full animate-samurai-breathe flex items-center justify-center relative">
              
              {/* Backlight reflection aura */}
              <div className="absolute inset-0 bg-[#ff1a1a]/5 opacity-25 rounded-full blur-3xl z-0" />
              
              {/* Cyber Samurai cut out with zero white fringing */}
              <img 
                src="/cyber_samurai_transparent.png" 
                alt="DEATHVAULT Cyber Samurai"
                className="w-full h-full object-contain scale-[1.66] filter drop-shadow-[0_15px_45px_rgba(255,26,26,0.38)] brightness-[1.25] contrast-[1.10] relative z-10"
              />

              {/* Sword neon metallic glow reflection overlays */}
              <div className="absolute left-[49.6%] top-[23%] bottom-[14%] w-[2.5px] bg-[#ffffff] opacity-[0.9] glow-red blur-[1.5px] z-20 overflow-hidden rounded-full">
                <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-cyber-red to-transparent animate-sword-shine" />
              </div>

              {/* --- UNIQUE & NOTICEABLE SWIRLING GLOWING ENERGY WISPS --- */}
              
              {/* Left Energy Wisp */}
              <div className="absolute inset-0 z-30 pointer-events-none animate-wisp-flow-1">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 12,65 C 5,42 16,18 42,8 C 28,16 20,29 18,42" 
                    stroke="url(#wispGradLeft)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    className="opacity-95 filter drop-shadow-[0_0_12px_rgba(255,255,255,1)]" 
                  />
                  <defs>
                    <linearGradient id="wispGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,26,26,0.3)" />
                      <stop offset="65%" stopColor="rgba(255,255,255,1)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Right Energy Wisp */}
              <div className="absolute inset-0 z-30 pointer-events-none animate-wisp-flow-2">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 88,48 C 72,25 50,16 32,30 C 48,24 64,34 76,46" 
                    stroke="url(#wispGradRight)" 
                    strokeWidth="2.2" 
                    strokeLinecap="round"
                    className="opacity-90 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" 
                  />
                  <defs>
                    <linearGradient id="wispGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                      <stop offset="45%" stopColor="rgba(255,255,255,1)" />
                      <stop offset="100%" stopColor="rgba(255,26,26,0.2)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-30 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
          
          {/* Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex items-center gap-12 md:gap-16 font-gaming text-left"
          >
            <div>
              <div className="text-3xl md:text-[40px] font-black text-white tracking-tighter leading-none hover:text-cyber-red transition-colors duration-300">
                250+
              </div>
              <div className="text-[9px] tracking-[2px] uppercase text-[#7a7a92] mt-1 font-bold">
                Partners Worldwide
              </div>
            </div>
            <div className="w-[1.5px] h-9 bg-white/10" />
            <div>
              <div className="text-3xl md:text-[40px] font-black text-white tracking-tighter leading-none hover:text-cyber-red transition-colors duration-300">
                20+
              </div>
              <div className="text-[9px] tracking-[2px] uppercase text-[#7a7a92] mt-1 font-bold">
                Team Members
              </div>
            </div>
          </motion.div>

          {/* Center Downward Descent */}
          <div className="hidden lg:flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-30 hover:opacity-100 transition-opacity duration-300" onClick={() => document.getElementById('mastery')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="font-gaming text-[8px] tracking-[4px] uppercase">ACTIVATE DESCENT</span>
            <div className="w-[1.5px] h-6 bg-cyber-red rounded-full" />
          </div>

          {/* Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex items-center gap-5"
          >
            <PaintSplatterCircle url="https://portfolio-azx.netlify.app/">
              <svg className="w-[13px] h-[13px] fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </PaintSplatterCircle>

            <PaintSplatterCircle url="https://github.com/DEATHGOD89">
              <svg className="w-[13px] h-[13px] fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.626-.246-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
              </svg>
            </PaintSplatterCircle>

            <PaintSplatterCircle url="https://www.linkedin.com/in/bhupender-deathgod-b18758279/">
              <svg className="w-[13px] h-[13px] fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.815 0-8.73-3.896-8.73-8.73s3.915-8.73 8.73-8.73c2.25 0 4.305.81 5.925 2.16l3.165-3.165C18.42 1.485 15.48.6 12.24.6 5.865.6.6 5.865.6 12.24s5.265 11.64 11.64 11.64c6.645 0 11.04-4.665 11.04-11.235 0-.765-.075-1.5-.225-2.16h-10.815z" />
              </svg>
            </PaintSplatterCircle>
          </motion.div>
        </div>
      </section>

      {/* Mastery Section (Creative Mastery) */}
      <Mastery hoverProps={hoverProps} />

      {/* Path Section (About The Creator) */}
      <Path hoverProps={hoverProps} />

      {/* Vault Deck Section (Portfolio) */}
      <VaultDeck 
        vaultUnlocked={vaultUnlocked}
        assetCounter={assetCounter}
        enteredPasscode={enteredPasscode}
        passcodeError={passcodeError}
        setEnteredPasscode={setEnteredPasscode}
        handlePasscodeSubmit={handlePasscodeSubmit}
        playUiSound={playUiSound}
        hoverProps={hoverProps}
        projects={projects}
      />

      {/* Nexus Section (Terminal simulator & form) */}
      <Nexus 
        formattedTime={formattedTime}
        terminalLogs={terminalLogs}
        terminalInput={terminalInput}
        setTerminalInput={setTerminalInput}
        handleTerminalSubmit={handleTerminalSubmit}
        terminalRef={terminalRef}
        hoverProps={hoverProps}
        playUiSound={playUiSound}
      />

      {/* Footer Section */}
      <Footer playUiSound={playUiSound} hoverProps={hoverProps} />

    </div>
  );
}

export default App;
