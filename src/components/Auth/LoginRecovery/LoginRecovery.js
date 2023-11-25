import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecoveryCode from "./RecoveryCode";
import ChangePassword from "./ChangePassword";
import LoadingSpinner from "~/components/LoadingSpinner";
import VerifyPopup from "../VerifyPopup";
import PasswordTip from "./PasswordTip";
import facebookImg from "~/assets/images/facebook.svg";
import styles from "./LoginRecovery.module.scss";
const languageList = [
  "Tiếng Việt",
  "中文(台灣)",
  "한국어",
  "日本語",
  "Français (France)",
  "ภาษาไทย",
  "Español",
  "Português (Brasil)",
  "Deutsch",
  "Italiano",
];
const linkList = [
  "Sign Up",
  "Log in",
  "Messenger",
  "Facebook",
  " Lite",
  "Video",
  "Places",
  "Games",
  "Marketplace",
  "MetaPay",
  " MetaStore",
  "Meta Quest",
  "Instagram",
  "Threads",
  "Fundraisers",
  "Services",
  "Voting",
  " Information",
  "Centre",
  "Privacy Policy",
  "Privacy Centre",
  "Groups",
  "About",
  "Create ad",
  "Create Page",
  "Developers",
  "Careers",
  "Cookies",
  "AdChoices",
  "Terms",
  "Help",
  "Contact uploading and non-users",
];
const currentYear = new Date().getFullYear();
const cx = classNames.bind(styles);
function LoginRecovery() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [messageVerify, setMessageVerify] = useState("");
  const [recoveryType, setRecoveryType] = useState("Code");
  const [showPasswordTip, setShowPasswordTip] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    setEmail(email);
  }, [location.search]);

  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      {showNotify && (
        <VerifyPopup
          email={email}
          messageVerify={messageVerify}
          setShowVerifyNotify={setShowNotify}
          type="Recovery"
        />
      )}
      {showPasswordTip && <PasswordTip setShowPasswordTip={setShowPasswordTip}/>}
      <div className={cx("login-recovery-wrapper")}>
        <div className={cx("login-recovery-header")}>
          <img src={facebookImg} alt="logo-img" className={cx("logo-img")} />
        </div>
        <div className={cx("login-recovery-container")}>
          {recoveryType === "Code" && (
            <RecoveryCode
              email={email}
              setLoading={setLoading}
              setMessageVerify={setMessageVerify}
              setShowNotify={setShowNotify}
              setRecoveryType={setRecoveryType}
            />
          )}
          {recoveryType === "Change Password" && <ChangePassword email={email} setShowPasswordTip={setShowPasswordTip} setLoading={setLoading}/>}
        </div>
        <div className={cx("login-recovery-footer")}>
          <div className={cx("footer-content")}>
            <div className={cx("language-list")}>
              <div className={cx("language-active")}>English (UK)</div>
              {languageList.map((language, index) => (
                <div className={cx("language-inActive")} key={index}>
                  {language}
                </div>
              ))}
              <button className={cx("add-language-btn")}>
                <i className={cx("fa-sharp fa-solid fa-plus", "icon")}></i>
              </button>
            </div>
            <div className={cx("line")}></div>
            <div className={cx("link-list")}>
              {linkList.map((link, index) => (
                <div className={cx("link")} key={index}>
                  {link}
                </div>
              ))}
            </div>
            <div className={cx("author")}>DevDD &copy; {currentYear}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRecovery;
