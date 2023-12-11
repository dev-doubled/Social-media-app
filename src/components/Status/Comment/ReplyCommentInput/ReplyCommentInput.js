import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import api from "~/services/apiService";
import styles from "./ReplyCommentInput.module.scss";
import userImg from "~/assets/images/user-default.png";
const cx = classNames.bind(styles);
function ReplyCommentInput({
  userData,
  showReplyComment,
  comment,
  setListReplyComments,
  setCountComment,
}) {
  const textareaRef = useRef(null);
  const [replyContent, setReplyContent] = useState("");
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
  }, [replyContent, showReplyComment]);

  const handleContentChange = (e) => {
    setReplyContent(e.target.value);
  };
  const handleSendReplyComment = () => {
    const replyCommentData = {
      commentID: comment._id,
      author: {
        userId: userData.userId,
        userName: userData.surName + " " + userData.firstName,
        userAvatar: userData.userAvatar,
      },
      replyContent: replyContent,
    };
    api
      .post("/replyComment/create", replyCommentData)
      .then((response) => {
        setReplyContent("");
        callApiGetAllReplyComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const callApiGetAllReplyComments = () => {
    api
      .get(`/replyComment/get-all-reply/${comment._id}`)
      .then((response) => {
        setListReplyComments(response.data);
        setCountComment((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReplyComment();
    }
  };
  return (
    <div className={cx("status-comment")}>
      <div className={cx("post-comment")}>
        <div className={cx("user-avt")}>
          <img
            src={userData.userAvatar ? userData.userAvatar : userImg}
            alt="avatar"
            className={cx("avatar")}
          />
        </div>
        <div className={cx("input-comment-active")}>
          <textarea
            className={cx("input-content")}
            placeholder={`Reply to ${comment.author.userName}`}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            value={replyContent}
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
                replyContent !== "" ? cx("send-btn-active") : cx("send-btn")
              }
            >
              <button
                className={cx("btn")}
                disabled={replyContent === ""}
                onClick={handleSendReplyComment}
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

export default ReplyCommentInput;
