import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import api from "~/services/apiService";
import ImageStatus from "./ImageStatus";
import ImageAvatarStatus from "./ImageAvatarStatus";
import ImageCoverStatus from "./ImageCoverStatus";
import Reactions from "~/components/Status/Reactions";
import ReactionUI from "./ReactionUI";
// import Comment from "~/components/Status/Comment";
import likeIcon from "~/assets/images/like.png";
import hahaIcon from "~/assets/images/haha.png";
import loveIcon from "~/assets/images/love.png";
import ShareOptions from "~/components/Status/ShareOptions";
import styles from "./StatusPosting.module.scss";
const cx = classNames.bind(styles);

function Status({ userData, data }) {
  const textareaRef = useRef(null);

  const [selectedReaction, setSelectedReaction] = useState(null);
  const [countReaction, setCountReaction] = useState(0);
  // const [countComment, setCountComment] = useState(0)

  const [commentContent, setCommentContent] = useState("");

  const [textareaRows, setTextareaRows] = useState(1);

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const validReactions = [
    "Like",
    "Love",
    "Care",
    "Haha",
    "Sad",
    "Wow",
    "Angry",
  ];

  useEffect(() => {
    api
      .get(`/post/get-reaction/${data._id}/${userData.userId}`)
      .then((response) => {
        if (response.data !== null) {
          setSelectedReaction(response.data.reaction);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data._id, userData.userId]);

  useEffect(() => {
    api
      .get(`/post/get-all-reaction/${data._id}`)
      .then((response) => {
        if (response.data !== null) {
          setCountReaction(response.data.reactions.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data._id]);

  useEffect(() => {
    let timeout;

    if (mouseIsOver) {
      timeout = setTimeout(() => {
        setShowReactions(true);
      }, 500);
    } else {
      clearTimeout(timeout);
      setShowReactions(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [mouseIsOver]);

  useEffect(() => {
    if (showFullComment) {
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
  }, [commentContent, showFullComment]);

  const getFormattedTimestamp = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
    });

    if (distance === "less than a minute ago") {
      return "few seconds ago";
    }
    return distance;
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const handleReactionClick = (reactionContent) => {
    setSelectedReaction(reactionContent);
    if (selectedReaction === null) {
      setCountReaction((prev) => prev + 1);
    }
    const reactionData = {
      userId: userData.userId,
      reaction: reactionContent,
    };
    callApiAddReaction(data._id, reactionData);
  };
  const handleDefaultClick = () => {
    if (validReactions.includes(selectedReaction)) {
      setSelectedReaction(null);
      setCountReaction(countReaction - 1);
      const reactionData = {
        userId: userData.userId,
        reaction: null,
      };
      api
        .post(`/post/add-reaction/${data._id}`, reactionData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSelectedReaction("Like");
      if (selectedReaction === null) {
        setCountReaction((prev) => prev + 1);
      }
      const reactionData = {
        userId: userData.userId,
        reaction: "Like",
      };
      callApiAddReaction(data._id, reactionData);
    }
  };
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
  const callApiAddReaction = (postId, reactionData) => {
    api
      .post(`/post/add-reaction/${postId}`, reactionData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("status-main")} onClick={() => setShowShare(false)}>
      <div className={cx("status-wrapper")}>
        {/*Status information*/}
        <div className={cx("status-main-header")}>
          <div className={cx("status-header")}>
            <Link to="">
              <img
                src={userData.userAvatar}
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
                  updated {userData.gender ? "his" : "her"} profile picture.
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
              <div className={cx("delete-status")}>
                <i className={cx("fa-regular fa-xmark", "icon")}></i>
              </div>
            </div>
          </div>
        </div>

        {/*Status caption*/}
        {data.caption && (
          <div className={cx("status-main-container")}>
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

        {/*Status image*/}
        {data.image && data.type === "normal" && (
          <ImageStatus image={data.image} />
        )}
        {data.image && data.type === "avatarImage" && (
          <ImageAvatarStatus
            image={data.image}
            coverImage={userData.coverPicture}
          />
        )}
        {data.image && data.type === "coverImage" && (
          <ImageCoverStatus image={data.image} />
        )}

        {/*Status reactions*/}
        {selectedReaction && (
          <div className={cx("reaction-comment")}>
            <div className={cx("reaction")}>
              {countReaction > 0 && (
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
              <div className={cx("reaction-count")}>
                {countReaction > 0 && countReaction}
              </div>
            </div>
            {/* <div className={cx("comment")}>22 comments</div> */}
          </div>
        )}

        {/*Status choose reactions*/}
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

            <div
              className={cx("comment")}
              onClick={() => setShowFullComment(true)}
            >
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
        {/*Status comment*/}
        <div className={cx("status-comment")}>
          <div className={cx("post-comment")}>
            <div className={cx("user-avt")}>
              <img
                src={userData.userAvatar}
                alt="avatar"
                className={cx("avatar")}
              />
            </div>

            {showFullComment ? (
              <div className={cx("input-comment-active")}>
                <textarea
                  className={cx("input-content")}
                  placeholder="Write a comment..."
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
            ) : (
              <div className={cx("input-comment")}>
                <div
                  className={cx("placeholder-input")}
                  onClick={() => setShowFullComment(true)}
                >
                  Write a comment...
                </div>
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
              </div>
            )}
          </div>
        </div>

        {/*Status comment list*/}
        <div className={cx("status-comment-list")}>
          {/* <Comment />
          <Comment /> */}
        </div>
      </div>
    </div>
  );
}

export default Status;
