import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
function HeaderNav({ navigation, setShowLeavePage, setTypeLeavePage }) {
  const location = useLocation();
  return (
    <div className={cx("header-nav")}>
      <div className={cx("header-nav-content")}>
        {navigation.map((navItem, index) => {
          const isActive = location.pathname === navItem.path;
          return (
            <HeaderNavItem
              key={index}
              navItem={navItem}
              isActive={isActive}
              setShowLeavePage={setShowLeavePage}
              setTypeLeavePage={setTypeLeavePage}
            />
          );
        })}
      </div>
    </div>
  );
}

function HeaderNavItem({
  navItem,
  isActive,
  setShowLeavePage,
  setTypeLeavePage,
}) {
  const navigate = useNavigate();
  const handleChooseItem = (path) => {
    const postDataUser = JSON.parse(localStorage.getItem("postContentUser"));
    const postImageUser = JSON.parse(localStorage.getItem("postImageUser"));
    const postImageSaveUser = JSON.parse(
      localStorage.getItem("postImageSaveUser")
    );
    if (postDataUser || postImageUser || postImageSaveUser) {
      setShowLeavePage(true);
      setTypeLeavePage(path);
    } else {
      navigate(path)
    }
  };

  return (
    <div
      className={cx(isActive ? "nav-item-active" : "nav-item")}
      onClick={() => handleChooseItem(navItem.path)}
    >
      <i
        className={cx(
          isActive ? navItem.activeIcon : navItem.icon,
          "item-icon"
        )}
      ></i>
    </div>
  );
}

export default HeaderNav;
