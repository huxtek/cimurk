import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../context/ProjectContext";
import ProjectCard from "../../components/ProjectCard";
import CheckboxDropdown from "../../components/CheckboxDropdown";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import { CATEGORIES, TIMELINES, BUDGETS } from "../../types";
import styles from "./Projects.module.scss";

export default function Projects() {
  const { projects } = useProjects();
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() => new Set<string>(Array.from(CATEGORIES)));
  const [selectedTimelines, setSelectedTimelines] = useState<Set<string>>(() => new Set<string>(Array.from(TIMELINES)));
  const [selectedBudgets, setSelectedBudgets] = useState<Set<string>>(() => new Set<string>(Array.from(BUDGETS)));

  const filtered = useMemo(() => {
    return [...projects]
      .filter(
        (p) =>
          selectedCategories.has(p.category) &&
          selectedTimelines.has(p.timeline) &&
          selectedBudgets.has(p.budget)
      )
      .sort((a, b) => b.votes - a.votes);
  }, [projects, selectedCategories, selectedTimelines, selectedBudgets]);

  return (
    <section className={styles.section}>
      <h2>{t("Projects_Title")}</h2>
      <p className={styles.sub}>{t("Projects_Subtitle")}</p>

      <div className={styles.filters}>
        <CheckboxDropdown label={t("Projects_FilterCategories")} options={CATEGORIES} selected={selectedCategories} onChange={setSelectedCategories} />
        <CheckboxDropdown label={t("Projects_FilterTimeline")} options={TIMELINES} selected={selectedTimelines} onChange={setSelectedTimelines} />
        <CheckboxDropdown label={t("Projects_FilterBudget")} options={BUDGETS} selected={selectedBudgets} onChange={setSelectedBudgets} />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          {t("Projects_EmptyState")}{" "}
          <Link to={lp("/submit")}>{t("Projects_EmptyLink")}</Link>!
        </p>
      ) : (
        <div className={styles.list}>
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
