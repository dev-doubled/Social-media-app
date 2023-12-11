import classNames from "classnames/bind";
import { formatDistanceStrict } from "date-fns";
import { useState } from "react";
import styles from "./ReplyComment.module.scss";
const cx = classNames.bind(styles);

function ReplyComment({ replyComment }) {
  const [showFullReplyComment, setShowFullReplyComment] = useState(false);
  const toggleContent = () => {
    setShowFullReplyComment(!showFullReplyComment);
  };
  const getFormattedTimestamp = (createdAt) => {
    const distance = formatDistanceStrict(new Date(createdAt), new Date(), {
      addSuffix: true,
    });
    const match = distance.match(/(\d+) (\w+)/);
    if (!match) {
      return distance;
    }
    const [, value, unit] = match;
    switch (unit) {
      case "less":
        return "1s";
      case "seconds":
        return value === "1" ? "1s" : `${value}s`;
      case "minute":
        return value === "1" ? "1m" : `${value}m`;
      case "minutes":
        return `${value}m`;
      case "hour":
        return value === "1" ? "1h" : `${value}h`;
      case "hours":
        return value === "1" ? "1h" : `${value}h`;
      case "day":
        return value === "1" ? "1d" : `${value}d`;
      case "days":
        return value === "1" ? "1d" : `${value}d`;
      case "month":
        return value === "1" ? "1mo" : `${value}mo`;
      case "months":
        return value === "1" ? "1mo" : `${value}mo`;
      case "year":
        return value === "1" ? "1y" : `${value}y`;
      case "years":
        return value === "1" ? "1y" : `${value}y`;
      default:
        return distance;
    }
  };

  return (
    <div className={cx("reply-comment")}>
      <div className={cx("user-avatar")}>
        <img
          src={replyComment.author.userAvatar}
          alt="user-avt"
          className={cx("avt")}
        />
      </div>
      <div className={cx("comment-content-wrapper")}>
        <div className={cx("main-comment")}>
          <div className={cx("comment-content-container")}>
            <div className={cx("username")}>{replyComment.author.userName}</div>
            <div className={cx("comment-content")}>
              {replyComment.replyContent.length > 200
                ? showFullReplyComment
                  ? replyComment.replyContent
                  : replyComment.replyContent.slice(0, 200)
                : replyComment.replyContent}
              {replyComment.replyContent.length > 200 &&
                !showFullReplyComment && (
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
          <div className={cx("comment-time")}>{getFormattedTimestamp(replyComment.createdAt)}</div>
          <div className={cx("comment-reaction")}>Like</div>
          <div className={cx("comment-reply")}>Reply</div>
        </div>
      </div>
    </div>
  );
}

export default ReplyComment;
