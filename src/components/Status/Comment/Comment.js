import React, { useState } from "react";
import classNames from "classnames/bind";
import ReplyCommentInput from "./ReplyCommentInput";
import ReplyComment from "./ReplyComment";

import styles from "./Comment.module.scss";
import userImg from "~/assets/images/user.jpg";

const cx = classNames.bind(styles);
const comment = `DÒNG TIỀN ĐANG DẦN TRỞ LẠI THỊ TRƯỜNG CRYPTO? 
Theo dữ liệu của CoinShares, dòng tiền đầu tư các quỹ đổ vào thị trường crypto trong tuần qua đạt mức cao nhất kể từ tháng 07/2022 với hơn $326M
CoinShares cho biết rằng sự gia tăng này được thúc đẩy bởi sự lạc quan ngày càng gia tăng từ các nhà đầu tư rằng SEC có thể sớm phê duyệt quỹ Spot Bitcoin ETF.
Trong đó, Bitcoin chiếm 90%  tổng giá trị vốn đầu tư, lên đến $296 triệu USD.`;

function Comment() {
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);

  const toggleContent = () => {
    setShowFullComment(!showFullComment);
  };
  return (
    <>
      <div className={cx("comment")}>
        <div className={cx("user-avatar")}>
          <img src={userImg} alt="user-avt" className={cx("avt")} />
        </div>
        <div className={cx("comment-content-wrapper")}>
          <div className={cx("main-comment")}>
            <div className={cx("comment-content-container")}>
              <div className={cx("username")}>Đình Duy</div>
              <div className={cx("comment-content")}>
                {comment.length > 300
                  ? showFullComment
                    ? comment
                    : comment.slice(0, 300)
                  : comment}
                {comment.length > 300 && !showFullComment && (
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
            <div
              className={cx("comment-reply")}
              onClick={() => setShowReplyComment(true)}
            >
              Reply
            </div>
          </div>
        </div>
      </div>

      <div className={cx("reply-comment")}>
        <ReplyComment />
        <ReplyComment />
        {showReplyComment && (
          <ReplyCommentInput showReplyComment={showReplyComment} />
        )}
      </div>
    </>
  );
}

export default Comment;
