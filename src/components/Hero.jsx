import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Typewriter from './Typewriter';

const Hero = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Fondo aurora: orbes de color desenfocados */}
            <div className="absolute inset-0 bg-[#f4f6fb] dark:bg-[#07060f]" />
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-brand-violet/25 dark:bg-brand-violet/20 blur-[130px]"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], y: [0, -50, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full bg-brand-cyan/20 dark:bg-brand-cyan/15 blur-[140px]"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-40 left-1/3 h-[480px] w-[480px] rounded-full bg-brand-indigo/20 dark:bg-brand-indigo/20 blur-[130px]"
            />

            {/* Retícula sutil + viñeta para legibilidad */}
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#07060f]" />

            <div className="relative container mx-auto px-6 text-center z-10 py-28">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    {/* Foto con anillo de gradiente */}
                    <div className="relative inline-block mb-8">
                        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-brand-violet via-brand-indigo to-brand-cyan opacity-80 blur-[2px]" />
                        <div className="absolute h-28 w-28 rounded-full bg-brand-violet/40 blur-2xl animate-pulse-soft" />
                        <img
                            src="/assets/images/profile.png"
                            alt={data.name}
                            className="relative h-28 w-28 md:h-36 md:w-36 rounded-full object-cover border-4 border-white/80 dark:border-[#0c0a1f] shadow-glass-lg"
                        />
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
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass">
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