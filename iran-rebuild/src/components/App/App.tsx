import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthProvider } from "../../context/AuthContext";
import { ProjectProvider } from "../../context/ProjectContext";
import { CommentProvider } from "../../context/CommentContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import LanguageLayout from "../LanguageLayout";

const Home = lazy(() => import("../../pages/Home"));
const Projects = lazy(() => import("../../pages/Projects"));
const ProjectDetail = lazy(() => import("../../pages/ProjectDetail"));
const Submit = lazy(() => import("../../pages/Submit"));
const Terms = lazy(() => import("../../pages/Terms"));
const Privacy = lazy(() => import("../../pages/Privacy"));

function PageRoutes() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:id" element={<ProjectDetail />} />
      <Route path="submit" element={<Submit />} />
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
    </>
  );
}

function AppContent() {
  const { t } = useTranslation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="container">
        <Suspense fallback={<div className="loading">{t("App_Loading")}</div>}>
          <Routes>
            {/* English: no prefix */}
            <Route path="/" element={<LanguageLayout />}>
              {PageRoutes()}
            </Route>
            {/* Farsi: /fa prefix */}
            <Route path="/fa" element={<LanguageLayout />}>
              {PageRoutes()}
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <CommentProvider>
            <AppContent />
          </CommentProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
