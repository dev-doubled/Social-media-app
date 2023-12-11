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
import Comment from "~/components/Status/Comment";
import StatusPopup from "../StatusPopup";
import UserAvatarDefault from "~/assets/images/user-default.png";
import likeIcon from "~/assets/images/like.png";
import hahaIcon from "~/assets/images/haha.png";
import loveIcon from "~/assets/images/love.png";
import ShareOptions from "~/components/Status/ShareOptions";
import styles from "./StatusPostingUser.module.scss";
const cx = classNames.bind(styles);

function Status({ userData, data, isOpenStatusPopup, setIsOpenStatusPopup }) {
  const textareaRef = useRef(null);
  const [userDataPosting, setUserDataPosting] = useState({});
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [isSelectedReaction, setIsSelectedReaction] = useState(false);
  const [countReaction, setCountReaction] = useState(0);
  const [countReactionReload, setCountReactionReload] = useState(0);
  const [listComments, setListComments] = useState([]);
  const [countComment, setCountComment] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [dataStatus, setDataStatus] = useState(null);

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

  const openStatusPopup = () => {
    setIsOpenStatusPopup(true);
    document.body.style.overflow = "hidden";
  };

  const closeStatusPopup = () => {
    setIsOpenStatusPopup(false);
    document.body.style.overflow = "auto";
  };

  //Get user-posting information
  useEffect(() => {
    api
      .get(`/user/info/${data.author.userId}`)
      .then((response) => {
        setUserDataPosting(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data.author.userId]);

  //Get reaction for post follow userId
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

  //Get numbers of reactions
  useEffect(() => {
    setCountReaction(0);
    setIsSelectedReaction(false);
    api
      .get(`/post/get-all-reaction/${data._id}`)
      .then((response) => {
        const count = response.data.reactions.length;
        setCountReaction(count);
        setCountReactionReload(count);
        setIsSelectedReaction(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data._id]);

  //Get all comments follow postId
  useEffect(() => {
    api
      .get(`/comment/get-all-by-postId/${data._id}`)
      .then(async (response) => {
        const comments = response.data;

        const countTopLevelComments = comments.length;

        let countReplyComments = 0;

        // Function to fetch and count reply comments
        const fetchAndCountReplies = async (commentId) => {
          try {
            const replyResponse = await api.get(
              `/replyComment/get-all-reply/${commentId}`
            );
            const replyComments = replyResponse.data;
            countReplyComments += replyComments.length;
          } catch (error) {
            console.error(
              `Error fetching replies for comment ${commentId}:`,
              error
            );
          }
        };

        // Create an array of promises for each fetchAndCountReplies call
        const fetchPromises = comments.map((comment) =>
          fetchAndCountReplies(comment._id)
        );

        // Wait for all promises to resolve
        await Promise.all(fetchPromises);

        const totalCountComments = countTopLevelComments + countReplyComments;
        setListComments(comments);
        setCountComment(totalCountComments);
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

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleReactionClick = (reactionContent) => {
    setIsSelectedReaction(false);
    setSelectedReaction(reactionContent);
    // setCountReaction((prev) => prev + 1);
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
      // setCountReaction((prev) => prev + 1);
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };
  const callApiAddReaction = (postId, reactionData) => {
    api
      .post(`/post/add-reaction/${postId}`, reactionData)
      .then((response) => {})
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
  // const callApiToGetCommentLength = () => {
  //   api
  //     .get(`/post/get-all-reaction/${data._id}`)
  //     .then((response) => {
  //       const count = response.data.reactions.length;
  //       setCountReaction(count);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const getFormattedTimestamp = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
    });

    if (distance === "less than a minute ago") {
      return "few seconds ago";
    }
    return distance;
  };
  const handleDataStatus = (dataStatus) => {
    setDataStatus(dataStatus);
    openStatusPopup();
  };
  return (
    <>
      {isOpenStatusPopup && dataStatus && (
        <StatusPopup
          userData={userData}
          userDataPosting={userDataPosting}
          data={dataStatus}
          closeStatusPopup={closeStatusPopup}
          selectedReaction={selectedReaction}
          setSelectedReaction={setSelectedReaction}
          isSelectedReaction={isSelectedReaction}
          setIsSelectedReaction={setIsSelectedReaction}
          countReaction={countReaction}
          setCountReaction={setCountReaction}
          countReactionReload={countReactionReload}
          countComment={countComment}
          setCountComment={setCountComment}
          listComments={listComments}
          setListComments={setListComments}
        />
      )}
      <div className={cx("status-main")} onClick={() => setShowShare(false)}>
        <div className={cx("status-wrapper")}>
          {/*Status information*/}
          <div className={cx("status-main-header")}>
            <div className={cx("status-header")}>
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
                    updated {userDataPosting.gender ? "his" : "her"} profile picture.
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
                    <i
                      className={cx("fa-regular fa-earth-americas", "icon")}
                    ></i>
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
            <ImageAvatarStatus image={data.image} userId={data.author.userId} />
          )}
          {data.image && data.type === "coverImage" && (
            <ImageCoverStatus image={data.image} />
          )}

          {/*Status reactions*/}
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
                    countReaction={countReaction}
                    setCountReaction={setCountReaction}
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

          {/*View more comments*/}
          {listComments && listComments.length > 1 && (
            <div
              className={cx("view-more-comment")}
              onClick={() => {
                handleDataStatus(data);
              }}
            >
              View more comments
            </div>
          )}

          {/*Status comment list*/}
          <div className={cx("status-comment-list")}>
            {listComments &&
              listComments.length > 0 &&
              listComments
                .slice(0, 1)
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    userData={userData}
                    comment={comment}
                    setCountComment={setCountComment}
                  />
                ))}
          </div>

          {/*Status comment action*/}
          <div className={cx("status-comment")}>
            <div className={cx("post-comment")}>
              <div className={cx("user-avt")}>
                <img
                  src={
                    userData.userAvatar
                      ? userData.userAvatar
                      : UserAvatarDefault
                  }
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
        </div>
      </div>
    </>
  );
}

export default Status;
