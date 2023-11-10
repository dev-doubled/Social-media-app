import classNames from "classnames/bind";
import styles from "./FriendsGrid.module.scss";
import Friend from "./Friend";
const cx = classNames.bind(styles);
const listFriends = [
  {
    avatar:
      "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/334199204_524960329745555_5355258949075402918_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=G_4g5d7Kln0AX8EwFAu&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfCpuMDnmJ2-e9Sh7IuXHYMdvaHkLCQ9lGC31-hRj3_33g&oe=6552BCBB",
    name: "Nguyen Hoang Long",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/387121088_855105386026215_3631450063208964910_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QtJVynSPyRQAX8aVY3s&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfCuyJOr3ALfLe2XD0TfGzLpOgB9G-bId9qm-UPPAtLslw&oe=655246CF",
    name: "Nguyen Thuc Thuy Tien",
  },
  {
    avatar:
      "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/364150205_739965691266418_1133638136852325050_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=P8JNI56EPS8AX_0yilU&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDyneQJk7kWcHvoiQWjj8VFabJfLOEUmrsBwRIAtfcanw&oe=655106A3",
    name: "Tran Thao Linh",
  },
  {
    avatar:
      "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/387826099_886708702818932_6510833097906274512_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=onTQjaJO0WoAX9UQ_De&_nc_oc=AQkb-69BrkHf1KJ4B51_3vKBnjk_JYBplOACqXwAbMXvvtR06euLSqxoC8LFju_xy-s&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBZawcCG5TDmJBn-nP8ecsqXMsDgqwqCGXBHT_0L-tILA&oe=6551663E",
    name: "Jennie",
  },
  {
    avatar:
      "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/329431198_554787789948726_4980632073711939323_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qHzBEoMGC-wAX9nVqUQ&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfA69Z5pDc7nJ-pvf5QKMqGE4Yg5qMd5BF8UlU1YSiDTkA&oe=6552BF57",
    name: "Rosé ",
  },
  {
    avatar:
      "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/340275887_6063354860425221_5591373436293178066_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rIGkKA6BaAUAX9nbUEt&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfDTNX8t_W_htrp2QhxCR0xKP0zfLJKIdQQKdj5vbcZW-A&oe=65515FAF  ",
    name: "Lisa",
  },
  {
    avatar:
      "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/347627899_222523727180290_7208439095638648992_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0gTjwADbeC4AX97AVIO&_nc_oc=AQlh31DIet-0aJkG_uu4FKaYW2J1r0MLRppx-YOF9AUrTMCdMebVtZxcKts067vjx2U&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCoxn2MeOM1FEk69k-3VaKU6kLVNpA-frZsndbxXLBGtg&oe=6551B763",
    name: "Jiso",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/191985192_340690064079968_5750107449348201486_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=Qn9YpjutcN4AX-z60sb&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfAHwqDsq0mPTENi210JVkd15Br_Y-iK5JhHmAJYw4lcUA&oe=65744D99",
    name: "Justin Bieber",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Ariana Grande",
  },
];
function FriendsGrid() {
  return (
    <div className={cx("friends-grid-wrapper")}>
      <div className={cx("friends-grid-container")}>
        <div className={cx("grid-friends")}>
          {listFriends.map((friend, index) => (
            <Friend friend={friend} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsGrid;
