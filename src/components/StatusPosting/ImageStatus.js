import React from "react";
import classNames from "classnames/bind";
import styles from "./StatusPosting.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function ImageStatus({ images }) {
  return (
    <div className={cx("status-image")}>
      {images.map((image, index) => {
        const photoUrl = "/photo?psrc=" + encodeURIComponent(image);
        return (
          <Link to={photoUrl} key={index} className={cx("image-item")}>
            <img src={image} alt={`Img ${index}`} className={cx("image")} />
          </Link>
        );
      })}
    </div>
  );
}

export default ImageStatus;
