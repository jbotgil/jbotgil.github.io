import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, X, Folder } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project, index, onClick, t }) => (
    <motion.div
        layoutId={`project-card-${index}`}
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className={`group relative rounded-2xl overflow-hidden glass hover:border-transparent transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-2 ${project.featured ? 'md:col-span-2' : ''}`}
    >
        {/* Glow en hover (solo featured) */}
        {project.featured && (
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.5), rgba(168,85,247,0.4), rgba(236,72,153,0.35))', filter: 'blur(14px)' }} />
        )}

        <div className="relative h-44 md:h-52 overflow-hidden shrink-0 rounded-t-2xl">
            <motion.img
                layoutId={`project-image-${index}`}
                src={project.image}
                alt={t(project.title)}
                className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
            />
            {/* Overlay de gradiente inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            {project.featured && (
                <div className="absolute top-3 right-3 z-20 rounded-full px-3 py-1 text-xs font-bold text-primary flex items-center gap-1 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #38bdf8, #a855f7)' }}>
                    <Star size={12} className="fill-current" /> {t('projects.featured_tag', 'Destacado')}
                </div>
            )}
        </div>

        <div className="p-6 flex flex-col flex-grow relative">
            {/* Icono superior */}
            <div className="absolute -top-5 right-6 p-2.5 rounded-xl glass text-brand-sky shadow-card group-hover:shadow-glow transition-shadow duration-300">
                <Folder size={18} />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {(() => {
                    const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
                    return Array.isArray(tags) ? tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-brand-sky bg-brand-sky/10 border border-brand-sky/20 px-2 py-0.5 rounded-md">
                            {tag}
                        </span>
                    )) : null;
                })()}
                {(() => {
                    const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
                    return Array.isArray(tags) && tags.length > 4 ? (
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                            +{tags.length - 4}
                        </span>
                    ) : null;
                })()}
            </div>

            <motion.h3 layoutId={`project-title-${index}`} className={`text-lg font-bold mb-2 ${project.featured ? 'text-gradient' : 'text-white group-hover:text-brand-sky'} transition-colors`}>
                {t(project.title)}
            </motion.h3>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                {t(project.description)}
            </p>

            <div className="mt-auto pt-4 border-t border-white/10">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 group-hover:text-brand-sky transition-colors">
                    <span className="uppercase tracking-wider">{t('projects.viewProject')}</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </div>
        </div>
    </motion.div>
);

const ProjectModal = ({ project, onClose, t }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
                layoutId={`project-card-${project.index}`}
                className="relative w-full max-w-5xl bg-primary/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Halo superior decorativo */}
                <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-brand-violet/20 blur-[110px] pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-white/10 text-white rounded-full border border-white/10 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-950 flex items-center justify-center">
                    <motion.img
                        layoutId={`project-image-${project.index}`}
                        src={project.image}
                        alt={t(project.title)}
                        className="max-w-full max-h-full object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto relative">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {(() => {
                            const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
                            return Array.isArray(tags) ? tags.map(tag => (
                                <span key={tag} className="text-xs font-mono text-brand-sky bg-brand-sky/10 border border-brand-sky/20 px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            )) : null;
                        })()}
                    </div>

                    <motion.h2 layoutId={`project-title-${project.index}`} className="text-2xl md:text-3xl font-bold text-white mb-4 text-gradient animate-gradient-x">
                        {t(project.title)}
                    </motion.h2>

                    <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                        {t(project.description)}
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
                                {t('projects.links', 'Enlaces')}
                            </h3>
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="btn-gradient !rounded-xl"
                                style={{ backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)' }}>
                                <Github size={20} />
                                {t('projects.viewCode', 'Ver Código')}
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Projects = ({ data, onModalChange }) => {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState(null);

    React.useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            onModalChange && onModalChange(true);
        } else {
            document.body.style.overflow = 'unset';
            onModalChange && onModalChange(false);
        }
    }, [selectedProject, onModalChange]);

    return (
        <section id="projects" className="py-24 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-brand-sky mb-4">
                        <Star size={14} /> {t('projects.title')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-gradient animate-gradient-x">{t('projects.subtitle')}</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('projects.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {data.projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject({ ...project, index })}
                            t={t}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        t={t}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;