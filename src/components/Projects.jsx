import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const tagList = (project, t) => {
    const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
    return Array.isArray(tags) ? tags : [];
};

const Projects = ({ data }) => {
    const { t } = useTranslation();
    const featured = data.projects.find((p) => p.featured) || data.projects[0];
    const rest = data.projects.filter((p) => p !== featured);

    return (
        <section id="projects" className="px-6 md:px-8 py-20 md:py-28 bg-white/50 dark:bg-white/[0.015]">
            <div className="mx-auto max-w-6xl">
                <div className="rule">
                    <span className="kicker">02 · {t('nav.projects')}</span>
                    <div className="rule-line" />
                    <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-violet transition-colors">
                        GitHub <ArrowUpRight size={15} />
                    </a>
                </div>

                {/* Proyecto destacado */}
                <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="card card-hover overflow-hidden grid md:grid-cols-2 mb-10 lg:mb-14"
                >
                    <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        <img src={featured.image} alt={t(featured.title)} loading="lazy" className="h-full w-full object-cover" />
                        <span className="absolute left-4 top-4 chip chip-brand">{t('projects.featured_tag')}</span>
                    </div>
                    <div className="p-7 md:p-10 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tagList(featured, t).map((tag) => (
                                <span key={tag} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md text-brand-violet bg-brand-violet/10 border border-brand-violet/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                            {t(featured.title)}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                            {t(featured.description)}
                        </p>
                        <a href={featured.link} target="_blank" rel="noopener noreferrer" className="btn-primary w-fit">
                            <Github size={17} />
                            {t('projects.viewCode')}
                        </a>
                    </div>
                </motion.article>

                {/* Resto de proyectos */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((project, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="card card-hover overflow-hidden group"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img src={project.image} alt={t(project.title)} loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {tagList(project, t).slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-violet transition-colors">
                                    {t(project.title)}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">
                                    {t(project.description)}
                                </p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet hover:text-brand-indigo transition-colors">
                                    {t('projects.viewCode')} <ArrowUpRight size={15} />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;