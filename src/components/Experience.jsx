import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Experience = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="experience" className="py-24 relative">
            {/* Orbes decorativos */}
            <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-brand-sky/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-brand-sky mb-4">
                        <Briefcase size={14} /> {t('experience.work')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-gradient animate-gradient-x">{t('experience.title')}</span>
                    </h2>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {data.experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative pl-10 pb-12 last:pb-0"
                        >
                            {/* Línea de la timeline con gradiente */}
                            <div className="absolute left-[5px] top-2 bottom-0 w-px bg-gradient-to-b from-brand-sky via-brand-violet to-transparent" />
                            {/* Punto con glow */}
                            <div className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full bg-brand-sky shadow-[0_0_16px_rgba(56,189,248,0.9)]" />

                            <div className="glass rounded-2xl p-6 hover:border-white/20 hover:shadow-glow transition-all duration-300 group">
                                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-brand-sky transition-colors">{t(job.title)}</h3>
                                    <span className="inline-flex items-center text-sm text-brand-sky bg-brand-sky/10 border border-brand-sky/20 px-3 py-1 rounded-full">
                                        <Calendar size={14} className="mr-1" /> {t(job.period)}
                                    </span>
                                </div>
                                <h4 className="text-lg text-slate-300 mb-4 flex items-center">
                                    <Briefcase size={16} className="mr-2 text-brand-violet" /> {job.company}
                                </h4>
                                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                                    {t(job.description)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;