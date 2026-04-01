import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import ProjectCard from "../../components/ProjectCard";
import { CATEGORIES } from "../../types";
import styles from "./Home.module.scss";

export default function Home() {
  const { projects } = useProjects();

  const top3 = useMemo(
    () => [...projects].sort((a, b) => b.votes - a.votes).slice(0, 3),
    [projects]
  );

  const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0);

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.label}>Building Together</p>
        <h1>
          Building a Free Iran <span className={styles.accent}>Together</span>
        </h1>
        <p className={styles.sub}>
          A platform to share, discover, and vote on projects — from freedom
          activism to civil infrastructure — that will shape Iran's future.
        </p>
        <div className={styles.actions}>
          <Link to="/projects" className="btn btn-primary">
            Explore Projects
          </Link>
          <Link to="/submit" className="btn btn-outline">
            Submit Your Idea
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{projects.length}</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{totalVotes}</span>
            <span className={styles.statLabel}>Total Votes</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{CATEGORIES.length}</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
        </div>
      </section>

      <section className={styles.topProjects}>
        <h2>Top Projects</h2>
        <p className={styles.sectionSub}>Highest voted ideas from the community</p>
        <div className={styles.list}>
          {top3.map((p) => (
            <ProjectCard key={p.id} project={p} variant="preview" />
          ))}
        </div>
        <div className={styles.seeAll}>
          <Link to="/projects" className="btn btn-outline">
            View All Projects →
          </Link>
        </div>
      </section>
    </>
  );
}
