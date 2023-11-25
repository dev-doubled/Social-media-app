import React from "react";
import classNames from "classnames/bind";
import UserStory from "./UserStory";
import PostStatus from "./PostStatus";
import Status from "../../../components/StatusPosting";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);

function Content({ setOpenCreateStatus, statusText }) {
  return (
    <>
      <div className={cx("content-wrapper")}>
        <div className={cx("content-container")}>
          <UserStory />
          <PostStatus setOpenCreateStatus={setOpenCreateStatus} statusText={statusText} />
          <Status />
          <Status />
        </div>
      </div>
    </>
  );
}

export default Content;
