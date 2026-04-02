import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Project } from "../../types";
import { useProjects } from "../../context/ProjectContext";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import styles from "./ProjectCard.module.scss";

interface Props {
  project: Project;
  variant?: "full" | "preview";
}

export default function ProjectCard({ project, variant = "full" }: Props) {
  const { vote, userVotes } = useProjects();
  const navigate = useNavigate();
  const lp = useLocalizedPath();
  const { t } = useTranslation();
  const userVote = userVotes[project.id] || 0;

  return (
    <div
      className={styles.card}
      onClick={() => navigate(lp(`/projects/${project.id}`))}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(lp(`/projects/${project.id}`))}
    >
      <div className={styles.vote}>
        {variant === "full" ? (
          <>
            <button
              className={`${styles.voteBtn} ${styles.voteUp} ${userVote === 1 ? styles.votedUp : ""}`}
              onClick={(e) => { e.stopPropagation(); vote(project.id, 1); }}
              aria-label="Upvote"
            >
              ▲
            </button>
            <span className="vote-count">{project.votes}</span>
            <button
              className={`${styles.voteBtn} ${styles.voteDown} ${userVote === -1 ? styles.votedDown : ""}`}
              onClick={(e) => { e.stopPropagation(); vote(project.id, -1); }}
              aria-label="Downvote"
            >
              ▼
            </button>
          </>
        ) : (
          <span className="vote-count">{project.votes}</span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className="tag-category">{t(`cat_${project.category}`)}</span>
          <span className="tag-stage">{t(`stage_${project.stage}`)}</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
        {project.author && (
          <span className={styles.author}>by {project.author}</span>
        )}
      </div>
    </div>
  );
}
