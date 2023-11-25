import classNames from "classnames/bind";
import api from "~/services/apiService";
import styles from "./LoginRecovery.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
function RecoveryCode({ email, setLoading, setMessageVerify, setShowNotify, setRecoveryType }) {
  const [verifyCode, setVerifyCode] = useState("");
  const handleCancel = () => {
    window.location.href = "/login";
  };

  const handleChangeVerifyCode = (e) => {
    setVerifyCode(e.target.value);
  };

  const handleRecoveryAccount = () => {
    setLoading(true);
    api
      .get(`/auth/confirm/recovery/${email}/${verifyCode}`)
      .then((res) => {
        setLoading(false);
        setRecoveryType("Change Password")
      })
      .catch((err) => {
        setLoading(false);
        setShowNotify(true);
        setMessageVerify("Fail");
        console.log(err);
      });
  };
  return (
    <div className={cx("login-recovery-content")}>
      <div className={cx("content-title")}>
        <div className={cx("title")}>Enter security code</div>
      </div>
      <div className={cx("content-main")}>
        <div className={cx("content-notify")}>
          <span className={cx("highlight")}>
            Your account has been locked out.
          </span>{" "}
          Please check your emails for a message with your code. Your code is 6
          numbers long.
        </div>
        <div className={cx("content-input")}>
          <div className={cx("input-code")}>
            <input
              type="text"
              placeholder="Enter code"
              className={cx("code")}
              maxLength={6}
              autoFocus={true}
              onChange={handleChangeVerifyCode}
            />
          </div>
          <div className={cx("input-info")}>
            <div className={cx("main-text")}>We sent your code to:</div>
            <div className={cx("sub-text")}>{email}</div>
          </div>
        </div>
      </div>
      <div className={cx("content-footer")}>
        <button className={cx("re-send")}>Didn't get the code?</button>
        <div className={cx("right")}>
          <button className={cx("cancel-btn")} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={cx("continue-btn", verifyCode && "continue-btn-active")}
            onClick={handleRecoveryAccount}
            disabled={verifyCode === ""}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecoveryCode;
