import className from "classnames/bind";
import { useState } from "react";
import styles from "./InputBio.module.scss";
const cx = className.bind(styles);
function InputBio({ setShowInputBio, setBioContent }) {
  const [inputContent, setInputContent] = useState("");
  const [countInput, setCountInput] = useState(101);
  const handleChangeInput = (e) => {
    setInputContent(e.target.value);
    setCountInput(101 - e.target.value.length);
  };
  const handleSaveInput = () => {
    setBioContent(inputContent)
    setShowInputBio(false)
  };
  return (
    <div className={cx("input-bio-wrapper")}>
      <div className={cx("input-bio-container")}>
        <div className={cx("describe")}>
          <textarea
            className={cx("input")}
            placeholder="Describe who you are"
            onChange={handleChangeInput}
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
            <button className={cx("cancel-btn")} onClick={() => setShowInputBio(false)}>Cancel</button>
            <button
              className={
                inputContent === ""
                  ? cx("save-btn-deActive")
                  : cx("save-btn-active")
              }
              disabled={inputContent === ""}
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
