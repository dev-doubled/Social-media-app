import React, { useEffect } from "react";
import classNames from "classnames/bind";
import Header from "~/layouts/Header";
import UserProfileTop from "./UserProfileTop";
import UserProfileBody from "./UserProfileBody";
import styles from "./UserProfile.module.scss";
const cx = classNames.bind(styles);
function UserProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={cx("user-profile-wrapper")}>
      <Header />
      <div className={cx("user-profile-container")}>
        <UserProfileTop />
        <UserProfileBody />
      </div>
    </div>
  );
}

export default UserProfile;
