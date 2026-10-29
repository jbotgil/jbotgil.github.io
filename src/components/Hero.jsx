import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Send, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Typewriter from './Typewriter';

const Hero = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="top" className="relative overflow-hidden px-6 md:px-8 pt-8 md:pt-12 lg:pt-14 pb-16 md:pb-24 lg:pb-32 min-h-screen">
            {/* Resplandor suave editorial */}
            <div className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full bg-brand-violet/12 blur-[130px]" />
            <div className="pointer-events-none absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-brand-cyan/8 blur-[120px]" />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                {/* Texto */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <span className="kicker mb-6 inline-block">{t('hero.greeting')}</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white text-balance mb-5" style={{ letterSpacing: '-0.035em' }}>
                        {data.name}
                    </h1>
                    <div className="text-base md:text-lg lg:text-2xl font-mono text-slate-500 dark:text-slate-400 mb-6 min-h-[32px]">
                        <span className="text-brand-violet">&gt;</span>{' '}
                        <Typewriter words={[t('hero.role1'), t('hero.role2')]} />
                    </div>
                    <p className="max-w-lg text-base md:text-lg leading-relaxed text-slate-500 dark:text-slate-400 mb-9">
                        {t('about.description')}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <a href={`mailto:${data.email}`} className="btn-primary">
                            <Send size={17} />
                            {t('hero.contactMe')}
                        </a>
                        <a href="#projects" className="btn-ghost">
                            {t('projects.viewProject')}
                            <ArrowUpRight size={17} />
                        </a>
                        <div className="flex items-center gap-1.5 ml-1">
                            <a href={data.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                                className="p-2.5 rounded-full text-slate-500 hover:text-brand-violet hover:bg-brand-violet/10 transition-all">
                                <Github size={18} />
                            </a>
                            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                className="p-2.5 rounded-full text-slate-500 hover:text-brand-violet hover:bg-brand-violet/10 transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href={`mailto:${data.email}`} aria-label="Correo"
                                className="p-2.5 rounded-full text-slate-500 hover:text-brand-violet hover:bg-brand-violet/10 transition-all">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="chip"><MapPin size={12} /> {data.location}</span>
                        <span className="chip">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            {t('about.hl_available_value')}
                        </span>
                    </div>
                </motion.div>

                {/* Foto circular */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                    className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] text-center"
                >
                    <div className="pointer-events-none absolute -inset-10 rounded-full bg-brand-violet/12 blur-3xl" />

                    {/* Foto circular */}
                    <div className="rounded-full shadow-card-lg overflow-hidden relative">
                        <img src="/assets/images/profile.png" alt={data.name} className="aspect-square w-full rounded-full object-cover" />
                    </div>

                    {/* Badge flotante */}
                    <div className="absolute right-1 top-6 rounded-full px-3 py-1.5 text-[11px] font-mono font-bold text-white shadow-card"
                        style={{ background: 'linear-gradient(135deg, #6d5cf6, #5b5bd6)' }}>
                        AI · Big Data
                    </div>

                    {/* Nombre y rol */}
                    <div className="mt-6">
                        <p className="text-base font-bold text-slate-900 dark:text-white">{data.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{t('hero.role1')}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;