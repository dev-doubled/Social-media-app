import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import api from "~/services/apiService";
import styles from "./VerifyPopup.module.scss";
const cx = classNames.bind(styles);
function VerifyPopup({
  email,
  messageVerify,
  setShowVerifyNotify,
  type,
  setLoading,
}) {
  const navigate = useNavigate();
  const url = "/login?email=" + encodeURIComponent(email);
  const handleRedirectToLogin = () => {
    navigate(url);
  };

  const handleResendVerifyEmail = () => {
    setLoading(true);
    api
      .get(`/auth/re-send/${email}`)
      .then((res) => {
        setLoading(false);
        setShowVerifyNotify(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={cx("verify-popup-wrapper")}>
      <div className={cx("verify-popup-container")}>
        <div className={cx("verify-popup-header")}>
          {messageVerify === "Success"
            ? "Account Confirmed"
            : messageVerify === "VerifyCode"
            ? "Send Email Success"
            : messageVerify === "RecoveryCode"
            ? "Recovery Account Successfully"
            : "Account Confirmed Fail"}
        </div>
        {messageVerify === "Success" ? (
          <div className={cx("verify-notify")}>
            You have successfully confirmed your account with the email{" "}
            <span className={cx("highlight")}>{email}</span>. You will you this
            email address to log in.
          </div>
        ) : messageVerify === "VerifyCode" ? (
          <div className={cx("verify-notify")}>
            Please check your email{" "}
            <span className={cx("highlight")}>{email}</span> to get new verify
            code. Please re-type verify code to verify your email
          </div>
        ) : messageVerify === "Fail" && type === "Code" ? (
          <div className={cx("verify-notify")}>
            You have failed to confirm your account by email{" "}
            <span className={cx("highlight")}>{email}</span>. Please check your
            verify code again. If still failed please re-send to verify your
            email again
          </div>
        ) : messageVerify === "Fail" && type === "Recovery" ? (
          <div className={cx("verify-notify")}>
            You have failed to recovery your account by email{" "}
            <span className={cx("highlight")}>{email}</span>. Please recheck
            your recovery code. If it still fails please re-send to give a new
            recovery code to recover your account again
          </div>
        ) : messageVerify === "Expired" && type === "Code" ? (
          <div className={cx("verify-notify")}>
            You have failed to confirm your account by email{" "}
            <span className={cx("highlight")}>{email}</span>. Verification code
            has expired. Please re-send to verify your email again.
          </div>
        ) : (
          <div className={cx("verify-notify")}>
            You have failed to confirm your account by email{" "}
            <span className={cx("highlight")}>{email}</span>. Please re-send to
            verify your email again.
          </div>
        )}

        <div className={cx("verify-footer")}>
          {messageVerify === "Success" && type === "Code" ? (
            <button
              className={cx("confirm-btn")}
              onClick={handleRedirectToLogin}
            >
              OK
            </button>
          ) : messageVerify === "Success" ||
            (messageVerify === "Fail" && type === "Code") ||
            (messageVerify === "Expired" && type === "Code") ||
            (messageVerify === "Fail" && type === "Recovery") ||
            messageVerify === "VerifyCode" ? (
            <button
              className={cx("confirm-btn")}
              onClick={() => setShowVerifyNotify(false)}
            >
              OK
            </button>
          ) : (
            <button
              className={cx("re-send-btn")}
              onClick={handleResendVerifyEmail}
            >
              Re-send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyPopup;
