import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project, index, onClick, t }) => (
    <motion.div
        layoutId={`project-card-${index}`}
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`group relative rounded-lg overflow-hidden bg-slate-800 border border-slate-700 hover:border-accent/50 transition-colors flex flex-col h-full cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
    >
        <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
            <motion.img
                layoutId={`project-image-${index}`}
                src={project.image}
                alt={t(project.title)} // Corregido para accesibilidad
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {project.featured && (
                <div className="absolute top-3 right-3 z-20 bg-accent text-primary font-bold px-2 py-0.5 rounded-full text-xs shadow-lg flex items-center gap-1">
                    <Star size={12} className="fill-current" /> {t('projects.featured_tag', 'Destacado')}
                </div>
            )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-2 mb-3">
                {(() => {
                    const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
                    return Array.isArray(tags) ? tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                            {tag}
                        </span>
                    )) : null;
                })()}
            </div>

            {/* CORRECCIÓN AQUÍ: t(project.title) */}
            <motion.h3 layoutId={`project-title-${index}`} className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {t(project.title)}
            </motion.h3>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                {t(project.description)}
            </p>

            <div className="mt-auto pt-3 border-t border-slate-700/50">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-white group-hover:text-accent transition-colors">
                    <span className="uppercase tracking-wider">{t('projects.viewProject')}</span>
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
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                layoutId={`project-card-${project.index}`}
                className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row max-h-[90vh]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-accent text-white hover:text-primary rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-950">
                    <motion.img
                        layoutId={`project-image-${project.index}`}
                        src={project.image}
                        alt={t(project.title)}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {(() => {
                            const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
                            return Array.isArray(tags) ? tags.map(tag => (
                                <span key={tag} className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            )) : null;
                        })()}
                    </div>

                    {/* CORRECCIÓN AQUÍ: t(project.title) */}
                    <motion.h2 layoutId={`project-title-${project.index}`} className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {t(project.title)}
                    </motion.h2>

                    <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                        {t(project.description)}
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
                                {t('projects.links_title', 'Enlaces')}
                            </h3>
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-colors">
                                <Github size={20} />
                                {t('projects.view_code', 'Ver Código Fuente')}
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
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-accent">{t('projects.title')}</span> {t('projects.subtitle')}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {t('projects.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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