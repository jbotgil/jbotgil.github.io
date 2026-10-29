import { useState } from 'react';
import { portfolioData } from './data/portfolio';
import { ThemeProvider } from './theme';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ThemeProvider>
            <div className="min-h-screen font-sans bg-grid relative">
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-brand-violet/10 dark:bg-brand-violet/15 blur-[130px]" />
                    <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/10 blur-[140px]" />
                </div>
                <Nav />
                <main>
                    <Hero data={portfolioData} />
                    <About data={portfolioData} />
                    <Projects data={portfolioData} onModalChange={setIsModalOpen} />
                    <Experience data={portfolioData} />
                    <Education data={portfolioData} />
                    <Skills data={portfolioData} />
                </main>
                <Footer data={portfolioData} />
                {!isModalOpen && <ScrollToTop />}
            </div>
        </ThemeProvider>
    );
}

export default App;