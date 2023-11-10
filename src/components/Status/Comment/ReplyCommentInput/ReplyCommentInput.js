import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReplyCommentInput.module.scss";
import userImg from "~/assets/images/user.jpg";
const cx = classNames.bind(styles);
function ReplyComment({ showReplyComment }) {
  const textareaRef = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  useEffect(() => {
    if (showReplyComment) {
      // Automatically resize the textarea when the content is changed
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
      // Calculate the number of rows based on scrollHeight and clientHeight
      const extraLines =
        (textareaRef.current.scrollHeight - textareaRef.current.clientHeight) /
        20;
      const calculatedRows = Math.max(1, Math.ceil(extraLines));
      setTextareaRows(calculatedRows);
    }
  }, [commentContent, showReplyComment]);

  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleSendComment = () => {
    console.log(commentContent);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };
  return (
    <div className={cx("status-comment")}>
      <div className={cx("post-comment")}>
        <div className={cx("user-avt")}>
          <img src={userImg} alt="avatar" className={cx("avatar")} />
        </div>
        <div className={cx("input-comment-active")}>
          <textarea
            className={cx("input-content")}
            placeholder="Reply to Dinh Duy..."
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            value={commentContent}
            rows={textareaRows}
            ref={textareaRef}
            autoFocus={true}
          ></textarea>
          <div className={cx("options-input")}>
            <div className={cx("options-list")}>
              <div className={cx("option")}>
                <i className={cx("fa-light fa-user-tag", "icon")}></i>
              </div>
              <div className={cx("option")}>
                <i className={cx("fa-light fa-face-smile", "icon")}></i>
              </div>
              <div className={cx("option")}>
                <i className={cx("fa-light fa-camera", "icon")}></i>
              </div>
              <div className={cx("option")}>
                <i className={cx("fa-light fa-gif", "icon")}></i>
              </div>
              <div className={cx("option")}>
                <i className={cx("fa-light fa-image", "icon")}></i>
              </div>
            </div>
            <div
              className={
                commentContent !== "" ? cx("send-btn-active") : cx("send-btn")
              }
            >
              <button
                className={cx("btn")}
                disabled={commentContent === ""}
                onClick={handleSendComment}
              >
                <i className={cx("fa-solid fa-paper-plane-top", "icon")}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyComment;
