import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import styles from "./Header.module.scss";
import UserImg from "~/assets/images/user.jpg";

const cx = classNames.bind(styles);

const navigation = [
  {
    path: "/",
    activeIcon: "fa-solid fa-house",
    icon: "fa-light fa-house",
  },
  {
    path: "/watch",
    activeIcon: "fa-solid fa-clapperboard-play",
    icon: "fa-light fa-clapperboard-play",
  },
  {
    path: "/marketplace",
    activeIcon: "fa-solid fa-store",
    icon: "fa-light fa-store",
  },
  {
    path: "/groups",
    activeIcon: "fa-solid fa-users",
    icon: "fa-light fa-users",
  },
  {
    path: "/gaming",
    activeIcon: "fa-solid fa-gamepad",
    icon: "fa-light fa-gamepad",
  },
];

function Header() {
  return (
    <>
      <div className={cx("header-container")}>
        <div className={cx("header-search")}>
          <Link to="/">
            <i className={cx("fa-brands fa-facebook", "logo-icon")}></i>
          </Link>
          <div className={cx("search-container")}>
            <i
              className={cx("fa-regular fa-magnifying-glass", "search-icon")}
            ></i>
            <div className={cx("search-input")}>
              <input
                type="text"
                className={cx("input-search")}
                placeholder="Search Facebook"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
        <HeaderNav navigation={navigation} />
        <div className={cx("header-options")}>
          <div className={cx("grid-option")}>
            <i className={cx("fa-solid fa-grid", "grid-icon")}></i>
          </div>
          <div className={cx("messenger")}>
            <i
              className={cx("fa-brands fa-facebook-messenger", "mess-icon")}
            ></i>
          </div>
          <div className={cx("notification")}>
            <i className={cx("fa-solid fa-bell", "bell-icon")}></i>
          </div>
          <div className={cx("user")}>
            <div className={cx("user-profile")}>
              <img src={UserImg} alt="user-avt" className={cx("user-avt")} />
            </div>
            <i className={cx("fa-solid fa-chevron-down", "dropdown-icon")}></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
