import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import { BeatLoader } from "react-spinners";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "~/configs/firebase";
import ChooseProfilePicturePreview from "../ChooseProfilePicturePreview";
import styles from "./ChooseProfilePicture.module.scss";
const cx = classNames.bind(styles);
function ChooseProfilePicture({
  userData,
  setUserData,
  setChooseProfilePicture,
  setStatusData
}) {
  const fileAvatarImageRef = useRef();
  const [avatarImagePreview, setAvatarImagePreview] = useState(null);
  const [userAvatarSelected, setUserAvatarSelected] = useState(null);
  const [showChooseProfilePicturePreview, setShowChooseProfilePicturePreview] =
    useState(false);
  const [loadingUploadAvatar, setLoadingUploadAvatar] = useState(false);
  const handleClickAvatarImage = () => {
    fileAvatarImageRef.current.click();
  };
  const handlePreviewAvatarImage = async (e) => {
    setLoadingUploadAvatar(true);
    let file = null;
    let url = null;
    //Preview user avatar
    if (e.target.files.length === 1) {
      file = e.target.files[0];
      url = URL.createObjectURL(file);

      if (avatarImagePreview) {
        URL.revokeObjectURL(avatarImagePreview);
      }

      //Upload User Avatar to Firebase
      const userAvatarRef = ref(
        storage,
        `userAvatars/${userData.userId}/${file.name + v4()}`
      );
      try {
        await uploadBytes(userAvatarRef, file);
        const downloadURL = await getDownloadURL(userAvatarRef);
        setAvatarImagePreview(url);
        setUserAvatarSelected(downloadURL);
        setLoadingUploadAvatar(false);
        setShowChooseProfilePicturePreview(true);
        console.log("User avatar uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
  };

  return (
    <>
      {showChooseProfilePicturePreview ? (
        <ChooseProfilePicturePreview
          userData={userData}
          setUserData={setUserData}
          userAvatarSelected={userAvatarSelected}
          setUserAvatarSelected={setUserAvatarSelected}
          avatarImagePreview={avatarImagePreview}
          setShowChooseProfilePicturePreview={
            setShowChooseProfilePicturePreview
          }
          setChooseProfilePicture={setChooseProfilePicture}
          setStatusData={setStatusData}
        />
      ) : (
        <div className={cx("choose-picture-wrapper")}>
          <div className={cx("choose-picture-container")}>
            {loadingUploadAvatar && (
              <div className={cx("choose-picture-loading")}>
                <BeatLoader
                  size={10}
                  color="#0866ff"
                  className={cx("loading-spinner")}
                />
              </div>
            )}
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
            {!loadingUploadAvatar && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ChooseProfilePicture;
