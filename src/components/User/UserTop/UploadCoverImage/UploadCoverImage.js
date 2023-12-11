import React from "react";
import classNames from "classnames/bind";
import api from "~/services/apiService";
import styles from "./UploadCoverImage.module.scss";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "~/configs/firebase";
const cx = classNames.bind(styles);
function UploadCoverImage({
  userData,
  setUserData,
  setCoverImage,
  coverImageSelected,
  setCoverImageSelected,
  setShowConfirmUploadCoverImage,
  setShowCoverImageOption,
  setLoadingUploadCoverImage,
  setStatusData,
}) {
  const handleSaveChange = async () => {
    setLoadingUploadCoverImage(true);
    const postData = {
      type: "coverImage",
      author: {
        userId: userData.userId,
        userName: userData.surName + " " + userData.firstName,
        userAvatar: userData.userAvatar,
      },
      caption: "",
      image: coverImageSelected,
    };

    const uploadCoverImageData = {
      userId: userData.userId,
      coverImage: coverImageSelected,
    };
    api
      .post("/post/create", postData)
      .then((res) => {
        //Handle upload cover image
        api
          .post("/user/update-cover-image", uploadCoverImageData)
          .then((response) => {
            setUserData(response.data);
            setLoadingUploadCoverImage(false);
            setShowConfirmUploadCoverImage(false);
            setShowCoverImageOption(true);
            callApiGetAllPost();
            // window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callApiGetAllPost = () => {
    api
      .get(`/post/get-all-by-user/${userData.userId}`)
      .then((response) => {
        setStatusData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelChange = async () => {
    setLoadingUploadCoverImage(true);
    //Handle delete in firebase
    try {
      // Extracting the image path from the URL
      const parsedUrl = new URL(coverImageSelected);
      const pathWithoutLeadingSlash = parsedUrl.pathname.substring(1);
      const imagePath = pathWithoutLeadingSlash.split("o/")[1];
      const decodedImagePath = decodeURIComponent(imagePath);
      // Creating a reference to the image in Firebase Storage
      const imageToDeleteRef = ref(storage, decodedImagePath);
      // Deleting the image
      await deleteObject(imageToDeleteRef);
      // Update state or perform any additional actions after deletion
      setCoverImageSelected("");
      setCoverImage(userData.coverPicture ? userData.coverPicture : null);
      setLoadingUploadCoverImage(false);
      setShowCoverImageOption(true);
      setShowConfirmUploadCoverImage(false);

      console.log("Cover image deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };
  return (
    <div className={cx("confirm-upload-cover-image-wrapper")}>
      <div className={cx("confirm-upload-cover-image-container")}>
        <div className={cx("information")}>
          <i className={cx("fa-solid fa-earth-americas", "icon")}></i>
          <div className={cx("text")}>Your cover photo is public.</div>
        </div>
        <div className={cx("actions")}>
          <button className={cx("cancel-btn")} onClick={handleCancelChange}>
            Cancel
          </button>
          <button className={cx("save-btn")} onClick={handleSaveChange}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadCoverImage;
