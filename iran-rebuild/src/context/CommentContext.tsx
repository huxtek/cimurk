import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Comment } from "../types";

interface CommentContextValue {
  comments: Comment[];
  addComment: (comment: Omit<Comment, "id" | "createdAt">) => void;
}

const CommentContext = createContext<CommentContextValue | null>(null);

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = useCallback(
    (data: Omit<Comment, "id" | "createdAt">) => {
      const newComment: Comment = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
    },
    []
  );

  return (
    <CommentContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComments must be used within CommentProvider");
  return ctx;
}
