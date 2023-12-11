import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "~/configs/firebase";
import styles from "./LeavePage.module.scss";
const cx = classNames.bind(styles);
function LeavePage({ setShowLeavePage, typeLeavePage }) {
  const navigate = useNavigate();
  const handleLeave = async () => {
    const postDataUser = JSON.parse(localStorage.getItem("postContentUser"));
    const postImageUser = JSON.parse(localStorage.getItem("postImageUser"));
    const postImageSaveUser = JSON.parse(
      localStorage.getItem("postImageSaveUser")
    );
    if (postDataUser || postImageUser || postImageSaveUser) {
      localStorage.removeItem("postContentUser");
      localStorage.removeItem("postImageUser");
      localStorage.removeItem("postImageSaveUser");
      //Delete image on firebase
      try {
        if (postImageSaveUser) {
          const parsedUrlUser = new URL(postImageSaveUser);
          const pathWithoutLeadingSlashUser =
            parsedUrlUser.pathname.substring(1);
          const imagePathUser = pathWithoutLeadingSlashUser.split("o/")[1];
          const decodedImagePathUser = decodeURIComponent(imagePathUser);
          const imageToDeleteRefUser = ref(storage, decodedImagePathUser);
          await deleteObject(imageToDeleteRefUser);
          localStorage.removeItem("postImageSaveUser");
          console.log("File deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting file:", error.message);
      }
      navigate(typeLeavePage);
      setShowLeavePage(false);
    }
  };
  return (
    <div className={cx("leave-page-wrapper")}>
      <div className={cx("leave-page-container")}>
        <div className={cx("header")}>
          <div className={cx("title")}>Leave Page?</div>
          <div className={cx("close")} onClick={() => setShowLeavePage(false)}>
            <i className={cx("fa-regular fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("content")}>
          You have unsaved changes that will be lost if you leave the page.
        </div>
        <div className={cx("action")}>
          <button
            className={cx("editing-btn")}
            onClick={() => setShowLeavePage(false)}
          >
            Keep Editing
          </button>
          <button className={cx("leave-btn")} onClick={handleLeave}>
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeavePage;
