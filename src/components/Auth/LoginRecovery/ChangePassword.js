import React, { useState } from "react";
import classNames from "classnames/bind";
import api from "~/services/apiService";
import styles from "./LoginRecovery.module.scss";
const cx = classNames.bind(styles);
function ChangePassword({ email, setShowPasswordTip, setLoading }) {
  const [typePassword, setTypePassword] = useState("password");
  const [showPassword, setShowPassword] = useState("Show");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setTypePassword(typePassword === "password" ? "text" : "password");
    setShowPassword(showPassword === "Hide" ? "Show" : "Hide");
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitPassword = () => {
    setLoading(true);
    const userData = {
      username: email,
      password: password,
    };
    api
      .post("/user/new-password", userData)
      .then(() => {
        setLoading(false);
        const url = `/login?email=${email}`
        window.location.href = url;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className={cx("login-recovery-content")}>
      <div className={cx("content-title")}>
        <div className={cx("title")}>Choose a new password</div>
      </div>
      <div className={cx("content-main")}>
        <div className={cx("content-notify")}>
          Create a new password that is at least 8 characters long. A strong
          password has a combination of letters, digits and punctuation marks.
        </div>
        <div className={cx("content-input-password")}>
          <div className={cx("input-password")}>
            <input
              type={typePassword}
              placeholder="New password"
              className={cx("password")}
              spellCheck={false}
              autoFocus={true}
              onChange={handleChangePassword}
            />
            <div className={cx("show-password")} onClick={handleShowPassword}>
              <button className={cx("show-hide")}>{showPassword}</button>
            </div>
          </div>
          <div
            className={cx("question-mark")}
            onClick={() => setShowPasswordTip(true)}
          >
            <i className={cx("fa-solid fa-question", "icon")}></i>
          </div>
        </div>
      </div>
      <div className={cx("content-footer-password")}>
        <button className={cx("skip-btn")}>Skip</button>
        <button
          className={cx("continue-btn", password && "continue-btn-active")}
          disabled={password === ""}
          onClick={handleSubmitPassword}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
