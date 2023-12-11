import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./UserAvatarOptions.module.scss";
const cx = classNames.bind(styles);
function UserAvatarOptions({ setChooseProfilePicture, image }) {
  const photoUrl = '/photo?psrc=' + encodeURIComponent(image);
  return (
    <div className={cx("avatar-options-wrapper")}>
      <div className={cx("avatar-options-container")}>
        <Link to={photoUrl} className={cx("avatar-option-link")}>
          <i className={cx("fa-light fa-square-user", "icon")}></i>
          <div className={cx("text")}>See profile picture</div>
        </Link>
        <div
          className={cx("avatar-option")}
          onClick={() => setChooseProfilePicture(true)}
        >
          <i className={cx("fa-light fa-images", "icon")}></i>
          <div className={cx("text")}>Choose profile picture</div>
        </div>
        <div className={cx("avatar-option")}>
          <i className={cx("fa-sharp fa-light fa-face-smile", "icon")}></i>
          <div className={cx("text")}>Create avatar profile picture</div>
        </div>
      </div>
    </div>
  );
}

export default UserAvatarOptions;
