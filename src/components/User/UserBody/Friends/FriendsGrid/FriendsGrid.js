import classNames from "classnames/bind";
import styles from "./FriendsGrid.module.scss";
import Friend from "./Friend";
const cx = classNames.bind(styles);
const listFriends = [
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Nguyen Hoang Long",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Nguyen Thuc Thuy Tien",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Tran Thao Linh",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Jennie",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Rosé ",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Lisa",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
    name: "Jiso",
  },
  {
    avatar:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/158690694_284138899731990_5871759233142503543_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=0LPcUtL8VzoAX_6RV72&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDUIOcOEtlrGt8QsQDa0I2X1gARuhhM3L-d6tTh24O_Rg&oe=6574471B",
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
            <Friend friend={friend} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsGrid;
