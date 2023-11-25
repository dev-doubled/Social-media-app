import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import api from "~/services/apiService";
import Logo from "~/assets/images/logo.png";
import VerifyPopup from "../../VerifyPopup";
import LoadingSpinner from "~/components/LoadingSpinner";
import styles from "./Confirm.module.scss";
import { Link, useLocation } from "react-router-dom";
const cx = classNames.bind(styles);
const footerLinkList = [
  "About",
  "Privacy Policy",
  "Cookies",
  "AdChoices",
  "Terms",
  "Help",
];
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
function Confirm() {
  const location = useLocation();
  const [inputFocus, setInputFocus] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [email, setEmail] = useState("");
  const [showNotify, setShowNotify] = useState(false);
  const [messageVerify, setMessageVerify] = useState("");
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    setEmail(emailParam);
  }, [location.search]);

  const handleChangeVerifyCode = (e) => {
    setVerifyCode(e.target.value);
  };

  const handleResend = () => {
    setLoading(true);
    api
      .get(`/auth/re-send/${email}`)
      .then((res) => {
        setLoading(false);
        setShowNotify(true);
        setMessageVerify("VerifyCode");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitCode = () => {
    setLoading(true);
    api
      .get(
        `/auth/confirm/code/${email}/${verifyCode}`
      )
      .then((res) => {
        setLoading(false);
        setShowNotify(true);
        setMessageVerify("Success");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setShowNotify(true);
        if (err.response.data.error === "Verification code has expired.") {
          setMessageVerify("Expired");
        } else {
          setMessageVerify("Fail");
        }
        console.log(err.response.data.error);
      });
  };
  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      {showNotify && (
        <VerifyPopup
          email={email}
          messageVerify={messageVerify}
          type="Code"
          setShowVerifyNotify={setShowNotify}
        />
      )}
      <div className={cx("confirm-wrapper")}>
        <div className={cx("confirm-header")}>
          <Link to="/login" className={cx("facebook-logo")}>
            <img src={Logo} alt="logo" className={cx("logo")} />
          </Link>
          <div className={cx("option")}>
            <i className={cx("fa-solid fa-sort-down", "icon")}></i>
          </div>
        </div>
        <div className={cx("confirm-container")}>
          <div className={cx("confirm-content")}>
            <div className={cx("confirm-content-top")}>
              <div className={cx("verify-code-wrapper")}>
                <div className={cx("verify-code-container")}>
                  <div className={cx("verify-code-content")}>
                    <div className={cx("verify-title")}>
                      Enter the code from your email
                    </div>
                    <div className={cx("verify-content")}>
                      <div className={cx("verify-information")}>
                        Let us know that this email address belongs to you.
                        Enter the code from the email sent to
                        <span className={cx("email-info")}> {email}.</span>
                      </div>
                      <div
                        className={cx(
                          "verify-input",
                          inputFocus && "verify-input-focus"
                        )}
                      >
                        <div className={cx("key-code")}>FB- </div>
                        <input
                          type="text"
                          spellCheck={false}
                          maxLength={5}
                          className={cx("code-input")}
                          autoFocus={true}
                          onChange={handleChangeVerifyCode}
                          onFocus={() => setInputFocus(true)}
                          onBlur={() => setInputFocus(false)}
                        />
                      </div>
                      <div className={cx("re-send")}>
                        <button
                          className={cx("re-send-btn")}
                          onClick={handleResend}
                        >
                          Send Email Again
                        </button>
                      </div>
                    </div>
                    <div className={cx("verify-footer")}>
                      <button className={cx("update-contact-info")}>
                        Update Contact Info
                      </button>
                      <button
                        className={cx(
                          "continue-btn",
                          verifyCode && "continue-btn-active"
                        )}
                        onClick={handleSubmitCode}
                        disabled={verifyCode === ""}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("confirm-content-bottom")}>
              <div className={cx("footer-link-list")}>
                {footerLinkList.map((item, index) => (
                  <div className={cx("item")} key={index}>
                    {item}
                  </div>
                ))}
              </div>
              <div className={cx("author")}>DevDD &copy; {currentYear}</div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirm;
