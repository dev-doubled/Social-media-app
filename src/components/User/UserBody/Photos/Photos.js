import classNames from "classnames/bind";
import PhotosGrid from "./PhotosGrid";
import styles from "./Photos.module.scss";
const cx = classNames.bind(styles);
function Photos() {
  return (
    <div className={cx("photos-wrapper")}>
      <div className={cx("photos-container")}>
        <div className={cx("main")}>
          <div className={cx("title")}>Photos</div>
          <div className={cx("see-more-photo")}>See All Photos</div>
        </div>
        <PhotosGrid />
      </div>
    </div>
  );
}

export default Photos;
