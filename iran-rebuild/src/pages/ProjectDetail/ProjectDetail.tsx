import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../context/ProjectContext";
import CommentThread from "../../components/CommentThread";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import styles from "./ProjectDetail.module.scss";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const { projects, vote, userVotes } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className={styles.section}>
        <p className={styles.empty}>
          {t("ProjectDetail_NotFound")} <Link to={lp("/projects")}>{t("ProjectDetail_BrowseAll")}</Link>
        </p>
      </section>
    );
  }

  const userVote = userVotes[project.id] || 0;

  return (
    <section className={styles.section}>
      <Link to={lp("/projects")} className={styles.backLink}>{t("ProjectDetail_Back")}</Link>

      <div className={styles.header}>
        <div className={styles.meta}>
          <span className="tag-category">{project.category}</span>
          <span className="tag-stage">{project.stage}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.desc}>{project.description}</p>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.row}>
          <span className={styles.label}>{t("ProjectDetail_Votes")}</span>
          <div className={styles.vote}>
            <button
              className={`${styles.voteBtn} ${styles.voteDown} ${userVote === -1 ? styles.votedDown : ""}`}
              onClick={() => vote(project.id, -1)}
              aria-label="Downvote"
            >▼</button>
            <span className="vote-count">{project.votes}</span>
            <button
              className={`${styles.voteBtn} ${styles.voteUp} ${userVote === 1 ? styles.votedUp : ""}`}
              onClick={() => vote(project.id, 1)}
              aria-label="Upvote"
            >▲</button>
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t("ProjectDetail_Stage")}</span>
          <span>{project.stage}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t("ProjectDetail_Category")}</span>
          <span>{project.category}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t("ProjectDetail_Timeline")}</span>
          <span>{project.timeline}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t("ProjectDetail_Budget")}</span>
          <span>{project.budget}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t("ProjectDetail_Created")}</span>
          <span>{project.createdAt}</span>
        </div>
        {project.author && (
          <div className={styles.row}>
            <span className={styles.label}>{t("ProjectDetail_Author")}</span>
            <span>{project.author}</span>
          </div>
        )}
      </div>

      <CommentThread projectId={project.id} />
    </section>
  );
}
