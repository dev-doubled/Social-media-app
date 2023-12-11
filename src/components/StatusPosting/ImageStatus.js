import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./StatusPosting.module.scss";
const cx = classNames.bind(styles);

function ImageStatus({ image }) {
  const photoUrl = "/photo?psrc=" + encodeURIComponent(image);
  return (
    <div className={cx("status-image")}>
      <Link to={photoUrl} className={cx("image-item")}>
        <img src={image} alt="status-img" className={cx("image")} />
      </Link>
    </div>
  );
}

export default ImageStatus;
