import { Glow } from '@/components/Glow';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Glow />
      <a href="#hero" className="skip">Skip to content</a>
      <Nav />
      <main>
        <div className="home-top">
          <Hero />
          <Skills />
        </div>
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
