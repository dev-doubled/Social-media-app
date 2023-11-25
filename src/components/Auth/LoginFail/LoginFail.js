import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import api from "~/services/apiService";
import TokenService from "~/services/tokenServices";
import facebookImg from "~/assets/images/facebook.svg";
import userAvt from "~/assets/images/user-default.png";
import googleIcon from "~/assets/images/googleIcon.png";
import LoadingSpinner from "~/components/LoadingSpinner";
import styles from "./LoginFail.module.scss";
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
function LoginFail() {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [typePassword, setTypePassword] = useState("password");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("Password incorrect");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get("username");
    api
      .get(`/user/get-user/${username}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search]);

  const handleShowPassword = () => {
    setTypePassword(typePassword === "password" ? "text" : "password");
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === "") {
      setErrorMsg("Please enter a password");
    } else {
      setErrorMsg("");
      setLoading(true);
      const loginData = {
        username: user.email,
        password: password,
      };
      console.log(loginData);
      api
        .post("/auth/login", loginData)
        .then((response) => {
          setLoading(false);
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          TokenService.setAccessToken(accessToken);
          TokenService.setRefreshToken(refreshToken);
          // setIsAuthenticated(true);
          window.location.href = "/";
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          setLoading(false);
          if (
            errorMessage ===
            "Password incorrect. Please check your credentials."
          ) {
            setErrorMsg("Password incorrect");
          } else if (errorMessage === "Account is locked.") {
            const url = `/login/recovery?email=${user.email}`
            window.location.href = url;
          } else {
            setErrorMsg(errorMessage);
          }
        });
    }
  };
  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      <div className={cx("login-fail-wrapper")}>
        <div className={cx("login-fail-container")}>
          <div className={cx("login-fail-content")}>
            <div className={cx("big-logo")}>
              <img
                src={facebookImg}
                alt="facebook-logo"
                className={cx("image-logo")}
              />
            </div>
            <div className={cx("information-container")}>
              <div className={cx("information-header")}>
                <div className={cx("information-header-main")}>
                  <div className={cx("information-header-detail")}>
                    <div className={cx("user-avatar")}>
                      <img
                        src={user.userAvatar === "" ? userAvt : user.userAvatar}
                        alt="user-avt"
                        className={cx("user-avt")}
                      />
                    </div>
                    <div className={cx("username")}>
                      Login as {user.firstName} {user.surName}
                    </div>
                  </div>
                  <div className={cx("username-login")}>{user.email} </div>
                </div>
              </div>
              <div className={cx("information-content-main")}>
                <div className={cx("information-content-input")}>
                  <div className={cx("input-password")}>
                    <input
                      type={typePassword}
                      spellCheck={false}
                      placeholder="Password"
                      className={cx("password")}
                      autoFocus={true}
                      onChange={handleChangePassword}
                    />
                    {password && (
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
                            className={cx("fa-sharp fa-regular fa-eye", "icon")}
                          ></i>
                        )}
                      </div>
                    )}
                  </div>
                  {errorMsg === "Password incorrect" ? (
                    <div className={cx("input-error")}>
                      The password that you've entered is incorrect.{" "}
                      <button className={cx("highlight")}>
                        Forgotten password?
                      </button>
                    </div>
                  ) : (
                    <div className={cx("input-error")}>{errorMsg}</div>
                  )}
                </div>
              </div>
              <div className={cx("login-action")}>
                <button className={cx("login-btn")} onClick={handleLogin}>
                  Log in
                </button>
              </div>
              <div className={cx("login-google-action")}>
                <button className={cx("login-google-btn")}>
                  <img
                    src={googleIcon}
                    alt="google-icon"
                    className={cx("google-icon")}
                  />
                  <span className={cx("text")}>Login with google</span>
                  <span className={cx("empty")}></span>
                </button>
              </div>
              <div className={cx("forgot-password-action")}>
                <button className={cx("forgot-password-btn")}>
                  Forgotten password?
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("login-fail-footer")}>
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

export default LoginFail;
