import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";
import api from "~/services/apiService";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "~/configs/firebase";
import styles from "./CreateStatusUser.module.scss";
import UserImg from "~/assets/images/user-default.png";
const cx = classNames.bind(styles);

function CreateStatusUser({
  closeCreateStatus,
  setStatusText,
  userData,
  setLoadingProfile,
  setStatusData,
}) {
  const [postData, setPostData] = useState({
    type: "normal",
    author: {
      userId: userData.userId,
      userName: userData.surName + " " + userData.firstName,
      userAvatar: userData.userAvatar,
    },
    caption: "",
    image: "",
  });
  const [postContent, setPostContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [showEmoji, setShowEmoji] = useState(false);
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [activePostBtn, setActivePostBtn] = useState(false);
  const textareaRef = useRef(null);
  const fileInputImageRef = useRef();

  useEffect(() => {
    const content = JSON.parse(localStorage.getItem("postContentUser"));
    const imagePreview = JSON.parse(localStorage.getItem("postImageUser"));
    const imageSave = JSON.parse(localStorage.getItem("postImageSaveUser"));
    if (content || imageSave) {
      setPostData({ ...postData, caption: content, image: imageSave });
      setPostContent(content);
      setActivePostBtn(true);
    }
    if (imagePreview) {
      setPostImagePreview(imagePreview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Automatically resize the textarea when the content is changed
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    // Calculate the number of rows based on scrollHeight and clientHeight
    const extraLines =
      (textareaRef.current.scrollHeight - textareaRef.current.clientHeight) /
      24;
    const calculatedRows = Math.max(1, Math.ceil(extraLines));
    setTextareaRows(calculatedRows);
  }, [postContent]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    if (newContent) {
      setPostData({ ...postData, caption: newContent });
      setPostContent(newContent);
      setStatusText(newContent);
      setActivePostBtn(true);
      localStorage.setItem("postContentUser", JSON.stringify(newContent));
    } else {
      setPostData({ ...postData, caption: "" });
      setPostContent("");
      setStatusText("");
      setActivePostBtn(false);
      localStorage.removeItem("postContentUser");
    }
  };

  const handleClickImage = () => {
    fileInputImageRef.current.click();
  };

  const handleChangeImage = async (e) => {
    setActivePostBtn(false);
    setLoadingImg(true);
    let file = null;

    //Preview Image

    if (e.target.files.length === 1) {
      file = e.target.files[0];
      const url = URL.createObjectURL(file);

      if (postImagePreview) {
        URL.revokeObjectURL(postImagePreview);
      }
      localStorage.setItem("postImageUser", JSON.stringify(url));

      setPostImagePreview(url);
    }

    //Upload Image to Firebase

    const imageRef = ref(
      storage,
      `postImages/${userData.userId}/${file.name + v4()}`
    );
    try {
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setPostData({ ...postData, image: downloadURL });
      localStorage.setItem("postImageSaveUser", JSON.stringify(downloadURL));
      setActivePostBtn(true);
      setLoadingImg(false);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const handleClickEmoji = (e) => {
    e.stopPropagation();
    setShowEmoji((val) => !val);
  };

  const onEmojiClick = (e) => {
    setPostContent((pre) => pre + e.emoji);
    textareaRef.current.focus();
  };

  const handleDeleteImagePreview = async () => {
    setLoadingImg(true);
    //Delete image from firebase
    try {
      // Extracting the image path from the URL
      const parsedUrl = new URL(postData.image);
      const pathWithoutLeadingSlash = parsedUrl.pathname.substring(1);
      const imagePath = pathWithoutLeadingSlash.split("o/")[1];
      const decodedImagePath = decodeURIComponent(imagePath);
      // Creating a reference to the image in Firebase Storage
      const imageToDeleteRef = ref(storage, decodedImagePath);
      // Deleting the image
      await deleteObject(imageToDeleteRef);

      // Update state or perform any additional actions after deletion
      setPostData({ ...postData, image: "" });
      setPostImagePreview(null);
      localStorage.removeItem("postImageUser");
      localStorage.removeItem("postImageSaveUser");
      setActivePostBtn(false);
      setLoadingImg(false);
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  const handlePostStatus = () => {
    //Call API to create new post
    setLoadingProfile(true);
    api
      .post("/post/create", postData)
      .then((response) => {
        setLoadingProfile(false);
        setStatusText("");
        localStorage.removeItem("postContentUser");
        localStorage.removeItem("postImageUser");
        localStorage.removeItem("postImageSaveUser");
        callApiGetAllPost();
        closeCreateStatus();
      })
      .catch((error) => {
        console.log(error);
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

  return (
    <>
      <div className={cx("create-post-wrapper")}>
        <div
          className={cx("create-post-container")}
          onClick={() => setShowEmoji(false)}
        >
          {showEmoji && (
            <div className={cx("emojiPickerContainer")}>
              <EmojiPicker
                width={280}
                height={290}
                emojiStyle={EmojiStyle.FACEBOOK}
                searchDisabled={true}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
          <div className={cx("create-header")}>
            <div className={cx("empty")}></div>
            <div className={cx("title")}>Create Post</div>
            <div
              className={cx("close-icon")}
              onClick={() => closeCreateStatus()}
            >
              <i className={cx("fa-light fa-xmark", "icon")}></i>
            </div>
          </div>
          <div className={cx("user-info")}>
            <img
              src={userData.userAvatar ? userData.userAvatar : UserImg}
              alt="user-avt"
              className={cx("user-avt")}
            />
            <div className={cx("info")}>
              <div className={cx("username")}>
                {userData.surName + " " + userData.firstName}
              </div>
              <div className={cx("post-audience")}>
                <i
                  className={cx(
                    "fa-sharp fa-solid fa-earth-americas",
                    "world-icon"
                  )}
                ></i>
                <span className={cx("text")}>Public</span>
                <i
                  className={cx("fa-sharp fa-solid fa-caret-down", "down-icon")}
                ></i>
              </div>
            </div>
          </div>
          <div className={cx("input-information")}>
            <div className={cx("input-status")}>
              <div className={cx("input")}>
                <textarea
                  placeholder="What's on your mind?"
                  className={cx("content-input")}
                  value={postData.caption}
                  onChange={handleContentChange}
                  rows={textareaRows}
                  ref={textareaRef}
                  spellCheck={false}
                ></textarea>
              </div>
              <div className={cx("icon-reaction")}>
                <i
                  className={cx("fa-light fa-face-smile", "smile-icon")}
                  onClick={(e) => handleClickEmoji(e)}
                ></i>
              </div>
            </div>
            <div className={cx("input-img-container")}>
              <div className={cx("input-img")}>
                {postImagePreview === null && (
                  <div
                    className={cx("upload-mainFile")}
                    onClick={handleClickImage}
                  >
                    <div className={cx("upload-content")}>
                      <div className={cx("upload-img")}>
                        <div className={cx("upload-icon")}>
                          <i
                            className={cx("fa-solid fa-file-plus", "plus-icon")}
                          ></i>
                        </div>
                      </div>
                      <div className={cx("upload-title")}>
                        Add Photos/Videos
                      </div>
                      <div className={cx("upload-subTitle")}>
                        or drag and drop
                      </div>
                    </div>
                    <input
                      ref={fileInputImageRef}
                      type="file"
                      accept="image/*"
                      name="img"
                      multiple
                      className={cx("image-input")}
                      style={{ display: "none" }}
                      onChange={handleChangeImage}
                    />
                  </div>
                )}

                <div className={cx("upload-image-preview")}>
                  {postImagePreview && (
                    <div className={cx("image-preview-container")}>
                      <div className={cx("image-upload")}>
                        <img
                          src={postImagePreview}
                          alt="img-review"
                          className={cx("image-preview")}
                        />
                        {loadingImg && (
                          <>
                            <ClipLoader
                              size={40}
                              color="#0866ff"
                              className={cx("loading-spinner")}
                            />
                            <div className={cx("overlay-loading")}></div>
                          </>
                        )}
                      </div>
                      {!loadingImg && (
                        <>
                          <div
                            className={cx("delete-img")}
                            onClick={() => handleDeleteImagePreview()}
                          >
                            <i
                              className={cx("fa-light fa-xmark", "delete-icon")}
                            ></i>
                          </div>
                          <div className={cx("overlay-img")}></div>
                        </>
                      )}
                    </div>
                  )}
                  {postImagePreview && !loadingImg && (
                    <div
                      className={cx("add-more-photo")}
                      onClick={handleClickImage}
                    >
                      <div className={cx("add-more-icon")}>
                        <i
                          className={cx("fa-solid fa-file-plus", "plus-icon")}
                        ></i>
                      </div>
                      <div className={cx("add-more-title")}>
                        Add Photos/Videos
                      </div>
                      <input
                        ref={fileInputImageRef}
                        type="file"
                        accept="image/*"
                        name="img"
                        multiple
                        className={cx("image-input")}
                        style={{ display: "none" }}
                        onChange={handleChangeImage}
                      />
                    </div>
                  )}
                </div>

                <div className={cx("upload-subFile")}>
                  <div className={cx("upload-subFile-content")}>
                    <div className={cx("left")}>
                      <div className={cx("phone-icon")}>
                        <i
                          className={cx("fa-regular fa-mobile-notch", "icon")}
                        ></i>
                      </div>
                    </div>
                    <div className={cx("text-content")}>
                      Add photos and videos from your mobile device.
                    </div>
                    <div className={cx("add-btn")}>Add</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("post-action")}>
            <div className={cx("add-options-post")}>
              <div className={cx("add-text")}>Add to your post</div>
              <div className={cx("list-actions")}>
                <div
                  className={cx("image")}
                  style={{ backgroundColor: "#e4f0d5" }}
                >
                  <i
                    className={cx("fa-regular fa-image", "icon")}
                    style={{ color: "#45bd62" }}
                  ></i>
                </div>
                <div className={cx("user-tag")}>
                  <i
                    className={cx("fa-solid fa-user-tag", "icon")}
                    style={{ color: "#1877f2" }}
                  ></i>
                </div>
                <div className={cx("smile")}>
                  <i
                    className={cx("fa-regular fa-face-grin", "icon")}
                    style={{ color: "#f7b928" }}
                  ></i>
                </div>
                <div className={cx("location")}>
                  <i
                    className={cx("fa-sharp fa-solid fa-location-dot", "icon")}
                    style={{ color: "#f5533d" }}
                  ></i>
                </div>
                <div className={cx("gif")}>
                  <i
                    className={cx("fa-solid fa-gif", "icon")}
                    style={{ color: "#d9d9d9" }}
                  ></i>
                </div>
                <div className={cx("dots")}>
                  <i
                    className={cx("fa-regular fa-ellipsis", "icon")}
                    style={{ color: "#606770" }}
                  ></i>
                </div>
              </div>
            </div>

            <div
              className={cx(
                activePostBtn ? "post-btn-action-active" : "post-btn-action"
              )}
            >
              <button
                className={cx("post-btn")}
                disabled={!activePostBtn}
                onClick={handlePostStatus}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStatusUser;
