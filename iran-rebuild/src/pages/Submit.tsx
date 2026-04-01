import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { CATEGORIES, STAGES, TIMELINES, BUDGETS } from "../types";

export default function Submit() {
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [stage, setStage] = useState<string>(STAGES[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINES[0]);
  const [budget, setBudget] = useState<string>(BUDGETS[0]);
  const [author, setAuthor] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addProject({
      title: title.trim(),
      description: description.trim(),
      category,
      stage,
      timeline,
      budget,
      author: author.trim() || undefined,
    });
    navigate("/");
  }

  return (
    <section className="submit-section">
      <h2>Submit a Project</h2>
      <p className="section-sub">Share your vision for a free and rebuilt Iran.</p>

      <form onSubmit={handleSubmit} className="submit-form">
        <label>
          Title *
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
          />
        </label>

        <label>
          Description *
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project, its goals, and impact"
          />
        </label>

        <div className="form-row">
          <label>
            Category *
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Stage *
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Estimated Timeline *
            <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label>
            Estimated Budget *
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Your Name (optional)
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Anonymous if left blank"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Submit Project
        </button>
      </form>
    </section>
  );
}
