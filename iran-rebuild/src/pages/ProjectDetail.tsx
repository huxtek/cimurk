import { useParams, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import CommentThread from "../components/CommentThread";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { projects, vote, userVotes } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="detail-section">
        <p className="empty-state">
          Project not found. <Link to="/projects">Browse all projects</Link>
        </p>
      </section>
    );
  }

  const userVote = userVotes[project.id] || 0;

  return (
    <section className="detail-section">
      <Link to="/projects" className="back-link">← Back to Projects</Link>

      <div className="detail-header">
        <div className="detail-meta">
          <span className="card-category">{project.category}</span>
          <span className="card-stage">{project.stage}</span>
        </div>
        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-desc">{project.description}</p>
      </div>

      <div className="detail-grid">
        <div className="detail-info-card">
          <div className="detail-row">
            <span className="detail-label">Votes</span>
            <div className="modal-vote">
              <button
                className={userVote === -1 ? "voted-down" : ""}
                onClick={() => vote(project.id, -1)}
                aria-label="Downvote"
              >▼</button>
              <span className="vote-count">{project.votes}</span>
              <button
                className={userVote === 1 ? "voted-up" : ""}
                onClick={() => vote(project.id, 1)}
                aria-label="Upvote"
              >▲</button>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Stage</span>
            <span>{project.stage}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Category</span>
            <span>{project.category}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Timeline</span>
            <span>{project.timeline}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Budget</span>
            <span>{project.budget}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created</span>
            <span>{project.createdAt}</span>
          </div>
          {project.author && (
            <div className="detail-row">
              <span className="detail-label">Author</span>
              <span>{project.author}</span>
            </div>
          )}
        </div>
      </div>

      <CommentThread projectId={project.id} />
    </section>
  );
}
