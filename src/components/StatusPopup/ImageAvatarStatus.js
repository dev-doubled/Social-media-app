import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import api from "~/services/apiService";
import styles from "./StatusPopup.module.scss";
const cx = classNames.bind(styles);

function ImageAvatarStatus({ image, userId }) {
  const [coverImage, setCoverImage] = useState("");
  useEffect(() => {
    api
      .get(`/user/get-cover-image/${userId}`)
      .then((response) => {
        setCoverImage(response.data.coverImage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
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
        <div className={cx("avatar-image")}>
          <img src={image} alt="avatar-img" className={cx("avatar-img")} />
        </div>
      </div>
    </div>
  );
}

export default ImageAvatarStatus;
