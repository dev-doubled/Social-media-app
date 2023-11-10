import React from "react";
import classNames from "classnames/bind";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
function HeaderNav({ navigation }) {
  const location = useLocation();
  return (
    <div className={cx("header-nav")}>
      <div className={cx("header-nav-content")}>
        {navigation.map((navItem, index) => {
          const isActive = location.pathname === navItem.path;
          return (
            <NavLink
              to={navItem.path}
              className={cx(isActive ? "nav-item-active" : "nav-item")}
              key={index}
            >
              <i
                className={cx(
                  isActive ? navItem.activeIcon : navItem.icon,
                  "item-icon"
                )}
              ></i>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default HeaderNav;
