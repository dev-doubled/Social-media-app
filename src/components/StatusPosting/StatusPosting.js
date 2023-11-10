import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ImageStatus from "./ImageStatus";
import Reactions from "~/components/Status/Reactions";
import ReactionUI from "./ReactionUI";
import Comment from "~/components/Status/Comment";
import styles from "./StatusPosting.module.scss";
import userImg from "~/assets/images/user.jpg";
import likeIcon from "~/assets/images/like.png";
import hahaIcon from "~/assets/images/haha.png";
import loveIcon from "~/assets/images/love.png";
import ShareOptions from "~/components/Status/ShareOptions";
const cx = classNames.bind(styles);

const longContent = `DÒNG TIỀN ĐANG DẦN TRỞ LẠI THỊ TRƯỜNG CRYPTO? 
Theo dữ liệu của CoinShares, dòng tiền đầu tư các quỹ đổ vào thị trường crypto trong tuần qua đạt mức cao nhất kể từ tháng 07/2022 với hơn $326M
CoinShares cho biết rằng sự gia tăng này được thúc đẩy bởi sự lạc quan ngày càng gia tăng từ các nhà đầu tư rằng SEC có thể sớm phê duyệt quỹ Spot Bitcoin ETF.
Trong đó, Bitcoin chiếm 90%  tổng giá trị vốn đầu tư, lên đến $296 triệu USD. Đồng thời, dòng tiền cũng thể sự lạc quan với Altcoin, với gần 24 triệu USD đổ vào SOL và một số Altcoin khác như LTC, XRP, ADA,...
Tuy nhiên, sự lạc quan này không đến với ETH, với khoảng $6M outflow, nâng tổng số vốn rút khỏi ETH lên $10.7M, mặc dù thị trường đón nhận sự gia tăng dòng tiền tích cực trong thời gian qua
Mặc dù dòng tiền chảy vào thị trường trong tuần trước khá lớn nhưng dòng vốn vào hàng tuần này chỉ xếp thứ 21 lớn nhất trong lịch sử
Tuy vậy, có thể thấy rõ rằng dòng tiền đã bắt đầu có sự dịch chuyển và thị trường đã lạc quan hơn rất nhiều trong những ngày gần đây. Liệu đây sẽ là dấu hiệu tích cực sau một thời gian downtrend nhàm chán?
#HoangMinhThien #Crypto #BTC #Bitcoin`;

const images = [
  "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/398233135_1099222067741532_1150734091115644840_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZJN4nlLUp0AAX_p54FB&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfCNBAnmbm_1PDGjhTfwMnT5HeR_PZJDT201_lwzGuIxmA&oe=65493652",
];

function Status() {
  const textareaRef = useRef(null);
  const [showFullContent, setShowFullContent] = useState(false);

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const [showFullComment, setShowFullComment] = useState(false);

  const [commentContent, setCommentContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);

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
    setSelectedReaction(reactionContent);
  };
  const handleDefaultClick = () => {
    if (validReactions.includes(selectedReaction)) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction("Like");
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
  return (
    <div className={cx("status-main")} onClick={() => setShowShare(false)}>
      <div className={cx("status-wrapper")}>
        {/*Status information*/}
        <div className={cx("status-main-header")}>
          <div className={cx("status-header")}>
            <Link to="">
              <img src={userImg} alt="user-avt" className={cx("user-img")} />
            </Link>
            <div className={cx("user-information")}>
              <Link to="" className={cx("user-name")}>
                Dinh Duy
              </Link>
              <div className={cx("status-information")}>
                <div className={cx("status-time")}>2 hours ago</div>
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
        <div className={cx("status-main-container")}>
          <pre className={cx("status-caption")}>
            {longContent.length > 300
              ? showFullContent
                ? longContent
                : longContent.slice(0, 300)
              : longContent}
            {longContent.length > 300 && !showFullContent && (
              <>
                ....
                <button onClick={toggleContent} className={cx("see-more-btn")}>
                  See More
                </button>
              </>
            )}
          </pre>
        </div>

        {/*Status image*/}
        <ImageStatus images={images} />

        {/*Status reactions*/}
        <div className={cx("reaction-comment")}>
          <div className={cx("reaction")}>
            <div className={cx("reaction-icon")}>
              <img src={likeIcon} alt="like-icon" className={cx("icon-like")} />
              <img src={loveIcon} alt="like-icon" className={cx("icon-love")} />
              <img src={hahaIcon} alt="like-icon" className={cx("icon-haha")} />
            </div>
            <div className={cx("reaction-count")}>22</div>
          </div>
          <div className={cx("comment")}>22 comments</div>
        </div>

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
              <img src={userImg} alt="avatar" className={cx("avatar")} />
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
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Status;
