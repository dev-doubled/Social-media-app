import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import ChooseProfilePicturePreview from "../ChooseProfilePicturePreview";
import styles from "./ChooseProfilePicture.module.scss";
const cx = classNames.bind(styles);
function ChooseProfilePicture({ setChooseProfilePicture, setAvatar }) {
  const fileAvatarImageRef = useRef();
  const [avatarImagePreview, setAvatarImagePreview] = useState(null);
  const [showChooseProfilePicturePreview, setShowChooseProfilePicturePreview] =
    useState(false);

  const handleClickAvatarImage = () => {
    fileAvatarImageRef.current.click();
  };
  const handlePreviewAvatarImage = (e) => {
    if (e.target.files.length === 1) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      if (avatarImagePreview) {
        URL.revokeObjectURL(avatarImagePreview);
      }
      setAvatarImagePreview(url);
      setShowChooseProfilePicturePreview(true);
    }
  };

  return (
    <>
      {showChooseProfilePicturePreview ? (
        <ChooseProfilePicturePreview
          avatarImagePreview={avatarImagePreview}
          setShowChooseProfilePicturePreview={
            setShowChooseProfilePicturePreview
          }
          setChooseProfilePicture={setChooseProfilePicture}
          setAvatar={setAvatar}
        />
      ) : (
        <div className={cx("choose-picture-wrapper")}>
          <div className={cx("choose-picture-container")}>
            <div className={cx("choose-picture-header")}>
              <div className={cx("empty")}></div>
              <div className={cx("title")}>Choose profile picture</div>
              <div
                className={cx("close")}
                onClick={() => setChooseProfilePicture(false)}
              >
                <i className={cx("fa-regular fa-xmark", "icon")}></i>
              </div>
            </div>
            <div className={cx("choose-picture-options")}>
              <div
                className={cx("option-main")}
                onClick={handleClickAvatarImage}
              >
                <i className={cx("fa-regular fa-plus", "icon")}></i>
                <div className={cx("text")}>Upload Photo</div>
                <input
                  ref={fileAvatarImageRef}
                  type="file"
                  accept="image/*"
                  className={cx("avatar-input")}
                  style={{ display: "none" }}
                  onChange={handlePreviewAvatarImage}
                />
              </div>
              <div className={cx("option")}>
                <i
                  className={cx("fa-sharp fa-solid fa-face-surprise", "icon")}
                ></i>
                <div className={cx("text")}>
                  Create an avatar profile picture
                </div>
              </div>
              <div className={cx("option-last")}>
                <i className={cx("fa-regular fa-crop-simple", "icon")}></i>
                <div className={cx("text")}>Add Frame</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChooseProfilePicture;
