import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "~/configs/firebase";
import UserDefault from "~/assets/images/user-default.png";
import AddFriendRecommend from "~/components/User/UserTop/AddFriendRecommend";
import ChooseProfilePicture from "~/components/User/UserTop/ChooseProfilePicture";
import UserAvatarOptions from "~/components/User/UserTop/UserAvatarOptions";
import UserPageMore from "~/components/User/UserTop/UserPageMore";
import UserPageOptions from "~/components/User/UserTop/UserPageOptions";
import UploadCoverImage from "~/components/User/UserTop/UploadCoverImage";
import styles from "./UserProfileTop.module.scss";
const cx = classNames.bind(styles);
const selections = [
  {
    path: "/profile",
    text: "Posts",
  },
  {
    path: "/profile/about",
    text: "About",
  },
  {
    path: "/profile/friends",
    text: "Friends",
  },
  {
    path: "/profile/photos",
    text: "Photos",
  },
  {
    path: "/profile/videos",
    text: "Videos",
  },
  {
    path: "/profile/map",
    text: "Check-ins",
  },
];
function UserProfileTop({
  userData,
  setUserData,
  onEditProfileClick,
  setStatusData,
}) {
  const fileCoverImageRef = useRef();
  const location = useLocation();
  const [coverImage, setCoverImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [coverImageSelected, setCoverImageSelected] = useState(null);
  const [showMorePage, setShowMorePage] = useState(false);
  const [showUserPageOption, setShowUserPageOption] = useState(false);
  const [showAvatarOption, setShowAvatarOption] = useState(false);
  const [showChooseProfilePicture, setChooseProfilePicture] = useState(false);
  const [showAddFriendRec, setShowAddFriendRec] = useState(false);
  const [showConfirmUploadCoverImage, setShowConfirmUploadCoverImage] =
    useState(false);
  const [showCoverImageOption, setShowCoverImageOption] = useState(true);
  const [loadingUploadCoverImage, setLoadingUploadCoverImage] = useState(false);

  useEffect(() => {
    setCoverImage(userData.coverPicture);
    setAvatar(userData.userAvatar);
  }, [userData.coverPicture, userData.userAvatar]);

  const photoUrl = "/photo?psrc=" + encodeURIComponent(userData.coverPicture);
  const handleClickCoverImage = () => {
    fileCoverImageRef.current.click();
  };
  const handlePreviewCoverImage = async (e) => {
    setLoadingUploadCoverImage(true);
    setShowCoverImageOption(false);
    let file = null;
    let url;

    //Preview cover image
    if (e.target.files.length === 1) {
      file = e.target.files[0];
      url = URL.createObjectURL(file);

      if (coverImage) {
        URL.revokeObjectURL(coverImage);
      }
    }

    //Upload Cover Image to Firebase
    const coverImageRef = ref(
      storage,
      `coverImages/${userData.userId}/${file.name + v4()}`
    );
    try {
      await uploadBytes(coverImageRef, file);
      const downloadURL = await getDownloadURL(coverImageRef);
      setCoverImage(url);
      setCoverImageSelected(downloadURL);
      setLoadingUploadCoverImage(false);
      setShowConfirmUploadCoverImage(true);
      console.log("Cover image uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <>
      {showChooseProfilePicture && (
        <ChooseProfilePicture
          userData={userData}
          setUserData={setUserData}
          setChooseProfilePicture={setChooseProfilePicture}
          setStatusData={setStatusData}
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
          {showConfirmUploadCoverImage && (
            <UploadCoverImage
              userData={userData}
              setUserData={setUserData}
              setCoverImage={setCoverImage}
              coverImageSelected={coverImageSelected}
              setCoverImageSelected={setCoverImageSelected}
              setShowConfirmUploadCoverImage={setShowConfirmUploadCoverImage}
              setShowCoverImageOption={setShowCoverImageOption}
              setLoadingUploadCoverImage={setLoadingUploadCoverImage}
              setStatusData={setStatusData}
            />
          )}
          {loadingUploadCoverImage && (
            <div className={cx("cover-image-loading")}>
              <BeatLoader
                size={10}
                color="#0866ff"
                className={cx("loading-spinner")}
              />
            </div>
          )}

          {coverImage ? (
            <div className={cx("cover-image-preview")}>
              <Link to={photoUrl} className={cx("cover-image-link")}>
                <img
                  src={coverImage}
                  alt="cover-img"
                  className={cx("cover-img")}
                />
              </Link>
              {showCoverImageOption && (
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
              )}
            </div>
          ) : (
            <div className={cx("cover-image-default")}>
              {showCoverImageOption && (
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
              )}
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
                  image={userData.userAvatar}
                  setChooseProfilePicture={setChooseProfilePicture}
                />
              )}
            </div>
            <div className={cx("user-information")}>
              <div className={cx("user-content")}>
                <div className={cx("username")}>
                  {userData.surName + " " + userData.firstName}
                </div>
                <div className={cx("number-friends")}>311 friends</div>
              </div>
              <div className={cx("user-select")}>
                <div className={cx("add-story")}>
                  <i className={cx("fa-regular fa-plus", "icon")}></i>
                  <span className={cx("text")}>Add to story</span>
                </div>

                <div
                  className={cx("edit-profile")}
                  onClick={() => onEditProfileClick()}
                >
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
