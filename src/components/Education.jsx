import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';

const Education = ({ data }) => {
    return (
        <section id="education" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Formación <span className="text-accent">&</span> Cursos</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Education Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
                            <div className="p-3 bg-accent/10 rounded-lg text-accent">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Educación</h3>
                        </div>

                        <div className="space-y-8">
                            {data.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-6 border-l-2 border-slate-700"
                                >
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-accent" />
                                    <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                                    <p className="text-accent text-sm mb-2">{edu.school}</p>
                                    <span className="text-slate-500 text-xs bg-slate-800 px-2 py-1 rounded inline-block">
                                        {edu.period}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
                            <div className="p-3 bg-accent/10 rounded-lg text-accent">
                                <Award size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Certificaciones</h3>
                        </div>

                        <div className="space-y-6">
                            {data.certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-accent/50 transition-colors group"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-accent transition-colors">
                                                {cert.name}
                                            </h4>
                                            <p className="text-slate-400 text-sm mt-1">{cert.issuer}</p>
                                            <p className="text-slate-500 text-xs mt-2">{cert.date}</p>
                                        </div>
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-500 hover:text-accent transition-colors"
                                            title="Ver Credencial"
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
