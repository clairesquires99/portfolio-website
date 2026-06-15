import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ProjectPage } from "./components/ProjectPage";
import { ProjectsSection } from "./components/ProjectsSection";
import { AnimationPhaseProvider } from "./context/AnimationPhaseContext";

function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AnimationPhaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </AnimationPhaseProvider>
  );
}

export default App;
