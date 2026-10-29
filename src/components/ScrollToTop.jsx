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
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-full text-white shadow-card-lg transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #6d5cf6, #5b5bd6)' }}
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;