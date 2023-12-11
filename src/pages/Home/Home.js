import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { AuthContext } from "~/contexts/AuthContext";
import LeftSideBar from "~/pages/Home/LeftSideBar";
import RightSideBar from "~/pages/Home/RightSideBar";
import Content from "~/pages/Home/Content";
import CreateStatus from "~/components/Status/CreateStatus";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home({ isOpenCreateStatus, setIsOpenCreateStatus }) {
  const { userData, loading } = useContext(AuthContext);
  const [statusText, setStatusText] = useState(`What's on your mind?`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const openCreateStatus = () => {
    setIsOpenCreateStatus(true);
    document.body.style.overflow = "hidden";
  };

  const closeCreateStatus = () => {
    setIsOpenCreateStatus(false);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      {isOpenCreateStatus && (
        <CreateStatus
          closeCreateStatus={closeCreateStatus}
          setStatusText={setStatusText}
          userData={userData}
        />
      )}
      {!loading && (
        <div className={cx("home-wrapper")}>
          <div className={cx("home-container")}>
            <LeftSideBar userData={userData} />
            <Content
              openCreateStatus={openCreateStatus}
              statusText={statusText}
              userData={userData}
            />
            <RightSideBar />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
