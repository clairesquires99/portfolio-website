import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { ProjectPage } from "./components/ProjectPage";
import { ProjectsSection } from "./components/ProjectsSection";

function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
