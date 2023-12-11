import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import api from "~/services/apiService";
import PhotosGrid from "./PhotosGrid";
import styles from "./Photos.module.scss";
const cx = classNames.bind(styles);
function Photos({ userData }) {
  const [listPhotos, setListPhotos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/photo/get-all-photo/${userData.userId}`
        );
        setListPhotos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userData.userId) {
      fetchData();
    }
  }, [userData.userId]);
  return (
    <div className={cx("photos-wrapper")}>
      <div className={cx("photos-container")}>
        <div className={cx("main")}>
          <div className={cx("title")}>Photos</div>
          <div className={cx("see-more-photo")}>See All Photos</div>
        </div>
        {listPhotos && listPhotos.length > 0 && (
          <PhotosGrid listPhotos={listPhotos.slice(0, 9)} />
        )}
      </div>
    </div>
  );
}

export default Photos;
