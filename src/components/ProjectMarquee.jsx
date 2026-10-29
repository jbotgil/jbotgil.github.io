import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Star } from 'lucide-react';

const ProjectMarquee = ({ projects }) => {
    const { t } = useTranslation();
    const items = [...projects, ...projects];

    if (!projects.length) return null;

    return (
        <div
            className="relative w-full py-2 overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            }}
        >
            <div className="marquee-track gap-6 pr-6">
                {items.map((project, index) => {
                    const tags = typeof project.tags === 'string' ? t(project.tags, { returnObjects: true }) : project.tags;
                    const tagList = Array.isArray(tags) ? tags : [];
                    return (
                        <a
                            key={index}
                            href="#projects"
                            className="group relative w-[280px] md:w-[340px] shrink-0 overflow-hidden rounded-3xl glass hover:-translate-y-2 hover:shadow-glass-lg transition-all duration-300"
                        >
                            <div className="relative h-40 md:h-44 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={t(project.title)}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                                {project.featured && (
                                    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                                        <Star size={10} className="fill-current" /> {t('projects.featured_tag')}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {tagList.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md text-brand-violet bg-brand-violet/10 border border-brand-violet/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-brand-violet transition-colors">
                                        {t(project.title)}
                                    </h3>
                                    <ArrowUpRight size={16} className="shrink-0 text-slate-400 group-hover:text-brand-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectMarquee;