import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Typewriter from './Typewriter';
import ProjectMarquee from './ProjectMarquee';

/* Fondo aurora (ligero, 100% CSS) */
function AuroraBackground() {
    return (
        <div className="absolute inset-0 bg-[#f2f5fb] dark:bg-[#08070f]">
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], opacity: [0.5, 0.75, 0.5] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-brand-violet/25 dark:bg-brand-violet/20 blur-[130px]"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], y: [0, -50, 0], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full bg-brand-cyan/20 dark:bg-brand-cyan/15 blur-[140px]"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-40 left-1/3 h-[480px] w-[480px] rounded-full bg-brand-indigo/20 dark:bg-brand-indigo/20 blur-[130px]"
            />
            <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
    );
}

const Hero = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
            <AuroraBackground />

            {/* Intro centrada */}
            <div className="relative container mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center py-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-3xl"
                >
                    <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.35em] text-brand-violet mb-4">
                        {t('hero.greeting')}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance mb-5">
                        {data.name}
                    </h1>
                    <div className="text-lg md:text-2xl font-mono text-slate-600 dark:text-slate-300 mb-7 min-h-[32px]">
                        <span className="text-brand-violet">&gt;</span>{' '}
                        <Typewriter words={[t('hero.role1'), t('hero.role2')]} />
                    </div>
                    <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-9 max-w-2xl mx-auto">
                        {t('about.description')}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        <a href={`mailto:${data.email}`} className="btn-primary">
                            <Send size={17} />
                            {t('hero.contactMe')}
                        </a>
                        <div className="flex items-center gap-2">
                            <a href={data.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                                className="p-2.5 glass rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet hover:-translate-y-0.5 transition-all duration-300">
                                <Github size={18} />
                            </a>
                            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                className="p-2.5 glass rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet hover:-translate-y-0.5 transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                            <a href={`mailto:${data.email}`} aria-label="Correo"
                                className="p-2.5 glass rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet hover:-translate-y-0.5 transition-all duration-300">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Marcador de proyectos a pantalla completa */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative pb-10 md:pb-14"
            >
                <ProjectMarquee projects={data.projects} />
            </motion.div>

            {/* Transición a la siguiente sección */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f2f5fb] dark:to-[#08070f] pointer-events-none" />
        </section>
    );
};

export default Hero;