import React from "react";
import classNames from "classnames/bind";
import styles from "./UserPageOptions.module.scss";
const cx = classNames.bind(styles);
const options = [
  {
    icon: "fa-sharp fa-regular fa-eye",
    text: "View As",
  },
  {
    icon: "fa-regular fa-magnifying-glass",
    text: "Search",
  },
  {
    icon: "fa-regular fa-triangle-exclamation",
    text: "Profile Status",
  },
  {
    icon: "fa-regular fa-box-archive",
    text: "Archive",
  },
  {
    icon: "fa-regular fa-timer",
    text: "Story archive",
  },
  {
    icon: "fa-regular fa-list",
    text: "Activity log",
  },
  {
    icon: "fa-regular fa-user-gear",
    text: "Profile and tagging settings",
  },
];
function UserPageOptions() {
  return (
    <div className={cx("page-options-dropdown-wrapper")}>
      <div className={cx("page-options-dropdown-container")}>
        {options.map((option, index) => (
          <div className={cx("page-option-item")} key={index}>
            <i className={cx(option.icon, "icon")}></i>
            <div className={cx("text")}>{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPageOptions;
