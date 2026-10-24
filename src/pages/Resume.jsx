import { lazy, Suspense } from "react";
import "./Resume.css";

const CurriculumViewer = lazy(
  () => import("../components/CurriculumViewer/CurriculumViewer"),
);

function Resume() {
  return (
    <section id="resume">
      <Suspense
        fallback={<p className="cv-fallback">Carregando visualizador...</p>}
      >
        <CurriculumViewer />
      </Suspense>
    </section>
  );
}

export default Resume;
