import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./LeftSideBar.module.scss";

import userImg from "~/assets/images/1.png";
import groupImg from "~/assets/images/2.png";
import marketImg from "~/assets/images/3.png";
import watchImg from "~/assets/images/4.png";
import memoImg from "~/assets/images/5.png";
import eventImg from "~/assets/images/6.png";
import gameImg from "~/assets/images/7.png";
import galleryImg from "~/assets/images/8.png";
import videoImg from "~/assets/images/9.png";
import messImg from "~/assets/images/10.png";
import GroupImg from "~/assets/images/group.jpg";
import Group_1Img from "~/assets/images/group_1.jpg";
import Group_3Img from "~/assets/images/group_3.jpg";
import Group_4Img from "~/assets/images/group_4.jpg";
import Group_5Img from "~/assets/images/group_5.jpg";

import UserImg from "~/assets/images/user.jpg";
const cx = classNames.bind(styles);

const menu = [
  {
    title: "Friends",
    image: userImg,
    path: "",
  },
  {
    title: "Groups",
    image: groupImg,
    path: "",
  },
  {
    title: "Marketplace",
    image: marketImg,
    path: "",
  },
  {
    title: "Watch",
    image: watchImg,
    path: "",
  },
  {
    title: "Memories",
    image: memoImg,
    path: "",
  },
];

const shortcuts = [
  {
    title: "Events",
    image: eventImg,
    path: "",
  },
  {
    title: "Play games",
    image: gameImg,
    path: "",
  },
  {
    title: "Gallery",
    image: galleryImg,
    path: "",
  },
  {
    title: "Video",
    image: videoImg,
    path: "",
  },
  {
    title: "Message",
    image: messImg,
    path: "",
  },
];

const groups = [
  {
    title: "Bộ Tộc MixiGaming",
    image: GroupImg,
    path: "",
  },
  {
    title: "Tổ Rắn",
    image: Group_1Img,
    path: "",
  },
  {
    title: "Nhà Khoa Học",
    image: Group_3Img,
    path: "",
  },
  {
    title: "Tổ Nhím",
    image: Group_5Img,
    path: "",
  },
  {
    title: "Dev Gang",
    image: Group_4Img,
    path: "",
  },
]

function LeftSideBar() {
  const [toggleSeeMore, setToggleSerMore] = useState(false);
  const [titleToggle, setTitleToggle] = useState("See more");
  const [iconToggle, setIconToggle] = useState("fa-solid fa-chevron-down");
  const [menuDefault, setMenuDefault] = useState(menu);
  const [scrolling, setScrolling] = useState(false);

  const handleSeeMore = () => {
    setScrolling(!scrolling);
    if (!toggleSeeMore) {
      setMenuDefault([...menu, ...shortcuts]);
      setTitleToggle("See less");
      setIconToggle("fa-solid fa-chevron-up");
    } else {
      setMenuDefault(menu);
      setTitleToggle("See more");
      setIconToggle("fa-solid fa-chevron-down");
    }
    setToggleSerMore(!toggleSeeMore);
  };
  return (
    <>
      <div className={cx("left-side-bar-wrapper")}>
        <div className={cx("left-side-bar-container")}>
          <div className={scrolling ? cx("user-scroll") : cx("user")}>
            <Link to="/profile" className={cx("user-info")}>
              <img
                src={UserImg}
                alt="user-avt"
                className={cx("user-avt")}
              />
              <div className={cx("username")}>Dev DoubleD</div>
            </Link>
          </div>
          <div className={cx("menu")}>
            {menuDefault.map((menuItem, index) => (
              <div
                className={scrolling ? cx("item-menu-scroll") : cx("item-menu")}
                key={index}
              >
                <Link to={menuItem.path} className={cx("item")}>
                  <img
                    src={menuItem.image}
                    alt="menu-item-img"
                    className={cx("menu-item-img")}
                  />
                  <div className={cx("menu-item-title")}>{menuItem.title}</div>
                </Link>
              </div>
            ))}
            <div
              className={scrolling ? cx("item-menu-scroll") : cx("item-menu")}
            >
              <div className={cx("see-more")} onClick={handleSeeMore}>
                <div className={cx("see-more-icon")}>
                  <i className={cx(iconToggle, "icon-down")}></i>
                </div>
                <div className={cx("see-more-title")}>{titleToggle}</div>
              </div>
            </div>
          </div>
          <div className={cx("line")}>
            <hr />
          </div>
          <div className={cx("shortcut")}>
            <div className={cx("title")}>Your shortcuts</div>
            <div className={cx("shortcut-menu")}>
              {groups.map((shortcut, index) => (
                <div
                  className={
                    scrolling ? cx("item-menu-scroll") : cx("item-menu")
                  }
                  key={index}
                >
                  <Link to={shortcut.path} className={cx("item")}>
                    <img
                      src={shortcut.image}
                      alt="menu-item-img"
                      className={cx("menu-item-img")}
                    />
                    <div className={cx("menu-item-title")}>
                      {shortcut.title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSideBar;
