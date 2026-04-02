import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Comment } from "../types";

interface CommentContextValue {
  comments: Comment[];
  commentLikes: Record<string, boolean>;
  addComment: (comment: Omit<Comment, "id" | "votes" | "createdAt">) => void;
  likeComment: (id: string) => void;
}

const CommentContext = createContext<CommentContextValue | null>(null);

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({});

  const addComment = useCallback(
    (data: Omit<Comment, "id" | "votes" | "createdAt">) => {
      const newComment: Comment = {
        ...data,
        id: crypto.randomUUID(),
        votes: 0,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
    },
    []
  );

  const likeComment = useCallback((id: string) => {
    const liked = !!commentLikes[id];
    const delta = liked ? -1 : 1;
    setCommentLikes((prev) => ({ ...prev, [id]: !liked }));
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + delta } : c))
    );
  }, [commentLikes]);

  return (
    <CommentContext.Provider value={{ comments, commentLikes, addComment, likeComment }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComments must be used within CommentProvider");
  return ctx;
}
