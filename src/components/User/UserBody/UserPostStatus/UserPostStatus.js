import classNames from "classnames/bind";
import styles from "./UserPostStatus.module.scss";
import UserImg from "~/assets/images/user-default.png";

const cx = classNames.bind(styles);
function UserPostStatus({ openCreateStatus, statusText, userData }) {
  return (
    <div className={cx("user-post-status-wrapper")}>
      <div className={cx("user-post-status-container")}>
        <div className={cx("status-content")}>
          <div className={cx("user-avt")}>
            <img
              src={userData.userAvatar ? userData.userAvatar : UserImg}
              alt="user-img"
              className={cx("user-img")}
            />
          </div>
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

export default UserPostStatus;
