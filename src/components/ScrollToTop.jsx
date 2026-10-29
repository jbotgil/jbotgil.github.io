import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 300);
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    aria-label="Volver arriba"
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-2xl glass-strong text-brand-violet hover:text-white hover:bg-gradient-to-tr hover:from-brand-violet hover:to-brand-indigo shadow-glass-lg transition-all duration-300"
                >
                    <ArrowUp size={22} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;