import { useState } from 'react';
import { portfolioData } from './data/portfolio';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-primary min-h-screen text-slate-200 font-sans selection:bg-accent selection:text-primary">
            <Hero data={portfolioData} />
            <Projects data={portfolioData} onModalChange={setIsModalOpen} />
            <Experience data={portfolioData} />
            <Education data={portfolioData} />
            <Skills data={portfolioData} />
            <Footer data={portfolioData} />
            {!isModalOpen && <ScrollToTop />}
        </div>
    )
}

export default App;
