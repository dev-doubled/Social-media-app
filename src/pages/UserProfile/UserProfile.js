import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/contexts/AuthContext";
// import { useSearchParams } from "react-router-dom";
import api from "~/services/apiService";
import LoadingSpinner from "~/components/LoadingSpinner";
import EditProfile from "~/components/User/UserTop/EditProfile";
import UserProfileBody from "./UserProfileBody";
import UserProfileTop from "./UserProfileTop";
// import StatusPopup from "~/components/StatusPopup";
import styles from "./UserProfile.module.scss";
const cx = classNames.bind(styles);
function UserProfile({
  isEditProfileOpen,
  setIsEditProfileOpen,
  isOpenCreateStatusUser,
  setIsOpenCreateStatusUser,
  isOpenStatusPopup,
  setIsOpenStatusPopup,
}) {
  const { userData, setUserData, loading } = useContext(AuthContext);
  const [statusData, setStatusData] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          // `/post`
          `/post/get-all-by-user/${userData.userId}`
        );
        setStatusData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userData.userId) {
      fetchData();
    }
  }, [userData.userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openEditProfile = () => {
    setIsEditProfileOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeEditProfile = () => {
    setIsEditProfileOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {loadingProfile && <LoadingSpinner loading={loadingProfile} />}
      {isEditProfileOpen && (
        <EditProfile userData={userData} closeEditProfile={closeEditProfile} />
      )}
      {!loading && (
        <div className={cx("user-profile-wrapper")}>
          <div className={cx("user-profile-container")}>
            <UserProfileTop
              userData={userData}
              setUserData={setUserData}
              onEditProfileClick={openEditProfile}
              setStatusData={setStatusData}
            />
            <UserProfileBody
              userData={userData}
              statusData={statusData}
              isOpenCreateStatusUser={isOpenCreateStatusUser}
              setIsOpenCreateStatusUser={setIsOpenCreateStatusUser}
              setLoadingProfile={setLoadingProfile}
              setStatusData={setStatusData}
              isOpenStatusPopup={isOpenStatusPopup}
              setIsOpenStatusPopup={setIsOpenStatusPopup}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
