import classNames from "classnames/bind";
import UserImg from "~/assets/images/user-default.png";
import styles from "./PostStatus.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function PostStatus({ openCreateStatus, statusText, userData }) {
  const url = "/profile?id=" + userData.userId;
  return (
    <div className={cx("post-status-wrapper")}>
      <div className={cx("post-status-container")}>
        <div className={cx("status-content")}>
          <Link to={url} className={cx("user-avt")}>
            <img
              src={userData.userAvatar ? userData.userAvatar : UserImg}
              alt="user-img"
              className={cx("user-img")}
            />
          </Link>
          <div
            className={cx("upload-status")}
            onClick={() => openCreateStatus()}
          >
            <div className={cx("status-text")}>
              {statusText === "" ? `What's on your mind?` : statusText}
            </div>
          </div>
        </div>
        <div className={cx("status-options")}>
          <div className={cx("option-list")}>
            <div className={cx("live-stream")}>
              <i className={cx("fa-solid fa-video", "icon")}></i>
              <span className={cx("text")}>Live video</span>
            </div>
            <div
              className={cx("photo-video")}
              onClick={() => openCreateStatus()}
            >
              <i className={cx("fa-regular fa-image", "icon")}></i>
              <span className={cx("text")}>Photo/video</span>
            </div>
            <div className={cx("feeling")}>
              <i className={cx("fa-regular fa-face-grin", "icon")}></i>
              <span className={cx("text")}>Feeling/activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostStatus;
