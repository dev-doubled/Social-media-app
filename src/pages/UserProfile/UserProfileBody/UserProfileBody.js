import React, { useState } from "react";
import classNames from "classnames/bind";
import Intro from "~/components/User/UserBody/Intro";
import Photos from "~/components/User/UserBody/Photos";
import Friends from "~/components/User/UserBody/Friends";
import UserPostStatus from "~/components/User/UserBody/UserPostStatus";
import CreateStatus from "~/components/Status/CreateStatus";
import Status from "~/components/StatusPosting";
import styles from "./UserProfileBody.module.scss";
const cx = classNames.bind(styles);
function UserProfileBody() {
  const [showCreateStatus, setShowCreateStatus] = useState(false);
  return (
    <>
      {showCreateStatus && (
        <CreateStatus setOpenCreateStatus={setShowCreateStatus} />
      )}
      <div className={cx("user-profile-body-wrapper")}>
        <div className={cx("user-profile-body-container")}>
          <div className={cx("user-profile-left")}>
            <Intro />
            <Photos />
            <Friends />
          </div>
          <div className={cx("user-profile-right")}>
            <UserPostStatus setShowCreateStatus={setShowCreateStatus} />
            <Status />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileBody;
