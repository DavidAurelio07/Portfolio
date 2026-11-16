import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import "./Resume.css";

const CurriculumViewer = lazy(
  () => import("../components/CurriculumViewer/CurriculumViewer"),
);

function Resume() {
  const { t } = useTranslation();

  return (
    <section id="resume">
      <div className="resume-hero">
        <h2 className="resume-title">{t("resume.title")}</h2>
        <p className="resume-subtitle">{t("resume.subtitle")}</p>
      </div>

      <Suspense
        fallback={
          <p className="cv-fallback">
            <span className="cv-spinner" aria-hidden="true" />
            {t("resume.loading")}
          </p>
        }
      >
        <CurriculumViewer />
      </Suspense>
    </section>
  );
}

export default Resume;
