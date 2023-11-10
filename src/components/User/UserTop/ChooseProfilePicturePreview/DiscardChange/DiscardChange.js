import React from "react";
import classNames from "classnames/bind";
import styles from "./DiscardChange.module.scss";
const cx = classNames.bind(styles);

function DiscardChange({
  setShowDiscardChange,
  setShowChooseProfilePicturePreview,
  setChooseProfilePicture,
}) {
  return (
    <div className={cx("discard-wrapper")}>
      <div className={cx("discard-container")}>
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
        <div className={cx("discard-notification")}>
          Are you sure that you want to discard your changes?
        </div>
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
              onClick={() => {
                setShowChooseProfilePicturePreview(false);
                setChooseProfilePicture(false);
              }}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscardChange;
