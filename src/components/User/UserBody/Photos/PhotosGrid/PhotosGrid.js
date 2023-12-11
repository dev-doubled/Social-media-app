import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./PhotosGrid.module.scss";
const cx = classNames.bind(styles);
function PhotosGrid({ listPhotos }) {
  return (
    <div className={cx("photos-grid-wrapper")}>
      <div className={cx("photos-grid-container")}>
        <div className={cx("grid-photos")}>
          {listPhotos.map((photo, index) => {
            const photoUrl = "/photo?psrc=" + encodeURIComponent(photo);
            return (
              <Link
                to={photoUrl}
                className={cx("photo", {
                  "photo-1": listPhotos.length === 9,
                  "photo-2": listPhotos.length === 6,
                })}
                style={{
                  backgroundImage: `url(${photo})`,
                }}
                key={index}
              ></Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotosGrid;
