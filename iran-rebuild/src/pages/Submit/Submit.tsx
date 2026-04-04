import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../context/ProjectContext";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import { CATEGORIES, STAGES, TIMELINES, BUDGETS, CONTRIBUTOR_TYPES } from "../../types";
import styles from "./Submit.module.scss";

export default function Submit() {
  const { addProject } = useProjects();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  const [title, setTitle] = useState("");
  const [contributorType, setContributorType] = useState<string>(CONTRIBUTOR_TYPES[0]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [stage, setStage] = useState<string>(STAGES[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINES[0]);
  const [budget, setBudget] = useState<string>(BUDGETS[0]);
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addProject({
        title: title.trim(),
        description: description.trim(),
        category,
        contributorType,
        stage,
        timeline,
        budget,
        author: author.trim() || undefined,
      });
      setSubmitted(true);
    } catch {
      setError(t("Submit_Error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.section}>
      <h2>{t("Submit_Title")}</h2>
      <p className={styles.sub}>{t("Submit_Subtitle")}</p>

      {submitted ? (
        <div className={styles.success}>
          <p>{t("Submit_Success")}</p>
          <button className="btn btn-outline" onClick={() => navigate(lp("/projects"))}>
            {t("Submit_ViewProjects")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          {t("Submit_FieldTitle")}
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("Submit_PlaceholderTitle")} />
        </label>

        <label>
          {t("Submit_FieldContributorType")}
          <select required value={contributorType} onChange={(e) => setContributorType(e.target.value)}>
            {CONTRIBUTOR_TYPES.map((ct) => (
              <option key={ct} value={ct}>{t(`contributor_${ct}`)}</option>
            ))}
          </select>
        </label>

        <label>
          {t("Submit_FieldDescription")}
          <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("Submit_PlaceholderDescription")} />
        </label>

        <div className={styles.row}>
          <label>
            {t("Submit_FieldCategory")}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (<option key={c} value={c}>{t(`cat_${c}`)}</option>))}
            </select>
          </label>
          <label>
            {t("Submit_FieldStage")}
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              {STAGES.map((s) => (<option key={s} value={s}>{t(`stage_${s}`)}</option>))}
            </select>
          </label>
        </div>

        <div className={styles.row}>
          <label>
            {t("Submit_FieldTimeline")}
            <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
              {TIMELINES.map((tt) => (<option key={tt} value={tt}>{t(`timeline_${tt}`)}</option>))}
            </select>
          </label>
          <label>
            {t("Submit_FieldBudget")}
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              {BUDGETS.map((b) => (<option key={b} value={b}>{t(`budget_${b}`)}</option>))}
            </select>
          </label>
        </div>

        <label>
          {t("Submit_FieldAuthor")}
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder={t("Submit_PlaceholderAuthor")} />
        </label>

        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={submitting}>
            {submitting ? t("Submit_Submitting") : t("Submit_Button")}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </section>
  );
}
