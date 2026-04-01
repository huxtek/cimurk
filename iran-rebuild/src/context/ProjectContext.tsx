import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Project } from "../types";
import { seedProjects } from "../data/seedData";

type UserVote = 1 | -1 | 0;

interface ProjectContextValue {
  projects: Project[];
  userVotes: Record<string, UserVote>;
  addProject: (project: Omit<Project, "id" | "votes" | "createdAt">) => void;
  vote: (id: string, direction: 1 | -1) => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [userVotes, setUserVotes] = useState<Record<string, UserVote>>({});

  const addProject = useCallback(
    (data: Omit<Project, "id" | "votes" | "createdAt">) => {
      const newProject: Project = {
        ...data,
        id: crypto.randomUUID(),
        votes: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProjects((prev) => [newProject, ...prev]);
    },
    []
  );

  const vote = useCallback((id: string, direction: 1 | -1) => {
    const current = userVotes[id] || 0;
    let newVote: UserVote;
    let delta: number;

    if (current === direction) {
      newVote = 0;
      delta = -direction;
    } else {
      newVote = direction;
      delta = direction - current;
    }

    setUserVotes((prev) => ({ ...prev, [id]: newVote }));
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, votes: p.votes + delta } : p))
    );
  }, [userVotes]);

  return (
    <ProjectContext.Provider value={{ projects, userVotes, addProject, vote }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}
