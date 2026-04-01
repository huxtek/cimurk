import { useState, useMemo } from "react";
import { useProjects } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";
import type { Comment } from "../types";

interface Props {
  projectId: string;
}

export default function CommentThread({ projectId }: Props) {
  const { comments, addComment } = useProjects();
  const { user, signIn } = useAuth();
  const [text, setText] = useState("");

  const projectComments = useMemo(
    () => comments.filter((c) => c.projectId === projectId),
    [comments, projectId]
  );

  const topLevel = projectComments.filter((c) => c.parentId === null);

  function handleSubmit() {
    if (!text.trim() || !user) return;
    addComment({
      projectId,
      parentId: null,
      authorName: user.name,
      authorEmail: user.email,
      text: text.trim(),
    });
    setText("");
  }

  return (
    <div className="comments-section">
      <h3>Discussion ({projectComments.length})</h3>

      <div className="comment-form">
        {user ? (
          <>
            <div className="comment-form-header">
              <img src={user.avatar} alt={user.name} className="comment-avatar" />
              <span className="comment-author-name">{user.name}</span>
            </div>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Join the discussion..."
            />
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!text.trim()}
            >
              Post Comment
            </button>
          </>
        ) : (
          <button className="btn btn-outline google-btn" onClick={signIn}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google to comment
          </button>
        )}
      </div>

      <div className="comment-list">
        {topLevel.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            allComments={projectComments}
            projectId={projectId}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  allComments: Comment[];
  projectId: string;
  depth: number;
}

function CommentItem({ comment, allComments, projectId, depth }: CommentItemProps) {
  const { addComment } = useProjects();
  const { user, signIn } = useAuth();
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const replies = allComments.filter((c) => c.parentId === comment.id);

  function handleReply() {
    if (!replyText.trim() || !user) return;
    addComment({
      projectId,
      parentId: comment.id,
      authorName: user.name,
      authorEmail: user.email,
      text: replyText.trim(),
    });
    setReplyText("");
    setReplying(false);
  }

  const timeAgo = getTimeAgo(comment.createdAt);

  return (
    <div className={`comment-item ${depth > 0 ? "comment-nested" : ""}`}>
      <div className="comment-header">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=6c63ff&color=fff&size=32`}
          alt={comment.authorName}
          className="comment-avatar-sm"
        />
        <span className="comment-author">{comment.authorName}</span>
        <span className="comment-time">{timeAgo}</span>
      </div>
      <p className="comment-text">{comment.text}</p>
      <div className="comment-actions">
        {user ? (
          <button className="comment-reply-btn" onClick={() => setReplying(!replying)}>
            {replying ? "Cancel" : "Reply"}
          </button>
        ) : (
          <button className="comment-reply-btn" onClick={signIn}>
            Sign in to reply
          </button>
        )}
      </div>

      {replying && user && (
        <div className="reply-form">
          <textarea
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${comment.authorName}...`}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleReply}
            disabled={!replyText.trim()}
          >
            Reply
          </button>
        </div>
      )}

      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((r) => (
            <CommentItem
              key={r.id}
              comment={r}
              allComments={allComments}
              projectId={projectId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
