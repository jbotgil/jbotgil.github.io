import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Sparkles, Send, FileDown } from 'lucide-react';
import Typewriter from './Typewriter';
import { useTranslation } from 'react-i18next';

const Hero = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            {/* Orbes animados de fondo */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.6, 0.35] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-brand-sky/20 blur-[110px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], x: [0, 80, 0], opacity: [0.25, 0.5, 0.25] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-violet/20 blur-[130px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], y: [0, -60, 0], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-2/3 left-2/3 w-[360px] h-[360px] rounded-full bg-brand-pink/15 blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                {/* Avatar con anillo de gradiente giratorio */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-8 relative inline-block"
                >
                    <div
                        className="absolute -inset-1 rounded-full animate-spin-slow"
                        style={{
                            background: 'conic-gradient(from 0deg, #38bdf8, #a855f7, #ec4899, #38bdf8)',
                            filter: 'blur(6px)',
                            opacity: 0.7,
                        }}
                    />
                    <div className="absolute -inset-1 rounded-full animate-pulse-glow bg-gradient-to-tr from-brand-sky/30 via-transparent to-brand-pink/30" />
                    <img
                        src="/assets/images/profile.png"
                        alt={data.name}
                        className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-primary bg-primary"
                    />
                </motion.div>

                {/* Badge de ubicación */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mb-5"
                >
                    <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-slate-300">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                        <MapPin size={14} className="text-brand-sky" />
                        {data.location}
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-lg md:text-xl text-brand-sky font-medium mb-2 tracking-wide">{t('hero.greeting')}</h2>
                    <h1 className="text-4xl md:text-7xl font-extrabold mb-4 text-gradient animate-gradient-x">
                        {data.name}
                    </h1>

                    {/* Typewriter Effect */}
                    <div className="text-lg md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto font-mono min-h-[32px] flex items-center justify-center">
                        <span className="text-brand-violet mr-2">&gt;</span>
                        <Typewriter words={[t('hero.role1'), t('hero.role2')]} />
                        <span className="ml-2 hidden md:inline-flex items-center gap-1 text-slate-500 text-sm">
                            <Sparkles size={14} className="text-brand-pink" />
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('about.description')}
                    </p>

                    <div className="flex justify-center gap-5 mb-10">
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                            className="p-3 glass rounded-full text-slate-300 hover:text-white hover:border-brand-sky/60 hover:shadow-glow transition-all duration-300">
                            <Github size={22} />
                        </a>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="p-3 glass rounded-full text-slate-300 hover:text-white hover:border-brand-violet/60 hover:shadow-glow-violet transition-all duration-300">
                            <Linkedin size={22} />
                        </a>
                        <a href={`mailto:${data.email}`}
                            className="p-3 glass rounded-full text-slate-300 hover:text-white hover:border-brand-pink/60 hover:shadow-glow-pink transition-all duration-300">
                            <Mail size={22} />
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a href={`mailto:${data.email}`} className="btn-gradient">
                            <Send size={18} />
                            {t('hero.contactMe')}
                        </a>
                        <a href="#projects" className="inline-flex items-center gap-2 glass rounded-xl px-6 py-3 font-bold text-slate-200 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                            <FileDown size={18} className="text-brand-sky" />
                            {t('projects.viewProject')}
                        </a>
                    </div>
                </motion.div>

                <motion.a
                    href="#projects"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex flex-col items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                    <span className="text-xs font-medium mb-2 uppercase tracking-widest">{t('projects.viewProject')}</span>
                    <ArrowDown size={20} />
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;