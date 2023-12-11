import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { BeatLoader } from "react-spinners";
import api from "~/services/apiService";
import DiscardChange from "./DiscardChange";
import styles from "./ChooseProfilePicturePreview.module.scss";
const cx = classNames.bind(styles);
function ChooseProfilePicturePreview({
  userData,
  setUserData,
  userAvatarSelected,
  setUserAvatarSelected,
  avatarImagePreview,
  setShowChooseProfilePicturePreview,
  setChooseProfilePicture,
  setStatusData,
}) {
  const textareaRef = useRef(null);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [countLengthDesc, setCountLengthDesc] = useState(0);
  const [showDiscardChange, setShowDiscardChange] = useState(false);
  const [loadingSaveChange, setLoadingSaveChange] = useState(false);

  useEffect(() => {
    // Automatically resize the textarea when the content is changed
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    // Calculate the number of rows based on scrollHeight and clientHeight
    const extraLines =
      (textareaRef.current.scrollHeight - textareaRef.current.clientHeight) /
      20;
    const calculatedRows = Math.max(1, Math.ceil(extraLines));
    setTextareaRows(calculatedRows);
  }, [descriptionContent]);

  const handleContentChange = (e) => {
    setDescriptionContent(e.target.value);
    setCountLengthDesc(e.target.value.length);
  };

  const handleSaveChooseProfile = () => {
    setLoadingSaveChange(true);
    const postData = {
      type: "avatarImage",
      author: {
        userId: userData.userId,
        userName: userData.surName + " " + userData.firstName,
        userAvatar: userData.userAvatar,
      },
      caption: descriptionContent,
      image: userAvatarSelected,
    };
    const uploadUserAvatarData = {
      userId: userData.userId,
      userAvatar: userAvatarSelected,
    };
    //Handle upload user avatar
    api
      .post("/post/create", postData)
      .then((response) => {
        api
          .post("/user/update-user-avatar", uploadUserAvatarData)
          .then((response) => {
            setUserData(response.data);
            setShowChooseProfilePicturePreview(false);
            setChooseProfilePicture(false);
            callApiGetAllPost();
            // window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callApiGetAllPost = () => {
    api
      .get(`/post/get-all-by-user/${userData.userId}`)
      .then((response) => {
        setStatusData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {showDiscardChange && (
        <DiscardChange
          userAvatarSelected={userAvatarSelected}
          setUserAvatarSelected={setUserAvatarSelected}
          setShowDiscardChange={setShowDiscardChange}
          setShowChooseProfilePicturePreview={
            setShowChooseProfilePicturePreview
          }
        />
      )}
      <div className={cx("choose-picture-preview-wrapper")}>
        <div className={cx("choose-picture-preview-container")}>
          {loadingSaveChange && (
            <div className={cx("choose-picture-preview-loading")}>
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
              onClick={() => {
                setShowDiscardChange(true);
              }}
            >
              <i className={cx("fa-regular fa-xmark", "icon")}></i>
            </div>
          </div>
          <div className={cx("status-profile-picture")}>
            <div className={cx("input-status-profile")}>
              <textarea
                className={cx("input-content")}
                placeholder="Description"
                onChange={handleContentChange}
                value={descriptionContent}
                rows={textareaRows}
                ref={textareaRef}
                maxLength={200}
              ></textarea>
            </div>
            <div className={cx("count-length")}>{countLengthDesc}/200</div>
          </div>
          <div className={cx("profile-picture-upload")}>
            <img
              src={avatarImagePreview}
              alt="profile-pic"
              className={cx("profile-picture")}
            />
          </div>
          <div className={cx("sub-status-profile")}>
            <i className={cx("fa-solid fa-earth-americas", "icon")}></i>
            <div className={cx("text")}>Your profile picture is public.</div>
          </div>
          <div className={cx("picture-profile-submit")}>
            <div className={cx("btn-submit")}>
              <button
                className={cx("cancel-btn")}
                onClick={() => setShowDiscardChange(true)}
              >
                Cancel
              </button>
              <button
                className={cx("save-btn")}
                onClick={handleSaveChooseProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseProfilePicturePreview;
