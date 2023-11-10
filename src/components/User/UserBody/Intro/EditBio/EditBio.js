import className from "classnames/bind";
import { useState } from "react";
import styles from "./EditBio.module.scss";
const cx = className.bind(styles);
function InputBio({ setShowEditBio, bioContent, setBioContent }) {
  const [inputContent, setInputContent] = useState(bioContent);
  const [countInput, setCountInput] = useState(101);
  const handleChangeInput = (e) => {
    setInputContent(e.target.value);
    setCountInput(101 - e.target.value.length);
  };
  const handleSaveInput = () => {
    setShowEditBio(false);
    setBioContent(inputContent);
  };
  return (
    <div className={cx("input-bio-wrapper")}>
      <div className={cx("input-bio-container")}>
        <div className={cx("describe")}>
          <textarea
            className={cx("input")}
            placeholder="Describe who you are"
            onChange={handleChangeInput}
            value={inputContent}
            maxLength={101}
            autoFocus
          ></textarea>
        </div>
        <div className={cx("count-input")}>
          {countInput} characters remaining
        </div>
        <div className={cx("input-action")}>
          <div className={cx("public")}>
            <i
              className={cx("fa-sharp fa-solid fa-earth-americas", "icon")}
            ></i>
            <div className={cx("text")}>Public</div>
          </div>
          <div className={cx("action-btn")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setShowEditBio(false)}
            >
              Cancel
            </button>
            <button
              className={
                inputContent === bioContent
                  ? cx("save-btn-deActive")
                  : cx("save-btn-active")
              }
              disabled={inputContent === bioContent}
              onClick={handleSaveInput}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBio;
