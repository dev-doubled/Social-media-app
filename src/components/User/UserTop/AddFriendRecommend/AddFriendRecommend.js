import React from "react";
import classNames from "classnames/bind";
import friendImg from "~/assets/images/friend.svg";
import styles from "./AddFriendRecommend.module.scss";
const cx = classNames.bind(styles);
function AddFriendRecommend() {
  return (
    <div className={cx("add-friend-rec-content")}>
      <div className={cx("image-default")}>
        <img src={friendImg} alt="img-default" className={cx("img")} />
      </div>
      <div className={cx("main-text")}>
        Add more friends to get recommendations
      </div>
      <div className={cx("sub-text")}>
        When you add some more friends, you'll see a list of people that you may
        know here.
      </div>
    </div>
  );
}

export default AddFriendRecommend;
