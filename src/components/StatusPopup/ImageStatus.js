import classNames from "classnames/bind";
import styles from "./StatusPopup.module.scss";
const cx = classNames.bind(styles);

function ImageStatus({ image }) {
  return (
    <div className={cx("status-image")}>
      <div className={cx("image-item")}>
        <img src={image} alt="status-img" className={cx("image")} />
      </div>
    </div>
  );
}

export default ImageStatus;
