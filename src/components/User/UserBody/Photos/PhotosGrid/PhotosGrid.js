import classNames from "classnames/bind";
import styles from "./PhotosGrid.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const listPhotos = [
  "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/400485305_1365599041016288_4027275579738651057_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9And8SE0FKcAX8ycGYG&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCNLHSvP-F9lB8k7RHy6gNDFaKF8u0S9FdRH7PzpbKhTQ&oe=655069FC",
  "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/399281206_371236178666926_3501390126080530930_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ddj9vpr4Zl8AX_uAqiw&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDrw_lhbhm0PCk9QSkI70-OuprXEoCksvuPsh0G5AdXMA&oe=6551B4E9",
  "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/400156599_880483380399672_2098961403880864070_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vvmUIv6GDnEAX-vUDLJ&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBPtSov-gNqNBi3bkKA-hrXqw1fgbfgFUA5kx4y-ltm1g&oe=6552130C",
  "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/399934976_1802744586825362_1412723132417400670_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=E-6o03Mu7esAX_TrsSR&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDx2vK2sLt80flsEAfwn5ApC8Vz_ncGfHVh1QqvZYdg0Q&oe=65519980",
  "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/398124294_1567824657086005_762626123952940304_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qKIfi5Ic9NIAX9IHySo&_nc_oc=AQnsNNv3rzE6XDUYl-AjD_0CSgYcO_Z8AzLRPR98GaRBXoOX0YPTxHN6wZQzoFaPOyM&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfAYx0i0WS5A1Zt_RzsKXjXg81V8Ac8-Ry7_WBaKDXE9vQ&oe=65515566",
  "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/395375197_1776413759467176_8188635944531579729_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=oa_-NHoaut8AX843pFF&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBRf1IW9B2e5p6KuSQSzvnmX8fKEeX33vnkNp8lQi2_Rg&oe=6551C9FF",
  "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/398176703_880135796837802_4924770810720215621_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lfzCEdrNg9gAX9TKEXS&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfBxvN-WRI0Wa1dR4wn7fCUqaB_lyEvn6UAM6TIS1GpmYA&oe=65515582",
  "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/399281361_3480117908920012_4294172118511562314_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rTCrAjffp3EAX8gP9os&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfB3OP9RYODQr3v9OdDg0O6VLuoQhRHUW3mBQx3YdzdDrA&oe=6550B41B",
  "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/397971889_710783650977878_4028687229015465248_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BBUxb1n2r-YAX-E5A5B&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCA4LsVo-c7tTlE1z_4yOWV_Ph7bNFzTQnkRprm__TaZA&oe=65517894",
];
function PhotosGrid() {
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
