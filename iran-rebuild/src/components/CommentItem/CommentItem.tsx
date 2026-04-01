import { useState } from "react";
import { useComments } from "../../context/CommentContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getTimeAgo } from "../../utils/timeAgo";
import type { Comment } from "../../types";
import styles from "./CommentItem.module.scss";

interface Props {
  comment: Comment;
  allComments: Comment[];
  projectId: string;
  depth: number;
}

export default function CommentItem({ comment, allComments, projectId, depth }: Props) {
  const { addComment } = useComments();
  const { user, signIn } = useAuth();
  const { t } = useTranslation();
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
    <div className={`${styles.item} ${depth > 0 ? styles.nested : ""}`}>
      <div className={styles.header}>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=6c63ff&color=fff&size=32`}
          alt={comment.authorName}
          className={styles.avatar}
        />
        <span className={styles.author}>{comment.authorName}</span>
        <span className={styles.time}>{timeAgo}</span>
      </div>
      <p className={styles.text}>{comment.text}</p>
      <div className={styles.actions}>
        {user ? (
          <button className={styles.replyBtn} onClick={() => setReplying(!replying)}>
            {replying ? t("CommentItem_Cancel") : t("CommentItem_Reply")}
          </button>
        ) : (
          <button className={styles.replyBtn} onClick={signIn}>
            {t("CommentItem_SignInToReply")}
          </button>
        )}
      </div>

      {replying && user && (
        <div className={styles.replyForm}>
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
            {t("CommentItem_ReplyButton")}
          </button>
        </div>
      )}

      {replies.length > 0 && (
        <div className={styles.replies}>
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
