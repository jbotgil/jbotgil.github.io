import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const DURATION = 3500;

const ProjectShowcase = ({ projects }) => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const total = projects.length;

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % total), DURATION);
        return () => clearInterval(id);
    }, [total]);

    if (!total) return null;

    const project = projects[index];
    const tags = Array.isArray(t(project.tags, { returnObjects: true })) ? t(project.tags, { returnObjects: true }) : [];

    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const next = () => setIndex((i) => (i + 1) % total);

    return (
        <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 bg-white/70 dark:bg-white/5 dark:border-white/10 backdrop-blur-xl shadow-glass-lg group">
            <div className="relative aspect-[16/10] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <motion.img
                            src={project.image}
                            alt={t(project.title)}
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.06 }}
                            transition={{ duration: DURATION / 1000, ease: 'linear' }}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Título y tags */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <AnimatePresence mode="wait">
                        <motion.div key={`c-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md text-brand-sky bg-black/40 backdrop-blur border border-white/15">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white">{t(project.title)}</h3>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Flechas */}
                <button onClick={prev} aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 transition-colors">
                    <ChevronLeft size={18} />
                </button>
                <button onClick={next} aria-label="Siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 transition-colors">
                    <ChevronRight size={18} />
                </button>

                {/* Puntos + progreso */}
                <div className="absolute top-4 right-4 flex gap-1.5">
                    {projects.map((_, i) => (
                        <button key={i} onClick={() => setIndex(i)} aria-label={`Proyecto ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-brand-violet' : 'w-2 bg-white/50 hover:bg-white/80'}`} />
                    ))}
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="h-1 bg-slate-200 dark:bg-white/10">
                <motion.div
                    key={`bar-${index}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: DURATION / 1000, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan"
                />
            </div>

            <a href="#projects"
                className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white transition-colors">
                {t('projects.viewProject')}
                <ArrowUpRight size={16} />
            </a>
        </div>
    );
};

export default ProjectShowcase;