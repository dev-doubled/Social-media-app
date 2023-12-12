import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames/bind";

import api from "~/services/apiService";
import ImageAvatarStatus from "./ImageAvatarStatus";
import ImageCoverStatus from "./ImageCoverStatus";
import ImageStatus from "./ImageStatus";
import ReactionUI from "../StatusPostingUser/ReactionUI";
import Reactions from "../Status/Reactions";
import Comment from "../Status/Comment";
import likeIcon from "~/assets/images/like.png";
import hahaIcon from "~/assets/images/haha.png";
import loveIcon from "~/assets/images/love.png";
import UserAvatarDefault from "~/assets/images/user-default.png";
import ShareOptions from "../Status/ShareOptions";

import styles from "./StatusPopup.module.scss";
const cx = classNames.bind(styles);

const validReactions = ["Like", "Love", "Care", "Haha", "Sad", "Wow", "Angry"];

function StatusPopup({
  closeStatusPopup,
  userData,
  userDataPosting,
  data,
  selectedReaction,
  setSelectedReaction,
  isSelectedReaction,
  setIsSelectedReaction,
  countReaction,
  setCountReaction,
  countReactionReload,
  countComment,
  setCountComment,
  listComments,
  setListComments,
}) {
  const textareaRef = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showShare, setShowShare] = useState(false);
  useEffect(() => {
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
  }, [commentContent]);
  useEffect(() => {
    let timeout;

    if (mouseIsOver) {
      timeout = setTimeout(() => {
        setShowReactions(true);
      }, 300);
    } else {
      clearTimeout(timeout);
      setShowReactions(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [mouseIsOver]);
  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleSendComment = () => {
    const commentData = {
      postID: data._id,
      author: {
        userId: userData.userId,
        userName: userData.surName + " " + userData.firstName,
        userAvatar: userData.userAvatar,
      },
      commentContent: commentContent,
    };
    api
      .post(`/comment/create`, commentData)
      .then((response) => {
        setCommentContent("");
        callApiGetAllComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const callApiGetAllComments = () => {
    api
      .get(`/comment/get-all-by-postId/${data._id}`)
      .then((response) => {
        setListComments(response.data);
        setCountComment((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const handleReactionClick = (reactionContent) => {
    setIsSelectedReaction(false);
    setSelectedReaction(reactionContent);
    const reactionData = {
      userId: userData.userId,
      reaction: reactionContent,
    };
    callApiAddReaction(data._id, reactionData);
  };
  const handleDefaultClick = () => {
    setIsSelectedReaction(false);
    if (validReactions.includes(selectedReaction)) {
      setSelectedReaction(null);

      if (countReaction > 0) {
        setCountReaction((prev) => prev - 1);
      }
      const reactionData = {
        userId: userData.userId,
        reaction: null,
      };
      api
        .post(`/post/add-reaction/${data._id}`, reactionData)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSelectedReaction("Like");
      const reactionData = {
        userId: userData.userId,
        reaction: "Like",
      };
      callApiAddReaction(data._id, reactionData);
    }
  };
  const getFormattedTimestamp = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
    });

    if (distance === "less than a minute ago") {
      return "few seconds ago";
    }
    return distance;
  };
  const callApiAddReaction = (postId, reactionData) => {
    api
      .post(`/post/add-reaction/${postId}`, reactionData)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("status-popup-wrapper")}>
      <div className={cx("status-popup-container")}>
        <div className={cx("status-header")}>
          <div className={cx("empty")}></div>
          <div className={cx("title")}>{data.author.userName}'s Post</div>
          <div
            className={cx("close-icon")}
            onClick={() => closeStatusPopup(false)}
          >
            <i className={cx("fa-light fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("status-content")}>
          <div className={cx("content-header")}>
            <Link to="">
              <img
                src={
                  data.author.userAvatar
                    ? data.author.userAvatar
                    : UserAvatarDefault
                }
                alt="user-avt"
                className={cx("user-img")}
              />
            </Link>
            <div className={cx("user-information")}>
              <Link to="" className={cx("user-name")}>
                {data.author.userName}{" "}
              </Link>
              {data.type === "avatarImage" && (
                <span className={cx("sub-user-name")}>
                  updated {userDataPosting.gender ? "his" : "her"} profile
                  picture.
                </span>
              )}
              {data.type === "coverImage" && (
                <span className={cx("sub-user-name")}>
                  updated {userDataPosting.gender ? "his" : "her"} cover photo.
                </span>
              )}
              <div className={cx("status-information")}>
                <div className={cx("status-time")}>
                  {getFormattedTimestamp(data.createdAt)}
                </div>
                <div className={cx("status-audience")}>
                  <i className={cx("fa-regular fa-earth-americas", "icon")}></i>
                </div>
              </div>
            </div>
            <div className={cx("options")}>
              <div className={cx("setting-status")}>
                <i className={cx("fa-regular fa-ellipsis", "icon")}></i>
              </div>
            </div>
          </div>
          {data.caption && (
            <div className={cx("content-main")}>
              <pre className={cx("status-caption")}>
                {data.caption.length > 300
                  ? showFullContent
                    ? data.caption
                    : data.caption.slice(0, 300)
                  : data.caption}
                {data.caption.length > 300 && !showFullContent && (
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
              </pre>
            </div>
          )}

          {data.image && data.type === "normal" && (
            <ImageStatus image={data.image} />
          )}

          {data.image && data.type === "avatarImage" && (
            <ImageAvatarStatus image={data.image} userId={data.author.userId} />
          )}

          {data.image && data.type === "coverImage" && (
            <ImageCoverStatus image={data.image} />
          )}

          {(selectedReaction || countComment > 0) && (
            <div className={cx("reaction-comment")}>
              <div className={cx("reaction")}>
                {(selectedReaction ||
                  countReactionReload > 0 ||
                  countReaction > 0) && (
                  <div className={cx("reaction-icon")}>
                    <img
                      src={likeIcon}
                      alt="like-icon"
                      className={cx("icon-like")}
                    />
                    <img
                      src={loveIcon}
                      alt="like-icon"
                      className={cx("icon-love")}
                    />
                    <img
                      src={hahaIcon}
                      alt="like-icon"
                      className={cx("icon-haha")}
                    />
                  </div>
                )}
                {selectedReaction ? (
                  <div className={cx("reaction-count")}>
                    You{" "}
                    {countReaction > 0 && (
                      <span>
                        {isSelectedReaction
                          ? (() => {
                              if (countReactionReload === 1) {
                                return ``;
                              } else if (countReactionReload === 2) {
                                return `& ${countReactionReload - 1} other`;
                              } else {
                                return `& ${countReactionReload - 1} others`;
                              }
                            })()
                          : (() => {
                              if (countReaction === 1) {
                                return `& ${countReaction} other`;
                              } else if (countReaction === 2) {
                                return `& ${countReaction} others`;
                              } else {
                                return `& ${countReaction} others`;
                              }
                            })()}
                      </span>
                    )}
                  </div>
                ) : (
                  countReactionReload > 0 && (
                    <div className={cx("reaction-count")}>
                      {isSelectedReaction ? countReactionReload : countReaction}
                    </div>
                  )
                )}
              </div>
              <div className={cx("comment")}>{countComment} comments</div>
            </div>
          )}
          <div className={cx("status-options-wrapper")}>
            <div className={cx("status-options")}>
              <div
                className={cx("like")}
                onMouseEnter={() => setMouseIsOver(true)}
                onMouseLeave={() => setMouseIsOver(false)}
                onClick={handleDefaultClick}
              >
                <ReactionUI reactionContent={selectedReaction} />

                {showReactions && (
                  <Reactions
                    setShowReactions={setShowReactions}
                    onReactionClick={handleReactionClick}
                  />
                )}
              </div>

              <div className={cx("comment")}>
                <i
                  className={cx(
                    "fa-light fa-comment fa-flip-horizontal",
                    "comment-icon"
                  )}
                ></i>
                <span className={cx("text")}>Comment</span>
              </div>

              <div
                className={cx("share")}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShare(!showShare);
                }}
              >
                <i className={cx("fa-light fa-paper-plane", "share-icon")}></i>
                <span className={cx("text")}>Share</span>
              </div>
            </div>
            {showShare && <ShareOptions />}
          </div>
          <div className={cx("status-comment-list")}>
            {listComments &&
              listComments.length > 0 &&
              listComments.map((comment) => (
                <Comment
                  key={comment._id}
                  userData={userData}
                  comment={comment}
                  setCountComment={setCountComment}
                />
              ))}
          </div>
        </div>
        <div className={cx("status-footer")}>
          <div className={cx("status-comment")}>
            <div className={cx("user-avt")}>
              <img
                src={
                  userData.userAvatar ? userData.userAvatar : UserAvatarDefault
                }
                alt="avatar"
                className={cx("avatar")}
              />
            </div>
            <div className={cx("input-comment-active")}>
              <textarea
                className={cx("input-content")}
                placeholder="Write a comment..."
                autoFocus={true}
                value={commentContent}
                rows={textareaRows}
                ref={textareaRef}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown}
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
                    commentContent !== ""
                      ? cx("send-btn-active")
                      : cx("send-btn")
                  }
                >
                  <button
                    className={cx("btn")}
                    disabled={commentContent === ""}
                    onClick={handleSendComment}
                  >
                    <i
                      className={cx("fa-solid fa-paper-plane-top", "icon")}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPopup;
