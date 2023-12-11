import React, { useState } from "react";
import classNames from "classnames/bind";
import { deleteObject, ref } from "firebase/storage";
import { BeatLoader } from "react-spinners";
import { storage } from "~/configs/firebase";
import styles from "./DiscardChange.module.scss";
const cx = classNames.bind(styles);

function DiscardChange({
  userAvatarSelected,
  setUserAvatarSelected,
  setShowDiscardChange,
  setShowChooseProfilePicturePreview,
}) {
  const [loadingDiscardChange, setLoadingDiscardChange] = useState(false);
  const handelDiscardChanges = async () => {
    setLoadingDiscardChange(true);
    //Handle delete in firebase
    try {
      // Extracting the image path from the URL
      const parsedUrl = new URL(userAvatarSelected);
      const pathWithoutLeadingSlash = parsedUrl.pathname.substring(1);
      const imagePath = pathWithoutLeadingSlash.split("o/")[1];
      const decodedImagePath = decodeURIComponent(imagePath);
      // Creating a reference to the image in Firebase Storage
      const imageToDeleteRef = ref(storage, decodedImagePath);
      // Deleting the image
      await deleteObject(imageToDeleteRef);
      // Update state or perform any additional actions after deletion
      setUserAvatarSelected(null);
      setLoadingDiscardChange(false);
      setShowChooseProfilePicturePreview(false);
      console.log("User avatar deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };
  return (
    <div className={cx("discard-wrapper")}>
      <div className={cx("discard-container")}>
        {loadingDiscardChange && (
          <div className={cx("discard-loading")}>
            <BeatLoader
              size={10}
              color="#0866ff"
              className={cx("loading-spinner")}
            />
          </div>
        )}
        <div className={cx("discard-header")}>
          <div className={cx("empty")}></div>
          <div className={cx("title")}>Discard changes</div>
          <div
            className={cx("close")}
            onClick={() => setShowDiscardChange(false)}
          >
            <i className={cx("fa-regular fa-xmark", "icon")}></i>
          </div>
        </div>
        {!loadingDiscardChange && (
          <div className={cx("discard-notification")}>
            Are you sure that you want to discard your changes?
          </div>
        )}
        {!loadingDiscardChange && (
          <div className={cx("discard-submit")}>
            <div className={cx("submit-button")}>
              <button
                className={cx("cancel-btn")}
                onClick={() => setShowDiscardChange(false)}
              >
                Cancel
              </button>
              <button
                className={cx("discard-btn")}
                onClick={handelDiscardChanges}
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscardChange;
