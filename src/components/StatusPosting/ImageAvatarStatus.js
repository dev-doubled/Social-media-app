import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./StatusPosting.module.scss";
const cx = classNames.bind(styles);

function ImageAvatarStatus({ image, coverImage }) {
  const photoUrl = "/photo?psrc=" + encodeURIComponent(image);
  return (
    <div className={cx("status-avatar-image")}>
      {coverImage ? (
        <div className={cx("status-cover")}>
          <img src={coverImage} alt="cover-img" className={cx("cover-img")} />
        </div>
      ) : (
        <div className={cx("status-cover-default")}></div>
      )}

      <div className={cx("status-avatar")}>
        <Link to={photoUrl} className={cx("avatar-image")}>
          <img src={image} alt="avatar-img" className={cx("avatar-img")} />
        </Link>
      </div>
    </div>
  );
}

export default ImageAvatarStatus;
