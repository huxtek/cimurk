import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import type { Project } from "../types";
import { supabase } from "../supabase";
import { useAuth } from "./AuthContext";

type UserVote = 1 | -1 | 0;

interface ProjectContextValue {
  projects: Project[];
  userVotes: Record<string, UserVote>;
  loading: boolean;
  addProject: (project: Omit<Project, "id" | "votes" | "createdAt" | "status">) => Promise<void>;
  vote: (id: string, direction: 1 | -1) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

function rowToProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    category: row.category as string,
    contributorType: (row.contributor_type as string) ?? undefined,
    stage: row.stage as string,
    timeline: row.timeline as string,
    budget: row.budget as string,
    author: (row.author as string) ?? undefined,
    votes: row.votes as number,
    status: row.status as string,
    createdAt: row.created_at as string,
  };
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, UserVote>>({});
  const [loading, setLoading] = useState(true);

  // Load approved projects
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "approved")
        .order("votes", { ascending: false });

      if (!error && data) {
        setProjects(data.map(rowToProject));
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Load user's votes when user changes
  useEffect(() => {
    if (!user) {
      setUserVotes({});
      return;
    }
    async function fetchUserVotes() {
      const { data, error } = await supabase
        .from("project_votes")
        .select("project_id, direction")
        .eq("user_id", user!.email);

      if (!error && data) {
        const votes: Record<string, UserVote> = {};
        data.forEach((row: { project_id: string; direction: UserVote }) => {
          votes[row.project_id] = row.direction;
        });
        setUserVotes(votes);
      }
    }
    fetchUserVotes();
  }, [user]);

  const addProject = useCallback(async (
    data: Omit<Project, "id" | "votes" | "createdAt" | "status">
  ) => {
    const { error } = await supabase.from("projects").insert({
      title: data.title,
      description: data.description,
      category: data.category,
      contributor_type: data.contributorType ?? null,
      stage: data.stage,
      timeline: data.timeline,
      budget: data.budget,
      author: data.author ?? null,
      status: "pending",
    });
    if (error) throw error;
  }, []);

  const vote = useCallback(async (id: string, direction: 1 | -1) => {
    if (!user) return;

    const current = userVotes[id] || 0;

    // Optimistic UI update
    const newVote: UserVote = current === direction ? 0 : direction;
    const delta = newVote === 0 ? -direction : direction - current;
    setUserVotes((prev) => ({ ...prev, [id]: newVote }));
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, votes: p.votes + delta } : p))
    );

    // Call DB function — handles insert/update/delete + recalculates votes atomically
    const { error } = await supabase.rpc("handle_project_vote", {
      p_project_id: id,
      p_user_id: user.email,
      p_direction: direction,
    });

    if (error) {
      console.error("Vote error:", error);
      // Revert optimistic update on failure
      setUserVotes((prev) => ({ ...prev, [id]: current as UserVote }));
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, votes: p.votes - delta } : p))
      );
      return;
    }

    // Sync actual vote count from DB
    const { data } = await supabase
      .from("projects")
      .select("votes")
      .eq("id", id)
      .single();

    if (data) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, votes: data.votes } : p))
      );
    }
  }, [user, userVotes]);

  return (
    <ProjectContext.Provider value={{ projects, userVotes, loading, addProject, vote }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}
