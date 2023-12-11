import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";
import api from "~/services/apiService";
import ReplyCommentInput from "./ReplyCommentInput";
import ReplyComment from "./ReplyComment";
import userImg from "~/assets/images/user-default.png";
import styles from "./Comment.module.scss";
const cx = classNames.bind(styles);

function Comment({ userData, comment, setCountComment }) {
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);
  const [listReplyComments, setListReplyComments] = useState([]);
  const [showAllReplyComments, setShowAllReplyComments] = useState(false);

  useEffect(() => {
    api
      .get(`/replyComment/get-all-reply/${comment._id}`)
      .then((response) => {
        setListReplyComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comment._id]);

  const toggleContent = () => {
    setShowFullComment(!showFullComment);
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

  const handleViewAllReply = () => {
    setShowAllReplyComments(true);
  };
  return (
    <>
      <div className={cx("comment")}>
        <div className={cx("user-avatar")}>
          <img
            src={
              comment.author.userAvatar ? comment.author.userAvatar : userImg
            }
            alt="user-avt"
            className={cx("avt")}
          />
        </div>
        <div className={cx("comment-content-wrapper")}>
          <div className={cx("main-comment")}>
            <div className={cx("comment-content-container")}>
              <div className={cx("username")}>{comment.author.userName}</div>
              <div className={cx("comment-content")}>
                {comment.commentContent.length > 300
                  ? showFullComment
                    ? comment.commentContent
                    : comment.commentContent.slice(0, 300)
                  : comment.commentContent}
                {comment.commentContent.length > 300 && !showFullComment && (
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
            <div className={cx("comment-time")}>
              {getFormattedTimestamp(comment.createdAt)}
            </div>
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
        {showAllReplyComments === false &&
          listReplyComments &&
          listReplyComments.length > 0 &&
          listReplyComments
            .slice(0, 1)
            .map((replyComment) => (
              <ReplyComment
                key={replyComment._id}
                replyComment={replyComment}
              />
            ))}

        {showAllReplyComments === false && listReplyComments.length > 1 && (
          <div className={cx("view-all-reply")} onClick={handleViewAllReply}>
            <i className={cx("fa-regular fa-comment-dots", "icon")}></i>
            <span className={cx("text")}>
              View all {listReplyComments.length} replies
            </span>
          </div>
        )}

        {showAllReplyComments &&
          listReplyComments &&
          listReplyComments.length > 0 &&
          listReplyComments.map((replyComment) => (
            <ReplyComment key={replyComment._id} replyComment={replyComment} />
          ))}

        {showReplyComment && (
          <ReplyCommentInput
            comment={comment}
            userData={userData}
            showReplyComment={showReplyComment}
            setListReplyComments={setListReplyComments}
            setCountComment={setCountComment}
          />
        )}
      </div>
    </>
  );
}

export default Comment;
