import React from "react";
import classNames from "classnames/bind";
import styles from "./UserPageMore.module.scss";
const cx = classNames.bind(styles);
function UserPageMore() {
  return (
    <div className={cx("more-wrapper")}>
      <div className={cx("page-list")}>
        <div className={cx("page")}>Sports</div>
        <div className={cx("page")}>Music</div>
        <div className={cx("page")}>Movies</div>
        <div className={cx("page")}>TV shows</div>
        <div className={cx("page")}>Books</div>
        <div className={cx("page")}>Apps and games</div>
        <div className={cx("page")}>Likes</div>
        <div className={cx("page")}>Events</div>
      </div>
    </div>
  );
}

export default UserPageMore;
