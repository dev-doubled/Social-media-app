import classNames from "classnames/bind";
import InputBio from "./InputBio";
import LoadEditBio from "./LoadEditBio";
import styles from "./Intro.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
function Intro() {
  const [showInputBio, setShowInputBio] = useState(false);
  const [bioContent, setBioContent] = useState("");
  return (
    <div className={cx("intro-wrapper")}>
      <div className={cx("intro-container")}>
        <div className={cx("main-title")}>Intro</div>
        {bioContent ? (
          <LoadEditBio bioContent={bioContent} setBioContent={setBioContent}/>
        ) : showInputBio ? (
          <InputBio
            setShowInputBio={setShowInputBio}
            setBioContent={setBioContent}
          />
        ) : (
          <div className={cx("add-bio")} onClick={() => setShowInputBio(true)}>
            <div className={cx("text")}>Add Bio</div>
          </div>
        )}
        <div className={cx("edit-details")}>
          <div className={cx("text")}>Edit Details</div>
        </div>
        <div className={cx("add-hobbies")}>
          <div className={cx("text")}>Add Hobbies</div>
        </div>
        <div className={cx("add-featured")}>
          <div className={cx("text")}>Add Featured</div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
