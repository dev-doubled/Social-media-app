import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReplyComment.module.scss";
import userImg from "~/assets/images/user.jpg";
const cx = classNames.bind(styles);
const replyComment = `Không biết có cậu nào quan tâm chủ đề này không nhỉ? MeLy sẽ làm riêng 1 topic kĩ hơn về nó nè!. Đoạn Factory mình thường hay dùng switch case. Cái này nó tuân theo cái O trong SOLID. Sau này có đẻ thêm mới một class ví dụ Motobike thì chỉ cần thêm vào trong Factory là được`;

function ReplyComment() {
  const [showFullReplyComment, setShowFullReplyComment] = useState(false);
  const toggleContent = () => {
    setShowFullReplyComment(!showFullReplyComment);
  };
  return (
    <div className={cx("reply-comment")}>
      <div className={cx("user-avatar")}>
        <img src={userImg} alt="user-avt" className={cx("avt")} />
      </div>
      <div className={cx("comment-content-wrapper")}>
        <div className={cx("main-comment")}>
          <div className={cx("comment-content-container")}>
            <div className={cx("username")}>Đình Duy</div>
            <div className={cx("comment-content")}>
              {replyComment.length > 200
                ? showFullReplyComment
                  ? replyComment
                  : replyComment.slice(0, 200)
                : replyComment}
              {replyComment.length > 200 && !showFullReplyComment && (
                <>
                  ....
                  <button
                    onClick={toggleContent}
                    className={cx("see-more-btn")}
                  >
                    See More
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={cx("setting-comment")}>
            <i className={cx("fa-regular fa-ellipsis", "icon")}></i>
          </div>
        </div>
        <div className={cx("comment-options")}>
          <div className={cx("comment-time")}>25m</div>
          <div className={cx("comment-reaction")}>Like</div>
          <div className={cx("comment-reply")}>Reply</div>
        </div>
      </div>
    </div>
  );
}

export default ReplyComment;
