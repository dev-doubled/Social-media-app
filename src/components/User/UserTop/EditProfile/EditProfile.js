import React, { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./EditProfile.module.scss";
import avatarCustom from "~/assets/images/avatar-custom.png";
const cx = classNames.bind(styles);
function EditProfile({ userData, closeEditProfile }) {
  const fileAvatarImageRef = useRef();
  const fileCoverImageRef = useRef();
  const handleClickAvatarImage = () => {
    fileAvatarImageRef.current.click();
  };
  const handleClickCoverImage = () => {
    fileCoverImageRef.current.click();
  };
  const handleChangeAvatarImage = () => {};
  const handleChangeCoverImage = () => {};
  return (
    <div
      className={cx("edit-profile-wrapper")}
      onClick={() => closeEditProfile()}
    >
      <div
        className={cx("edit-profile-container")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("edit-profile-header")}>
          <div className={cx("empty")}></div>
          <div className={cx("title")}>Edit profile</div>
          <div className={cx("close")} onClick={() => closeEditProfile()}>
            <i className={cx("fa-regular fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("edit-profile-avatar")}>
          <div className={cx("edit-profile-avatar-title")}>
            <div className={cx("title")}>Profile picture</div>
            <div className={cx("edit-action")} onClick={handleClickAvatarImage}>
              <button className={cx("edit-btn")}>Edit</button>
              <input
                ref={fileAvatarImageRef}
                type="file"
                accept="image/*"
                className={cx("avatar-input")}
                style={{ display: "none" }}
                onChange={handleChangeAvatarImage}
              />
            </div>
          </div>
          <div className={cx("user-avatar")}>
            <img
              src={userData.userAvatar}
              alt="user-avatar"
              className={cx("avatar")}
            />
          </div>
        </div>
        <div className={cx("edit-profile-cover-image")}>
          <div className={cx("edit-profile-cover-image-title")}>
            <div className={cx("title")}>Cover photo</div>
            <div className={cx("edit-action")} onClick={handleClickCoverImage}>
              <button className={cx("edit-btn")}>Edit</button>
              <input
                ref={fileCoverImageRef}
                type="file"
                accept="image/*"
                className={cx("avatar-input")}
                style={{ display: "none" }}
                onChange={handleChangeCoverImage}
              />
            </div>
          </div>
          <div className={cx("cover-image-main")}>
            <img
              src={userData.coverPicture}
              alt="cover-img"
              className={cx("cover-image-content")}
            />
          </div>
        </div>
        <div className={cx("edit-profile-custom-avatar")}>
          <div className={cx("edit-profile-custom-avatar-title")}>
            <div className={cx("title")}>Avatar</div>
            <button className={cx("create-btn")}>Create</button>
          </div>
          <div className={cx("edit-profile-custom-avatar-sub-title")}>
            Only you can view this section
          </div>
          <div className={cx("edit-profile-custom-avatar-picture")}>
            <img
              src={avatarCustom}
              alt="avatar-custom"
              className={cx("avatar-custom")}
            />
          </div>
          <div className={cx("sub-text")}>Express yourself using an avatar</div>
          <div className={cx("create-avatar-action")}>
            <div className={cx("create-btn")}>
              <i className={cx("fa-sharp fa-solid fa-face-smile", "icon")}></i>
              <div className={cx("create-text")}>Create avatar</div>
            </div>
          </div>
        </div>
        <div className={cx("custom-intro")}>
          <div className={cx("custom-intro-title")}>
            <div className={cx("title")}>Customize your Intro</div>
            <button className={cx("edit-btn")}>Edit</button>
          </div>
          <div className={cx("intro-list")}>
            <div className={cx("current-city")}>
              <i className={cx("fa-solid fa-house-chimney", "icon")}></i>
              <div className={cx("title")}>Current town or city</div>
              <div className={cx("content")}></div>
            </div>
            <div className={cx("workplace")}>
              <i className={cx("fa-solid fa-briefcase", "icon")}></i>
              <div className={cx("title")}>Workplace</div>
              <div className={cx("content")}></div>
            </div>
            <div className={cx("school")}>
              <i className={cx("fa-duotone fa-graduation-cap", "icon")}></i>
              <div className={cx("title")}>School or university</div>
              <div className={cx("content")}></div>
            </div>
            <div className={cx("location")}>
              <i className={cx("fa-solid fa-location-dot", "icon")}></i>
              <div className={cx("title")}>Home town</div>
              <div className={cx("content")}></div>
            </div>
            <div className={cx("relationship")}>
              <i className={cx("fa-sharp fa-solid fa-heart", "icon")}></i>
              <div className={cx("title")}>Relationship status</div>
              <div className={cx("content")}></div>
            </div>
          </div>
        </div>
        <div className={cx("edit-your-about-action")}>
          <button className={cx("edit-about-btn")}>Edit Your About Info</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
