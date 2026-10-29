import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Star, X, Folder } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project, index, onClick, t }) => {
    const tagsRaw = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
    const tags = Array.isArray(tagsRaw) ? tagsRaw : [];

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            onClick={onClick}
            className={`group relative rounded-3xl overflow-hidden glass cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-glass-lg ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
        >
            {project.featured && (
                <div className="absolute inset-0 rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(34,211,238,0.25))', filter: 'blur(24px)' }} />
            )}

            <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                    src={project.image}
                    alt={t(project.title)}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                {project.featured && (
                    <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                        <Star size={11} className="fill-current" /> {t('projects.featured_tag')}
                    </div>
                )}
            </div>

            <div className="relative p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-brand-violet bg-brand-violet/10 border border-brand-violet/20 px-2 py-0.5 rounded-md">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 4 && (
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-500/10 px-2 py-0.5 rounded-md">
                            +{tags.length - 4}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                    <Folder size={17} className="mt-0.5 shrink-0 text-brand-violet" />
                    {t(project.title)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {t(project.description)}
                </p>

                <div className="pt-4 border-t border-slate-900/10 dark:border-white/10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 group-hover:text-brand-violet transition-colors">
                    {t('projects.viewProject')}
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </div>
        </motion.article>
    );
};

const ProjectModal = ({ project, onClose, t }) => {
    const tagsRaw = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
    const tags = Array.isArray(tagsRaw) ? tagsRaw : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                className="relative w-full max-w-5xl rounded-[2rem] glass-strong overflow-hidden shadow-glass-lg flex flex-col md:flex-row max-h-[90vh]"
            >
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-violet/25 blur-[90px]" />

                <button
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="absolute top-4 right-4 z-30 p-2 rounded-full glass text-slate-600 dark:text-slate-300 hover:text-brand-violet transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-950/40 dark:bg-slate-950/60 flex items-center justify-center relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={t(project.title)}
                        className="max-w-full max-h-full object-contain p-6"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 overflow-y-auto relative">
                    <div className="flex flex-wrap gap-2 mb-5">
                        {tags.map((tag) => (
                            <span key={tag} className="text-xs font-mono text-brand-violet bg-brand-violet/10 border border-brand-violet/20 px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 text-gradient">
                        {t(project.title)}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-base">
                        {t(project.description)}
                    </p>

                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                        {t('projects.links')}
                    </h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        <Github size={18} />
                        {t('projects.viewCode')}
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

const Projects = ({ data, onModalChange }) => {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState(null);

    React.useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : '';
        onModalChange && onModalChange(!!selectedProject);
    }, [selectedProject, onModalChange]);

    return (
        <section id="projects" className="relative px-6 py-24 lg:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="pill mb-5">{t('projects.title')}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                        <span className="text-gradient">{t('projects.subtitle')}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('projects.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                            t={t}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;