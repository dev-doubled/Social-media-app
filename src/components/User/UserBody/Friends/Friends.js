import classNames from "classnames/bind";
import FriendsGrid from "./FriendsGrid";
import styles from "./Friends.module.scss";
const cx = classNames.bind(styles);
function Friends() {
  return (
    <div className={cx("friends-wrapper")}>
      <div className={cx("friends-container")}>
        <div className={cx("main")}>
          <div className={cx("title")}>Friends</div>
          <div className={cx("see-more-friend")}>See all friends</div>
        </div>
        <FriendsGrid />
      </div>
    </div>
  );
}

export default Friends;
