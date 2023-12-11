import React from "react";
import classNames from "classnames/bind";
import styles from "./RightSideBar.module.scss";
import PageImg from "~/assets/images/page.jpg";
import UserAvt from "~/assets/images/user_1.jpg";
const cx = classNames.bind(styles);

function RightSideBar() {
  const userContacts = Array(15).fill(null);
  return (
    <div className={cx("right-side-bar-wrapper")}>
      <div className={cx("right-side-bar-container")}>
        <div className={cx("right-side-bar-top")}>
          <div className={cx("main-text")}>
            <div className={cx("title")}>Your Pages and profiles</div>
            <div className={cx("dot-icon")}>
              <i className={cx("fa-regular fa-ellipsis", "icon")}></i>
            </div>
          </div>
          <div className={cx("page-information")}>
            <div className={cx("page-details")}>
              <img src={PageImg} alt="page-img" className={cx("page-img")} />
              <div className={cx("page-name")}>
                APC - Avoid Plagiarism in Coursera
              </div>
            </div>
            <div className={cx("page-options")}>
              <div className={cx("switch-page")}>
                <i className={cx("fa-light fa-circle-user", "icon")}></i>
                <span className={cx("text")}>Switch into page</span>
              </div>
              <div className={cx("create-promotion")}>
                <i className={cx("fa-light fa-bullhorn", "icon")}></i>
                <span className={cx("text")}>Create promotion</span>
              </div>
            </div>
          </div>
          <div className={cx("line")}>
            <hr />
          </div>
          <div className={cx("right-bar-contact")}>
            <div className={cx("contact-header")}>
              <span className={cx("text")}>Contacts</span>
              <div className={cx("search-icon")}>
                <i className={cx("fa-regular fa-magnifying-glass", "icon")}></i>
              </div>
              <div className={cx("setting-icon")}>
                <i className={cx("fa-regular fa-ellipsis", "icon")}></i>
              </div>
            </div>

            <div className={cx("contact-container")}>
              {userContacts.map((_, index) => (
                <div key={index} className={cx("user-contact")}>
                  <div className={cx("user-contact-info")}>
                    <div className={cx("user-avt")}>
                      <img
                        src={UserAvt}
                        alt="user-avt"
                        className={cx("uer-img")}
                      />
                      <div className={cx("activity")}></div>
                    </div>
                    <div className={cx("username")}>Hannie</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
