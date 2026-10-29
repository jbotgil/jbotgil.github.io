import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Education = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="education" className="py-24 relative">
            {/* Orbes decorativos */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-sky/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-brand-sky mb-4">
                        <GraduationCap size={14} /> {t('experience.education')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-gradient animate-gradient-x">{t('experience.subtitle')}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Education Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 rounded-xl gradient-border text-brand-sky shadow-glow">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{t('experience.education')}</h3>
                        </div>

                        <div className="space-y-8">
                            {data.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-6 border-l border-white/10 group"
                                >
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-brand-violet shadow-[0_0_12px_rgba(168,85,247,0.7)] group-hover:shadow-[0_0_18px_rgba(168,85,247,1)] transition-shadow duration-300" />
                                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-sky transition-colors">{t(edu.degree)}</h4>
                                    <p className="text-brand-sky text-sm mb-2">{t(edu.school)}</p>
                                    <span className="text-slate-400 text-xs bg-white/5 backdrop-blur px-2.5 py-1 rounded-md font-mono">
                                        {t(edu.period)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 rounded-xl gradient-border text-brand-pink shadow-glow-pink">
                                <Award size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{t('experience.certifications')}</h3>
                        </div>

                        <div className="space-y-6">
                            {data.certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl p-5 hover:border-brand-violet/40 hover:shadow-glow-violet transition-all duration-300 group"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-brand-sky transition-colors">
                                                {t(cert.name)}
                                            </h4>
                                            <p className="text-slate-400 text-sm mt-1">{t(cert.issuer)}</p>
                                            <p className="text-slate-500 text-xs mt-2">{t(cert.date)}</p>
                                        </div>
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-500 hover:text-brand-sky transition-colors"
                                            title={t('experience.viewCredential')}
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;