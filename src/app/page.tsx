import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, Services, Tech, Process } from "@/components/Sections";
import { Contact, Footer } from "@/components/Contact";
import { ScrollProgress } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Tech />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
