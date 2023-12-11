import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "~/assets/images/logo.png";
import styles from "./ImageViewer.module.scss";
const cx = classNames.bind(styles);
function ImageViewer() {
  const [zoomScale, setZoomScale] = useState(1.0);
  const [showZoomIn, setShowZoomIn] = useState(true);
  const [showZoomOut, setShowZoomOut] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const imageSrc = searchParams.get("psrc");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        goBack();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleZoomIn = () => {
    if (zoomScale < 2.0) {
      setZoomScale(zoomScale + 0.3);
      setShowZoomIn(zoomScale + 0.3 < 2.0);
    }
    setShowZoomOut(true);
  };

  const handleZoomOut = () => {
    if (zoomScale > 1.0) {
      setZoomScale(zoomScale - 0.3);
    }
    if (zoomScale === 1.0) {
      setShowZoomOut(false);
      setShowZoomIn(true);
    }
  };
  return (
    <div className={cx("image-viewer-wrapper")}>
      <div className={cx("image-view-header")}>
        <div className={cx("header-left")}>
          <div className={cx("close")} onClick={goBack}>
            <i className={cx("fa-light fa-xmark", "icon")}></i>
          </div>
          <Link to="/" preventScrollReset className={cx("logo")}>
            <img src={Logo} alt="logo" className={cx("logo-image")} />
          </Link>
        </div>
        <div className={cx("header-right")}>
          {showZoomIn ? (
            <div className={cx("zoom-in-active")} onClick={handleZoomIn}>
              <i
                className={cx("fa-regular fa-magnifying-glass-plus", "icon")}
              ></i>
            </div>
          ) : (
            <div className={cx("zoom-in")}>
              <i
                className={cx("fa-regular fa-magnifying-glass-plus", "icon")}
              ></i>
            </div>
          )}

          {showZoomOut ? (
            <div className={cx("zoom-out-active")} onClick={handleZoomOut}>
              <i
                className={cx("fa-regular fa-magnifying-glass-minus", "icon")}
              ></i>
            </div>
          ) : (
            <div className={cx("zoom-out")}>
              <i
                className={cx("fa-regular fa-magnifying-glass-minus", "icon")}
              ></i>
            </div>
          )}

          <div className={cx("tag")}>
            <i className={cx("fa-solid fa-tag", "icon")}></i>
          </div>
          <div className={cx("full-screen")}>
            <i
              className={cx(
                "fa-sharp fa-regular fa-arrow-up-right-and-arrow-down-left-from-center fa-flip-both",
                "icon"
              )}
            ></i>
          </div>
        </div>
      </div>
      <div className={cx("image-view-container")}>
        <img
          src={imageSrc}
          alt="img-viewer"
          className={cx("image-viewer")}
          style={{
            transform: `scale(${zoomScale})`,
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}

export default ImageViewer;
