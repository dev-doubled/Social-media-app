import React from "react";
import classNames from "classnames/bind";
import styles from "./StatusPopup.module.scss";
const cx = classNames.bind(styles);

function ImageCoverStatus({ image }) {
  return (
    <div className={cx("status-cover-image")}>
      <img src={image} alt="cover-img" className={cx("cover-img")} />
    </div>
  );
}

export default ImageCoverStatus;
