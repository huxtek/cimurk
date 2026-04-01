import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../context/ProjectContext";
import ProjectCard from "../../components/ProjectCard";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import { CATEGORIES } from "../../types";
import styles from "./Home.module.scss";

export default function Home() {
  const { projects } = useProjects();
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  const top3 = useMemo(
    () => [...projects].sort((a, b) => b.votes - a.votes).slice(0, 3),
    [projects]
  );

  const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0);

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.label}>{t("Home_Label")}</p>
        <h1>
          {t("Home_Title")} <span className={styles.accent}>{t("Home_TitleAccent")}</span>
        </h1>
        <p className={styles.sub}>{t("Home_Subtitle")}</p>
        <div className={styles.actions}>
          <Link to={lp("/projects")} className="btn btn-primary">
            {t("Home_ExploreProjects")}
          </Link>
          <Link to={lp("/submit")} className="btn btn-outline">
            {t("Home_SubmitIdea")}
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{projects.length}</span>
            <span className={styles.statLabel}>{t("Home_StatProjects")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{totalVotes}</span>
            <span className={styles.statLabel}>{t("Home_StatVotes")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{CATEGORIES.length}</span>
            <span className={styles.statLabel}>{t("Home_StatCategories")}</span>
          </div>
        </div>
      </section>

      <section className={styles.topProjects}>
        <h2>{t("Home_TopProjects")}</h2>
        <p className={styles.sectionSub}>{t("Home_TopProjectsSub")}</p>
        <div className={styles.list}>
          {top3.map((p) => (
            <ProjectCard key={p.id} project={p} variant="preview" />
          ))}
        </div>
        <div className={styles.seeAll}>
          <Link to={lp("/projects")} className="btn btn-outline">
            {t("Home_ViewAll")}
          </Link>
        </div>
      </section>
    </>
  );
}
