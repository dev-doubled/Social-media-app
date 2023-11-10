import React from "react";
import classNames from "classnames/bind";
import styles from "./StatusPosting.module.scss";
import Love from "~/assets/images/love.png";
import Care from "~/assets/images/care.png";
import Haha from "~/assets/images/haha.png";
import Wow from "~/assets/images/wow.png";
import Sad from "~/assets/images/sad.png";
import Angry from "~/assets/images/angry.png";
const cx = classNames.bind(styles);

function ReactionUI({ reactionContent }) {
  if (!reactionContent) {
    return (
      <div>
        <i className={cx("fa-light fa-thumbs-up", "like-icon")}></i>
        <span className={cx("text")}>Like</span>
      </div>
    );
  }
  switch (reactionContent) {
    case "Like":
      return (
        <div>
          <i
            className={cx("fa-solid fa-thumbs-up", "like-icon")}
            style={{ color: "#0566ff", fontSize: "18px" }}
          ></i>
          <span
            className={cx("text")}
            style={{ color: "#0566ff", fontWeight: "600" }}
          >
            Like
          </span>
        </div>
      );
    case "Love":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <i className={cx("fa-light fa-heart", "love-icon")}></i> */}
          <img
            src={Love}
            alt="love-img"
            style={{ width: "26px", height: "30px", padding: "6px 4px" }}
          />
          <span className={cx("text")} style={{ color: "#e82042" }}>
            Love
          </span>
        </div>
      );
    case "Care":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <i className={cx("fa-light fa-heart", "love-icon")}></i> */}
          <img
            src={Care}
            alt="love-img"
            style={{ width: "26px", height: "30px", padding: "6px 4px" }}
          />
          <span className={cx("text")} style={{ color: "#f7b227" }}>
            Care
          </span>
        </div>
      );
    case "Haha":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <i className={cx("fa-light fa-heart", "love-icon")}></i> */}
          <img
            src={Haha}
            alt="love-img"
            style={{ width: "26px", height: "30px", padding: "6px 4px" }}
          />
          <span className={cx("text")} style={{ color: "#f7b42e" }}>
            Haha
          </span>
        </div>
      );
    case "Wow":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <i className={cx("fa-light fa-heart", "love-icon")}></i> */}
          <img
            src={Wow}
            alt="love-img"
            style={{ width: "26px", height: "30px", padding: "6px 4px" }}
          />
          <span className={cx("text")} style={{ color: "#f7b32a" }}>
            Wow
          </span>
        </div>
      );
    case "Sad":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <i className={cx("fa-light fa-heart", "love-icon")}></i> */}
          <img
            src={Sad}
            alt="love-img"
            style={{ width: "26px", height: "30px", padding: "6px 4px" }}
          />
          <span className={cx("text")} style={{ color: "#f7b632" }}>
            Sad
          </span>
        </div>
      );
    case "Angry":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <i className={cx("fa-light fa-heart", "love-icon")}></i> */}
          <img
            src={Angry}
            alt="love-img"
            style={{ width: "26px", height: "30px", padding: "6px 4px" }}
          />
          <span className={cx("text")} style={{ color: "#eb7c22" }}>
            Angry
          </span>
        </div>
      );
    default:
      return null;
  }
}

export default ReactionUI;
