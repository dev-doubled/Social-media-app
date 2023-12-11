import React from "react";
import classNames from "classnames/bind";
import styles from "./EditDetail.module.scss";
const cx = classNames.bind(styles);
function EditDetail() {
  return (
    <div className={cx("edit-detail-wrapper")}>
      <div className={cx("edit-detail-container")}>
        <div className={cx("edit-detail-header")}>
          <div className={cx("empty")}></div>
          <div className={cx("title")}>Edit profile</div>
          <div className={cx("close")}>
            <i className={cx("fa-regular fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("edit-detail-content")}>
          <div className={cx("main-text")}>Customize your Intro</div>
          <div className={cx("sub-text")}>Details you select will be public.</div>
          <div className={cx("add-mobile-phone")}>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditDetail;
