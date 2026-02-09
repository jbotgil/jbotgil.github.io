import React from 'react';
import { motion } from 'framer-motion';

// Mapping icon names to crude conceptual representations or relying on text if no icons available
// Ideally we would import specific icons, but text + progress bars is clean and reliable.

const Skills = ({ data }) => {
    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Habilidades <span className="text-accent">&</span> Tecnologías</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {data.skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="bg-slate-800/50 p-4 rounded-lg"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-slate-200">{skill.name}</span>
                                <span className="text-accent">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="bg-gradient-to-r from-accent to-blue-600 h-2.5 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
