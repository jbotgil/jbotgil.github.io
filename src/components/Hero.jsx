import React, { useMemo, useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Send, MousePointer2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Typewriter from './Typewriter';

const Experience3D = lazy(() => import('./Experience3D'));

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
        return false;
    }
}

/* Fallback mientras carga el 3D (o si no hay WebGL): aurora calmada */
function AuroraFallback() {
    return (
        <div className="absolute inset-0 bg-[#f4f6fb] dark:bg-[#07060f]">
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-brand-violet/25 dark:bg-brand-violet/20 blur-[130px]"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], y: [0, -50, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full bg-brand-cyan/20 dark:bg-brand-cyan/15 blur-[140px]"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-40 left-1/3 h-[480px] w-[480px] rounded-full bg-brand-indigo/20 dark:bg-brand-indigo/20 blur-[130px]"
            />
            <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
    );
}

const Hero = ({ data }) => {
    const { t } = useTranslation();
    const sceneRef = useRef(null);
    const [visible, setVisible] = useState(true);
    const webglOk = useMemo(() => supportsWebGL(), []);

    useEffect(() => {
        const el = sceneRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const show3D = webglOk && visible;

    return (
        <section id="top" className="relative min-h-screen flex items-stretch overflow-hidden">
            {/* Escena 3D (se desmonta al salir de pantalla para liberar GPU) */}
            <div ref={sceneRef} className="absolute inset-0">
                {show3D ? (
                    <Suspense fallback={<AuroraFallback />}>
                        <Experience3D projects={data.projects} t={t} />
                    </Suspense>
                ) : (
                    <AuroraFallback />
                )}
            </div>

            {/* Transición suave a la siguiente sección */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f4f6fb] dark:to-[#07060f] pointer-events-none" />

            {/* Overlay de contenido (no bloquea la interacción 3D salvo botones) */}
            <div className="relative flex-1 px-6 pointer-events-none">
                {/* Pista de interacción */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="pointer-events-none flex justify-center pt-20 md:pt-24"
                >
                    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md"
                        style={{ background: 'rgba(15,10,40,0.5)', border: '1px solid rgba(139,92,246,0.35)' }}>
                        <MousePointer2 size={13} className="text-brand-violet" />
                        {t('hero.hint')}
                    </span>
                </motion.div>

                {/* Contenido principal abajo-izquierda */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative z-10 flex min-h-screen flex-col justify-end pb-20 md:pb-16 mr-auto max-w-lg"
                >
                    <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-brand-sky mb-3 drop-shadow">
                        {t('hero.greeting')}
                    </h2>
                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] mb-4">
                        {data.name}
                    </h1>
                    <div className="text-lg md:text-2xl font-mono text-slate-200 mb-6 min-h-[32px] drop-shadow">
                        <span className="text-brand-sky">&gt;</span>{' '}
                        <Typewriter words={[t('hero.role1'), t('hero.role2')]} />
                    </div>
                    <p className="text-sm md:text-base text-slate-300 max-w-lg leading-relaxed mb-8">
                        {t('about.description')}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                        <a href={`mailto:${data.email}`} className="btn-primary">
                            <Send size={17} />
                            {t('hero.contactMe')}
                        </a>
                        <a href="#projects"
                            className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-2.5 text-sm bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20 transition-all duration-300">
                            {t('projects.viewProject')}
                            <ArrowDown size={16} />
                        </a>
                        <div className="flex items-center gap-2">
                            <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300">
                                <Github size={18} />
                            </a>
                            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                            <a href={`mailto:${data.email}`}
                                className="p-2.5 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;