import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FriendsGrid.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
function Friend({ friend }) {
  const navigate = useNavigate();
  const [firstRender, setFirstRender] = useState(true);

  const handleClick = () => {
    if (firstRender) {
      window.scrollTo(0, 0);
      setFirstRender(false);
    } else {
      window.scrollTo(0, 300);
    }
    navigate("/user");
  };
  return (
    <Link className={cx("friend")} onClick={handleClick}>
      <div
        className={cx("friend-image")}
        style={{
          backgroundImage: `url(${friend.avatar})`,
        }}
      ></div>
      <div className={cx("friend-name")}>
        <span className={cx("name")}>{friend.name}</span>
      </div>
    </Link>
  );
}

export default Friend;
