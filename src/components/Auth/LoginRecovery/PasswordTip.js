import classNames from "classnames/bind";
import styles from "./LoginRecovery.module.scss";
const cx = classNames.bind(styles);

function PasswordTip({ setShowPasswordTip }) {
  return (
    <div className={cx("password-tip-wrapper")} onClick={() => setShowPasswordTip(false)}>
      <div className={cx("password-tip-container")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("header")}>
          <div className={cx("empty")}></div>
          <div className={cx("title")}>Create a strong password</div>
          <div className={cx("close")} onClick={() => setShowPasswordTip(false)}>
            <i className={cx("fa-regular fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("content")}>
          As you create your password, remember the following:
          <ul className={cx("tips-list")}>
            <li className={cx("tip")}>
              It <span className={cx("highlight")}>should not</span> contain
              your name.
            </li>
            <li className={cx("tip")}>
              It <span className={cx("highlight")}>should not</span> contain a
              common dictionary word.
            </li>
            <li className={cx("tip")}>
              It <span className={cx("highlight")}>should</span> contain one or
              more numbers.
            </li>
            <li className={cx("tip")}>
              It <span className={cx("highlight")}>should</span> have both
              uppercase and lowercase characters.
            </li>
            <li className={cx("tip")}>
              It <span className={cx("highlight")}>should</span> be at least six
              characters long.
            </li>
          </ul>
          <div className={cx("ok-action")} onClick={() => setShowPasswordTip(false)}>
            <button className={cx("ok-btn")}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordTip;
