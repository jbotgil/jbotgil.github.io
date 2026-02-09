import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Typewriter from './Typewriter';

const Hero = ({ data }) => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-secondary -z-10" />

            {/* Animated Shapes */}
            <div className="absolute inset-0 overflow-hidden -z-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, 100, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 relative inline-block group"
                >
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-all duration-500" />
                    <img
                        src="/assets/images/profile.png"
                        alt={data.name}
                        className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-slate-800 shadow-2xl mx-auto"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-lg md:text-xl text-accent font-medium mb-2">Hola, soy</h2>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        {data.name}
                    </h1>

                    {/* Typewriter Effect */}
                    <div className="text-lg md:text-xl text-slate-400 mb-6 max-w-2xl mx-auto font-mono min-h-[32px]">
                        <span className="text-accent">&gt; </span>
                        <Typewriter words={data.roles || [data.title]} />
                    </div>

                    <p className="text-base text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {data.about}
                    </p>

                    <div className="flex justify-center gap-5 mb-10">
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                            className="p-2.5 bg-slate-800/50 rounded-full hover:bg-accent/20 hover:text-accent transition-colors border border-slate-700">
                            <Github size={22} />
                        </a>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="p-2.5 bg-slate-800/50 rounded-full hover:bg-accent/20 hover:text-accent transition-colors border border-slate-700">
                            <Linkedin size={22} />
                        </a>
                        <a href={`mailto:${data.email}`}
                            className="p-2.5 bg-slate-800/50 rounded-full hover:bg-accent/20 hover:text-accent transition-colors border border-slate-700">
                            <Mail size={22} />
                        </a>
                    </div>

                    <motion.a
                        href="#projects"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex flex-col items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <span className="text-xs font-medium mb-2 uppercase tracking-wide">Ver Proyectos</span>
                        <ArrowDown size={20} />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
