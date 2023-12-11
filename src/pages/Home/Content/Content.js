import React from "react";
import classNames from "classnames/bind";
import UserStory from "./UserStory";
import PostStatus from "./PostStatus";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);

function Content({ openCreateStatus, statusText, userData }) {
  return (
    <>
      <div className={cx("content-wrapper")}>
        <div className={cx("content-container")}>
          <UserStory userData={userData}/>
          <PostStatus
            openCreateStatus={openCreateStatus}
            statusText={statusText}
            userData={userData}
          />
        </div>
      </div>
    </>
  );
}

export default Content;
