import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import styles from "./CreateStatus.module.scss";
import UserImg from "~/assets/images/user.jpg";
const cx = classNames.bind(styles);
function CreateStatus({ setOpenCreateStatus }) {
  const [postContent, setPostContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [showEmoji, setShowEmoji] = useState(false);
  const [postImagePreview, setPostImagePreview] = useState([]);
  // const [postImage, setPostImage] = useState([]);
  const textareaRef = useRef(null);
  const fileInputImageRef = useRef();

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

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

  const handleClickImage = () => {
    fileInputImageRef.current.click();
  };

  const handlePreviewImage = (e) => {
    const length = e.target.files.length;
    const files = [];
    const previews = [];

    for (let i = 0; i < length; i++) {
      const file = e.target.files[i];
      files.push(file);
      let url = URL.createObjectURL(file);
      previews.push(url);
    }

    setPostImagePreview((prev) => [...prev, ...previews]);
  };

  useEffect(() => {
    return () => {
      postImagePreview && URL.revokeObjectURL(postImagePreview.preview);
    };
  }, [postImagePreview]);

  const handleClickEmoji = (e) => {
    e.stopPropagation();
    setShowEmoji((val) => !val);
  };

  const onEmojiClick = (e) => {
    setPostContent((pre) => pre + e.emoji);
    textareaRef.current.focus();
  };

  const handlePostStatus = () => {
    console.log(postContent);
    console.log(postImagePreview.length);
  };

  const handleDeleteImage = (index) => {
    const updatedPreview = [...postImagePreview];
    updatedPreview.splice(index, 1);
    setPostImagePreview(updatedPreview);
  };

  return (
    <div className={cx("overlay")}>
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
            onClick={() => setOpenCreateStatus(false)}
          >
            <i className={cx("fa-light fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("user-info")}>
          <img src={UserImg} alt="user-avt" className={cx("user-avt")} />
          <div className={cx("info")}>
            <div className={cx("username")}>Dinh Duy</div>
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
                value={postContent}
                onChange={handleContentChange}
                rows={textareaRows}
                ref={textareaRef}
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
              {postImagePreview.length < 1 && (
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
                    <div className={cx("upload-title")}>Add Photos/Videos</div>
                    <div className={cx("upload-subTitle")}>
                      or drag and drop
                    </div>
                  </div>
                  <input
                    ref={fileInputImageRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className={cx("image-input")}
                    style={{ display: "none" }}
                    onChange={handlePreviewImage}
                  />
                </div>
              )}

              <div className={cx("upload-image-preview")}>
                {postImagePreview.length > 0 &&
                  postImagePreview.map((item, index) => (
                    <div className={cx("image-preview-container")} key={index}>
                      <img
                        src={item}
                        alt="img-review"
                        className={cx("image-preview")}
                      />
                      <div
                        className={cx("delete-img")}
                        onClick={() => handleDeleteImage(index)}
                      >
                        <i
                          className={cx("fa-light fa-xmark", "delete-icon")}
                        ></i>
                      </div>
                      <div className={cx("overlay-img")}></div>
                    </div>
                  ))}
                {postImagePreview.length > 0 && (
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
                      multiple
                      className={cx("image-input")}
                      style={{ display: "none" }}
                      onChange={handlePreviewImage}
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
              postContent || postImagePreview.length > 0
                ? "post-btn-action-active"
                : "post-btn-action"
            )}
          >
            <button
              className={cx("post-btn")}
              disabled={postContent === "" && postImagePreview.length === 0}
              onClick={handlePostStatus}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStatus;
