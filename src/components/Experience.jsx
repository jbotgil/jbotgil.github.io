import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = ({ data }) => {
    return (
        <section id="experience" className="py-20 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiencia <span className="text-accent">Laboral</span></h2>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {data.experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 pb-12 border-l border-slate-700 last:pb-0"
                        >
                            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.5)]" />

                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                                <div className="flex flex-wrap justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                                    <span className="flex items-center text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                                        <Calendar size={14} className="mr-1" /> {job.period}
                                    </span>
                                </div>
                                <h4 className="text-lg text-slate-300 mb-4 flex items-center">
                                    <Briefcase size={16} className="mr-2 text-slate-400" /> {job.company}
                                </h4>
                                <p className="text-slate-400 leading-relaxed">
                                    {job.description}
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
