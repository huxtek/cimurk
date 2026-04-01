import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import CheckboxDropdown from "../components/CheckboxDropdown";
import { CATEGORIES, TIMELINES, BUDGETS } from "../types";

export default function Projects() {
  const { projects } = useProjects();
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
    <section className="projects-section">
      <h2>All Projects</h2>
      <p className="section-sub">
        Sorted by votes — discover, explore, and support
      </p>

      <div className="filters-row">
        <CheckboxDropdown
          label="Categories"
          options={CATEGORIES}
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />
        <CheckboxDropdown
          label="Timeline"
          options={TIMELINES}
          selected={selectedTimelines}
          onChange={setSelectedTimelines}
        />
        <CheckboxDropdown
          label="Budget"
          options={BUDGETS}
          selected={selectedBudgets}
          onChange={setSelectedBudgets}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">
          No projects match your filters. Try adjusting them or{" "}
          <Link to="/submit">submit a new project</Link>!
        </p>
      ) : (
        <div className="project-list">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
