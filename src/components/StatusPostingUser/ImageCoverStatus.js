import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./StatusPostingUser.module.scss";
const cx = classNames.bind(styles);

function ImageCoverStatus({ image }) {
  const photoUrl = "/photo?psrc=" + encodeURIComponent(image);
  return (
    <Link to={photoUrl} className={cx("status-cover-image")}>
      <img src={image} alt="cover-img" className={cx("cover-img")} />
    </Link>
  );
}

export default ImageCoverStatus;
