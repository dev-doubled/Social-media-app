import className from "classnames/bind";
import EditBio from "../EditBio";
import styles from "./LoadEditBio.module.scss";
import { useState } from "react";
const cx = className.bind(styles);
function LoadEditBio({ bioContent, setBioContent }) {
  const [showEditBio, setShowEditBio] = useState(false);
  return (
    <div className={cx("load-edit-wrapper")}>
      {showEditBio ? (
        <EditBio setShowEditBio={setShowEditBio} bioContent={bioContent} setBioContent={setBioContent}/>
      ) : (
        <div className={cx("load-edit-container")}>
          <div className={cx("load-bio")}>{bioContent}</div>
          <div className={cx("edit-bio")} onClick={() => setShowEditBio(true)}>
            <div className={cx("text")}>Edit Bio</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadEditBio;
