import classNames from "classnames/bind";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "~/assets/images/logo.png";
import UserImg from "~/assets/images/user-default.png";
import { AuthContext } from "~/contexts/AuthContext";
import TokenService from "~/services/tokenServices";
import styles from "./Header.module.scss";
import HeaderNav from "./HeaderNav";

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

function Header({
  onLogout,
  setIsLoginFail,
  setShowLeavePage,
  setTypeLeavePage,
  isEditProfileOpen,
  isOpenCreateStatus,
  isOpenCreateStatusUser,
  isOpenStatusPopup,
}) {
  const navigate = useNavigate();
  const { userData, loading, logout } = useContext(AuthContext);
  const handleClickLogo = () => {
    const postDataUser = JSON.parse(localStorage.getItem("postContentUser"));
    const postImageUser = JSON.parse(localStorage.getItem("postImageUser"));
    const postImageSaveUser = JSON.parse(
      localStorage.getItem("postImageSaveUser")
    );
    if (postDataUser || postImageUser || postImageSaveUser) {
      setShowLeavePage(true);
      setTypeLeavePage("/");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      {!loading && (
        <div className={cx("header-container")}>
          <div className={cx("header-search")}>
            <div onClick={handleClickLogo} className={cx("header-logo")}>
              <img src={Logo} alt="logo" className={cx("logo")} />
            </div>
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
          <HeaderNav
            navigation={navigation}
            setShowLeavePage={setShowLeavePage}
            setTypeLeavePage={setTypeLeavePage}
          />
          <div
            className={cx(
              "header-options",
              (isEditProfileOpen ||
                isOpenCreateStatus ||
                isOpenCreateStatusUser ||
                isOpenStatusPopup) &&
                "header-options-edit"
            )}
          >
            <div className={cx("grid-option")}>
              <i className={cx("fa-solid fa-grid", "grid-icon")}></i>
            </div>
            <div className={cx("messenger")}>
              <i
                className={cx("fa-brands fa-facebook-messenger", "mess-icon")}
              ></i>
            </div>
            <div
              className={cx("notification")}
              onClick={() => console.log(userData)}
            >
              <i className={cx("fa-solid fa-bell", "bell-icon")}></i>
            </div>
            <div
              className={cx("user")}
              onClick={() => {
                onLogout();
                logout();
                setIsLoginFail(false);
                TokenService.removeTokens();
              }}
            >
              <div className={cx("user-profile")}>
                <img
                  src={userData.userAvatar ? userData.userAvatar : UserImg}
                  alt="user-avt"
                  className={cx("user-avt")}
                />
              </div>
              <i
                className={cx("fa-solid fa-chevron-down", "dropdown-icon")}
              ></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
