import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { useProjects } from "../context/ProjectContext";

interface Props {
  project: Project;
  variant?: "full" | "preview";
}

export default function ProjectCard({ project, variant = "full" }: Props) {
  const { vote, userVotes } = useProjects();
  const navigate = useNavigate();
  const userVote = userVotes[project.id] || 0;

  return (
    <div
      className="project-card clickable"
      onClick={() => navigate(`/projects/${project.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${project.id}`)}
    >
      <div className="card-vote">
        {variant === "full" ? (
          <>
            <button
              className={userVote === 1 ? "voted-up" : ""}
              onClick={(e) => { e.stopPropagation(); vote(project.id, 1); }}
              aria-label="Upvote"
            >
              ▲
            </button>
            <span className="vote-count">{project.votes}</span>
            <button
              className={userVote === -1 ? "voted-down" : ""}
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
      <div className="card-body">
        <div className="card-meta">
          <span className="card-category">{project.category}</span>
          <span className="card-stage">{project.stage}</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        {project.author && (
          <span className="card-author">by {project.author}</span>
        )}
      </div>
    </div>
  );
}
