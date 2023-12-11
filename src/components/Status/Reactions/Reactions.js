import classNames from "classnames/bind";
import Angry from "~/assets/images/angry.png";
import Care from "~/assets/images/care.png";
import Haha from "~/assets/images/haha.png";
import Like from "~/assets/images/like.png";
import Love from "~/assets/images/love.png";
import Sad from "~/assets/images/sad.png";
import Wow from "~/assets/images/wow.png";
import styles from "./Reactions.module.scss";
const cx = classNames.bind(styles);

const reactions = [
  {
    id: 1,
    react: Like,
    text: "Like",
  },
  {
    id: 2,
    react: Love,
    text: "Love",
  },
  {
    id: 3,
    react: Care,
    text: "Care",
  },
  {
    id: 4,
    react: Haha,
    text: "Haha",
  },
  {
    id: 5,
    react: Wow,
    text: "Wow",
  },
  {
    id: 6,
    react: Sad,
    text: "Sad",
  },
  {
    id: 7,
    react: Angry,
    text: "Angry",
  },
];
function Reactions({ setShowReactions, onReactionClick }) {
  const handleReactionsMouseEnter = (e) => {
    e.stopPropagation();
  };

  const handleReactionsMouseLeave = () => {
    setShowReactions(false);
  };
  return (
    <div
      className={cx("reactions")}
      onMouseEnter={handleReactionsMouseEnter}
      onMouseLeave={handleReactionsMouseLeave}
    >
      {reactions.map((reaction, index) => (
        <div
          className={cx("reaction")}
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onReactionClick(reaction.text);
          }}
        >
          <img src={reaction.react} alt="react" className={cx("react")} />
        </div>
      ))}
    </div>
  );
}

export default Reactions;
