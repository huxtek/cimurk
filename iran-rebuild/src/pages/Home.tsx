import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import { CATEGORIES } from "../types";

export default function Home() {
  const { projects } = useProjects();

  const top3 = useMemo(
    () => [...projects].sort((a, b) => b.votes - a.votes).slice(0, 3),
    [projects]
  );

  const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0);

  return (
    <>
      <section className="hero">
        <p className="hero-label">Building Together</p>
        <h1>
          Building a Free Iran <span className="accent">Together</span>
        </h1>
        <p className="hero-sub">
          A platform to share, discover, and vote on projects — from freedom
          activism to civil infrastructure — that will shape Iran's future.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="btn btn-primary">
            Explore Projects
          </Link>
          <Link to="/submit" className="btn btn-outline">
            Submit Your Idea
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">{projects.length}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-num">{totalVotes}</span>
            <span className="stat-label">Total Votes</span>
          </div>
          <div className="stat">
            <span className="stat-num">{CATEGORIES.length}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </section>

      <section className="top-projects">
        <h2>Top Projects</h2>
        <p className="section-sub">Highest voted ideas from the community</p>
        <div className="project-list">
          {top3.map((p) => (
            <ProjectCard key={p.id} project={p} variant="preview" />
          ))}
        </div>
        <div className="see-all">
          <Link to="/projects" className="btn btn-outline">
            View All Projects →
          </Link>
        </div>
      </section>
    </>
  );
}
