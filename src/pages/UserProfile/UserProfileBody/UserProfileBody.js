import classNames from "classnames/bind";
import { useState } from "react";
import Status from "~/components/StatusPostingUser";
import CreateStatusUser from "~/components/User/UserBody/CreateStatusUser";
import Friends from "~/components/User/UserBody/Friends";
import Intro from "~/components/User/UserBody/Intro";
import Photos from "~/components/User/UserBody/Photos";
import UserPostStatus from "~/components/User/UserBody/UserPostStatus";
import styles from "./UserProfileBody.module.scss";
const cx = classNames.bind(styles);
function UserProfileBody({
  userData,
  statusData,
  setStatusData,
  isOpenCreateStatusUser,
  setIsOpenCreateStatusUser,
  setLoadingProfile,
  isOpenStatusPopup,
  setIsOpenStatusPopup,
}) {
  const [statusText, setStatusText] = useState(`What's on your mind?`);
  const openCreateStatus = () => {
    setIsOpenCreateStatusUser(true);
    document.body.style.overflow = "hidden";
  };

  const closeCreateStatus = () => {
    setIsOpenCreateStatusUser(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {isOpenCreateStatusUser && (
        <CreateStatusUser
          closeCreateStatus={closeCreateStatus}
          setStatusText={setStatusText}
          userData={userData}
          setLoadingProfile={setLoadingProfile}
          setStatusData={setStatusData}
        />
      )}
      <div className={cx("user-profile-body-wrapper")}>
        <div className={cx("user-profile-body-container")}>
          <div className={cx("user-profile-left")}>
            <Intro />
            <Photos userData={userData} />
            <Friends />
          </div>
          <div className={cx("user-profile-right")}>
            <UserPostStatus
              openCreateStatus={openCreateStatus}
              statusText={statusText}
              userData={userData}
            />
            {statusData.map((data) => (
              <Status
                key={data._id}
                data={data}
                userData={userData}
                isOpenStatusPopup={isOpenStatusPopup}
                setIsOpenStatusPopup={setIsOpenStatusPopup}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileBody;
