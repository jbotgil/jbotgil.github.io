import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme';
import GlassFold from './GlassFold';
import Typewriter from './Typewriter';

const Hero = ({ data }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const dark = theme === 'dark';
    const colors = dark
        ? { color1: '#8b5cf6', color2: '#0a0718', color3: '#c4b5fd' }
        : { color1: '#818cf8', color2: '#dde4ff', color3: '#ffffff' };

    return (
        <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Fondo WebGL glass */}
            <div className="absolute inset-0">
                <GlassFold {...colors} speed={0.5} />
            </div>
            {/* Retícula + viñeta para legibilidad */}
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/80 dark:from-black/0 dark:via-transparent dark:to-[#07060f]" />

            <div className="relative container mx-auto px-6 text-center z-10 py-28">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    {/* Monograma */}
                    <div className="mb-8 inline-grid place-items-center">
                        <div className="absolute h-20 w-20 rounded-full bg-brand-violet/40 blur-2xl animate-pulse-soft" />
                        <div className="glass-strong h-20 w-20 rounded-3xl grid place-items-center text-3xl font-extrabold text-gradient shadow-glass rotate-3">
                            {(data.name || 'J').charAt(0)}
                        </div>
                    </div>

                    <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.35em] text-brand-violet mb-5">
                        {t('hero.greeting')}
                    </h2>

                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                        {data.name}
                    </h1>

                    <div className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-mono mb-8 min-h-[36px]">
                        <span className="text-brand-violet">&gt;</span>{' '}
                        <Typewriter words={[t('hero.role1'), t('hero.role2')]} />
                    </div>

                    <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
                        {t('about.description')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a href={`mailto:${data.email}`} className="btn-primary">
                            <Send size={18} />
                            {t('hero.contactMe')}
                        </a>
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 glass text-slate-700 dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
                        >
                            {t('projects.viewProject')}
                            <ArrowDown size={18} />
                        </a>
                    </div>

                    <div className="flex justify-center gap-4">
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass hover:glow">
                            <Github size={20} />
                        </a>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass">
                            <Linkedin size={20} />
                        </a>
                        <a href={`mailto:${data.email}`}
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass">
                            <Mail size={20} />
                        </a>
                    </div>
                </motion.div>

                <motion.a
                    href="#about"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 dark:text-slate-400 hover:text-brand-violet transition-colors"
                >
                    <ArrowDown size={22} />
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;