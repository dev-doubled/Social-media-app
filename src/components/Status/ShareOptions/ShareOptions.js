import React from "react";
import classNames from "classnames/bind";
import styles from "./ShareOptions.module.scss";
const cx = classNames.bind(styles);
function ShareOptions() {
  const listOptions = [
    {
      icon: "fa-light fa-paper-plane-top",
      text: "Share now (Public)",
    },
    {
      icon: "fa-light fa-pen-to-square",
      text: "Share to Feed",
    },
    {
      icon: "fa-light fa-circle-plus",
      text: "Share to you story (Friends)",
    },
    {
      icon: "fa-light fa-comment",
      text: "Share in Messenger",
    },
    {
      icon: "fa-regular fa-circle-phone",
      text: "Share in WhatsApp",
    },
    {
      icon: "fa-light fa-flag",
      text: "Share to a Page",
    },
    {
      icon: "fa-light fa-users-medical",
      text: "Share to a group",
    },
    {
      icon: "fa-light fa-user-group",
      text: "Share on friend's profile",
    },
  ];
  return (
    <div className={cx("share-options-wrapper")}>
      <div className={cx("share-options-container")}>
        {listOptions.map((option, index) => (
          <div className={cx("option")} key={index}>
            <i className={cx(option.icon, "icon")}></i>
            <div className={cx("text")}>{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShareOptions;
