import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "~/services/apiService";
import { AuthContext } from "~/contexts/AuthContext";
import { encryptUserId } from "~/utils/hashUserId";
import TokenService from "~/services/tokenServices";
import facebookLogo from "~/assets/images/facebook.svg";
import SignUp from "~/components/Auth/SignUp";
import VerifyPopup from "~/components/Auth/VerifyPopup";
import LoadingSpinner from "~/components/LoadingSpinner";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
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

function Login({ onLogin, setIsSignup, setIsLoginFail }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserId } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [inputEmailAction, setInputEmailAction] = useState(false);
  const [inputPasswordAction, setInputPasswordAction] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [messageVerify, setMessageVerify] = useState("");
  const [showVerifyNotify, setShowVerifyNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmToken, setConfirmToken] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    const email = params.get("email");
    setLoginData({ ...loginData, username: email });

    if (message === "success") {
      setShowVerifyNotify(true);
      setMessageVerify("Success");
    } else if (message === "fail") {
      setShowVerifyNotify(true);
      setMessageVerify("Fail");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleChangeUsername = (e) => {
    setLoginData({ ...loginData, username: e.target.value });
  };

  const handleChangePassword = (e) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  const handleLogin = () => {
    if (loginData.username === "" || loginData.password === "") {
      setErrorMsg("All fields are required. Please check your credentials.");
    } else {
      setLoading(true);
      api
        .post("/auth/login", loginData)
        .then((response) => {
          setLoading(false);
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          TokenService.setAccessToken(accessToken);
          TokenService.setRefreshToken(refreshToken);
          const decodeAccessToken = jwtDecode(accessToken);
          const userId = decodeAccessToken.userId;
          const encodeUserId = encryptUserId(
            userId,
            process.env.REACT_APP_SECRET_KEY_ENCODE
          );
          setUserId(encodeUserId);
          onLogin();
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          setLoading(false);
          if (errorMessage === "Your account has not been activated.") {
            api
              .get(`/auth/confirm/get-confirm-token/${loginData.username}`)
              .then((response) => {
                setConfirmToken(response.data.confirmationToken);
              })
              .catch((error) => {
                console.log(error);
              });
            setErrorMsg("Not activated");
          } else if (
            errorMessage ===
            "Password incorrect. Please check your credentials."
          ) {
            setIsLoginFail(true);
            const url = `/login/fail?username=${loginData.username}`;
            navigate(url);
          } else {
            setErrorMsg(errorMessage);
          }
        });
    }
  };

  const handleShowPassword = () => {
    setTypePassword(typePassword === "password" ? "text" : "password");
  };

  const handleActiveAccount = () => {
    setLoading(true);
    api
      .get(`/auth/confirm/token/v2/${loginData.username}/${confirmToken}`)
      .then(() => {
        setLoading(false);
        setErrorMsg("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleLogin();
    }
  };
  return (
    <>
      {showVerifyNotify && (
        <VerifyPopup
          email={loginData.username}
          messageVerify={messageVerify}
          setShowVerifyNotify={setShowVerifyNotify}
          setLoading={setLoading}
        />
      )}
      {loading && <LoadingSpinner loading={loading} />}
      {showSignUp && (
        <SignUp setShowSignUp={setShowSignUp} setIsSignup={setIsSignup} />
      )}
      <div className={cx("login-wrapper")}>
        <div className={cx("login-container")}>
          <div className={cx("login-main")}>
            <div className={cx("login-content")}>
              <div className={cx("content-left")}>
                <div className={cx("big-logo")}>
                  <img
                    src={facebookLogo}
                    alt="big-logo"
                    className={cx("logo")}
                  />
                </div>
                <div className={cx("big-text")}>
                  Facebook helps you connect and share with the people in your
                  life.
                </div>
              </div>
              <div className={cx("content-right")}>
                <div className={cx("login-input-container")}>
                  <div className={cx("input-content")}>
                    <div
                      className={cx(
                        "email-phone",
                        inputEmailAction && "active"
                      )}
                    >
                      <input
                        type="text"
                        className={cx("input-email-phone")}
                        placeholder="Email address or phone number"
                        spellCheck={false}
                        autoFocus={true}
                        value={loginData.username ? loginData.username : ""}
                        onFocus={() => {
                          setInputEmailAction(true);
                          setInputPasswordAction(false);
                        }}
                        onBlur={() => setInputEmailAction(false)}
                        onChange={handleChangeUsername}
                      />
                    </div>
                    <div
                      className={cx(
                        "password",
                        inputPasswordAction && "active-password"
                      )}
                    >
                      <input
                        type={typePassword}
                        className={cx("input-password")}
                        placeholder="Password"
                        spellCheck={false}
                        onFocus={() => {
                          setInputPasswordAction(true);
                          setInputEmailAction(false);
                        }}
                        onBlur={() => setInputPasswordAction(false)}
                        onChange={handleChangePassword}
                        onKeyDown={handleKeyDown}
                      />
                      {loginData.password && (
                        <div
                          className={cx("show-password")}
                          onClick={handleShowPassword}
                        >
                          {typePassword === "password" ? (
                            <i
                              className={cx(
                                "fa-sharp fa-regular fa-eye-slash",
                                "icon"
                              )}
                            ></i>
                          ) : (
                            <i
                              className={cx(
                                "fa-sharp fa-regular fa-eye",
                                "icon"
                              )}
                            ></i>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {errorMsg === "Not activated" ? (
                    <div className={cx("login-error")}>
                      Your account has not been activated. Please{" "}
                      <button
                        className={cx("highlight-link")}
                        onClick={handleActiveAccount}
                      >
                        click here
                      </button>{" "}
                      to activate your account.
                    </div>
                  ) : (
                    <div className={cx("login-error")}>{errorMsg}</div>
                  )}

                  <div className={cx("login-submit-btn")}>
                    <button className={cx("login-btn")} onClick={handleLogin}>
                      Log in
                    </button>
                  </div>
                  <div className={cx("forgot-password")}>
                    <Link to="" className={cx("forgot-link")}>
                      Forgotten Password?
                    </Link>
                  </div>
                  <div className={cx("line")}></div>
                  <div className={cx("create-new-account")}>
                    <button
                      className={cx("create-new-acc-btn")}
                      onClick={() => setShowSignUp(true)}
                    >
                      Create new account
                    </button>
                  </div>
                </div>
                <div className={cx("subText-login")}>
                  <Link to="" className={cx("main-text")}>
                    Create a Page{" "}
                  </Link>
                  for a celebrity, brand or business.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("login-footer")}>
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

export default Login;
