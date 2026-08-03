import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/Loader';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { CustomCursor } from '@/components/CustomCursor';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Testimonials } from '@/components/Testimonials';
import { Blog } from '@/components/Blog';
import { GitHub } from '@/components/GitHub';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { AIAssistant } from '@/components/AIAssistant';
import { CommandPalette } from '@/components/CommandPalette';
import { useLenis } from '@/hooks/useLenis';
import { profile, projects } from '@/data/content';

function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-blob animate-aurora-slow" style={{ width: 600, height: 600, top: '-10%', left: '-5%', background: '#38bdf8' }} />
      <div className="aurora-blob animate-aurora-slow" style={{ width: 500, height: 500, top: '30%', right: '-10%', background: '#a855f7', animationDelay: '4s' }} />
      <div className="aurora-blob animate-aurora-slow" style={{ width: 450, height: 450, bottom: '-5%', left: '30%', background: '#22d3ee', animationDelay: '8s' }} />
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const cmdInput = useRef<HTMLInputElement>(null);
  useLenis();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const commands = [
    { id: 'about', label: 'Go to About', hint: 'Section', action: () => scrollTo('#about') },
    { id: 'projects', label: 'Go to Work', hint: 'Section', action: () => scrollTo('#projects') },
    { id: 'experience', label: 'Go to Experience', hint: 'Section', action: () => scrollTo('#experience') },
    { id: 'stack', label: 'Go to Tech Stack', hint: 'Section', action: () => scrollTo('#stack') },
    { id: 'github', label: 'Go to GitHub', hint: 'Section', action: () => scrollTo('#github') },
    { id: 'blog', label: 'Go to Blog', hint: 'Section', action: () => scrollTo('#blog') },
    { id: 'contact', label: 'Go to Contact', hint: 'Section', action: () => scrollTo('#contact') },
    { id: 'email', label: 'Email Utpanna', hint: 'External', action: () => window.open(`mailto:${profile.email}?subject=Opportunity for Frontend Developer`) },
    { id: 'whatsapp', label: 'Message on WhatsApp', hint: 'External', action: () => window.open(`https://wa.me/${profile.whatsapp}`) },
    { id: 'github-ext', label: 'Open GitHub Profile', hint: 'External', action: () => window.open(profile.github) },
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      label: `Project: ${p.title}`,
      hint: 'Project',
      action: () => scrollTo('#projects'),
    })),
  ];

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar onCommand={() => setCmdOpen(true)} />

          <div className="noise" />
          <AuroraBackground />

          <main className="relative">
            <Hero />
            <Marquee />
            <About />
            <TechStack />
            <Projects />
            <Experience />
            <Education />
            {/* <Testimonials /> */}
            <GitHub />
            <Blog />
            <Contact />
            <Footer />
          </main>

          <WhatsAppButton />
          <AIAssistant />
          <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} inputRef={cmdInput} commands={commands} />
        </>
      )}
    </>
  );
}

export default App;
