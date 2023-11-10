import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserDefault from "~/assets/images/user-default.png";
import AddFriendRecommend from "~/components/User/UserTop/AddFriendRecommend";
import ChooseProfilePicture from "~/components/User/UserTop/ChooseProfilePicture";
import UserAvatarOptions from "~/components/User/UserTop/UserAvatarOptions";
import UserPageMore from "~/components/User/UserTop/UserPageMore";
import UserPageOptions from "~/components/User/UserTop/UserPageOptions";
import styles from "./UserProfileTop.module.scss";
const cx = classNames.bind(styles);
const selections = [
  {
    path: "/user",
    text: "Posts",
  },
  {
    path: "/user/about",
    text: "About",
  },
  {
    path: "/user/friends",
    text: "Friends",
  },
  {
    path: "/user/photos",
    text: "Photos",
  },
  {
    path: "/user/videos",
    text: "Videos",
  },
  {
    path: "/user/map",
    text: "Check-ins",
  },
];
function UserProfileTop() {
  const fileCoverImageRef = useRef();
  const location = useLocation();
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [showMorePage, setShowMorePage] = useState(false);
  const [showUserPageOption, setShowUserPageOption] = useState(false);
  const [showAvatarOption, setShowAvatarOption] = useState(false);
  const [showChooseProfilePicture, setChooseProfilePicture] = useState(false);
  const [showAddFriendRec, setShowAddFriendRec] = useState(false);

  const photoUrl = "/photo?psrc=" + encodeURIComponent(coverImagePreview);
  const handleClickCoverImage = () => {
    fileCoverImageRef.current.click();
  };
  const handlePreviewCoverImage = (e) => {
    if (e.target.files.length === 1) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      if (coverImagePreview) {
        URL.revokeObjectURL(coverImagePreview);
      }

      setCoverImagePreview(url);
    }
  };

  return (
    <>
      {showChooseProfilePicture && (
        <ChooseProfilePicture
          setChooseProfilePicture={setChooseProfilePicture}
          setAvatar={setAvatar}
        />
      )}
      <div
        className={cx("user-profile-top")}
        onClick={() => {
          setShowMorePage(false);
          setShowUserPageOption(false);
          setShowAvatarOption(false);
        }}
      >
        {/* Cover photo */}
        <div className={cx("top-wrapper")}>
          {coverImagePreview ? (
            <div className={cx("cover-image-preview")}>
              <Link to={photoUrl} className={cx("cover-image-link")}>
                <img
                  src={coverImagePreview}
                  alt="cover-img"
                  className={cx("cover-img")}
                />
              </Link>
              <div className={cx("cover-image-option")}>
                <div className={cx("create-with-avatar")}>
                  <i
                    className={cx("fa-sharp fa-solid fa-face-smile", "icon")}
                  ></i>
                  <span className={cx("text")}>Create with avatar</span>
                </div>
                <div
                  className={cx("add-cover-image")}
                  onClick={handleClickCoverImage}
                >
                  <i className={cx("fa-solid fa-camera", "icon")}></i>
                  <span className={cx("text")}>Edit cover photo</span>
                  <input
                    ref={fileCoverImageRef}
                    type="file"
                    accept="image/*"
                    className={cx("image-input")}
                    style={{ display: "none" }}
                    onChange={handlePreviewCoverImage}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={cx("cover-image-default")}>
              <div className={cx("cover-image-option")}>
                <div className={cx("create-with-avatar")}>
                  <i
                    className={cx("fa-sharp fa-solid fa-face-smile", "icon")}
                  ></i>
                  <span className={cx("text")}>Create with avatar</span>
                </div>
                <div
                  className={cx("add-cover-image")}
                  onClick={handleClickCoverImage}
                >
                  <i className={cx("fa-solid fa-camera", "icon")}></i>
                  <span className={cx("text")}>Add Cover Photo</span>
                  <input
                    ref={fileCoverImageRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className={cx("image-input")}
                    style={{ display: "none" }}
                    onChange={handlePreviewCoverImage}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* User information */}
        <div className={cx("user-container")}>
          <div className={cx("user")}>
            <div
              className={cx("user-avatar")}
              onClick={(e) => {
                e.stopPropagation();
                setShowAvatarOption(!showAvatarOption);
              }}
            >
              <div className={cx("avatar-wrapper")}>
                <img
                  src={avatar ? avatar : UserDefault}
                  alt="user-avatar"
                  className={cx("avatar")}
                />
                <div className={cx("overlay-img")}></div>
              </div>
              <div
                className={cx("upload-camera")}
                onClick={(e) => {
                  e.stopPropagation();
                  setChooseProfilePicture(true);
                }}
              >
                <i className={cx("fa-solid fa-camera", "icon")}></i>
              </div>
              {showAvatarOption && (
                <UserAvatarOptions
                  image={avatar ? avatar : UserDefault}
                  setChooseProfilePicture={setChooseProfilePicture}
                />
              )}
            </div>
            <div className={cx("user-information")}>
              <div className={cx("user-content")}>
                <div className={cx("username")}>Đình Duy</div>
                <div className={cx("number-friends")}>311 friends</div>
              </div>
              <div className={cx("user-select")}>
                <div className={cx("add-story")}>
                  <i className={cx("fa-regular fa-plus", "icon")}></i>
                  <span className={cx("text")}>Add to story</span>
                </div>

                <div className={cx("edit-profile")}>
                  <i className={cx("fa-solid fa-pen", "icon")}></i>
                  <span className={cx("text")}>Edit profile</span>
                </div>
                <div
                  className={cx("dropdown-icon")}
                  onClick={() => setShowAddFriendRec(!showAddFriendRec)}
                >
                  <i
                    className={cx(
                      showAddFriendRec
                        ? "fa-sharp fa-solid fa-chevron-up"
                        : "fa-sharp fa-solid fa-chevron-down",
                      "icon"
                    )}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAddFriendRec && (
          <div className={cx("add-friend-rec-wrapper")}>
            <div className={cx("add-friend-rec-container")}>
              <AddFriendRecommend />
            </div>
          </div>
        )}
        {/* Line */}
        <div className={cx("line-wrapper")}>
          <div className={cx("line")}></div>
        </div>

        {/* Option */}
        <div className={cx("profile-page-selection-wrapper")}>
          <div className={cx("profile-page-selection")}>
            <div className={cx("selection-list")}>
              {selections.map((selection, i) => {
                const isActive = location.pathname === selection.path;
                return (
                  <NavLink
                    to=""
                    className={cx(
                      isActive ? "select-option-active" : "select-option"
                    )}
                    key={i}
                  >
                    {selection.text}
                  </NavLink>
                );
              })}
              <div
                className={cx("select-option-more")}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMorePage(!showMorePage);
                }}
              >
                <div className={cx("text")}>More</div>
                <i className={cx("fa-solid fa-caret-down", "icon")}></i>
              </div>
              {showMorePage && <UserPageMore />}
            </div>
            <div
              className={cx("page-option")}
              onClick={(e) => {
                e.stopPropagation();
                setShowUserPageOption(!showUserPageOption);
              }}
            >
              <i className={cx("fa-regular fa-ellipsis", "icon")}></i>
            </div>

            {showUserPageOption && <UserPageOptions />}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileTop;
