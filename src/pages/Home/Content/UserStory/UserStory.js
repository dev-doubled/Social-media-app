import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./UserStory.module.scss";
import UserImg from "~/assets/images/user-default.png";
import { userStoryList } from "~/datas/UserStoryData";
const cx = classNames.bind(styles);
function UserStory({ userData }) {
  const [renderTitle, setRenderTitle] = useState("Stories");
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateSlidesToShow = () => {
    if (window.innerWidth <= 1600) {
      return 4.85;
    } else {
      return 5.5;
    }
  };
  const updateSlidesToScroll = () => {
    if (window.innerWidth <= 1600) {
      return 4;
    } else {
      return 5;
    }
  };
  const [slidesToShow, setSlidesToShow] = useState(updateSlidesToShow);
  const [slidesToScroll, setSlidesToScroll] = useState(updateSlidesToScroll);

  const numberOfSlides = userStoryList.length + 1;

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(updateSlidesToShow);
      setSlidesToScroll(updateSlidesToScroll);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const CustomPrevArrow = (props) => {
    const isDisabled = props.currentSlide === 0;

    return (
      <div
        className={cx("custom-prev-arrow", {
          disabled: isDisabled,
        })}
        onClick={() => {
          if (!isDisabled) {
            props.onClick();
          }
        }}
      >
        <i className={cx("fa-regular fa-chevron-left", "icon-prev")}></i>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const isDisabled =
      props.currentSlide === props.slideCount - props.slidesToShow;

    return (
      <div
        className={cx("custom-next-arrow", {
          disabled: isDisabled,
        })}
        onClick={() => {
          if (!isDisabled) {
            props.onClick();
          }
        }}
      >
        <i className={cx("fa-regular fa-chevron-right", "icon-next")}></i>
      </div>
    );
  };

  const sliderSettings = {
    infinite: false,
    swipe: false,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
    nextArrow: (
      <CustomNextArrow
        currentSlide={currentSlide}
        slideCount={numberOfSlides}
        slidesToShow={slidesToShow}
      />
    ),
  };

  return (
    <div className={cx("user-story-wrapper")}>
      <div className={cx("user-story-container")}>
        <div className={cx("topic")}>
          <div
            className={
              renderTitle === "Stories" ? cx("stories-active") : cx("stories")
            }
            onClick={() => setRenderTitle("Stories")}
          >
            <i className={cx("fa-solid fa-book-open", "story-icon")}></i>
            <span className={cx("story-text")}>Stories</span>
          </div>
          <div
            className={
              renderTitle === "Reels" ? cx("reels-active") : cx("reels")
            }
            onClick={() => setRenderTitle("Reels")}
          >
            <i className={cx("fa-solid fa-clapperboard-play", "reel-icon")}></i>
            <span className={cx("reel-text")}>Reels</span>
          </div>
        </div>
        <div className={cx("stories-container")}>
          {renderTitle === "Stories" ? (
            <div className={cx("stories-content-list")}>
              <Slider {...sliderSettings} className={cx("custom-slider")}>
                <CreateStories userData={userData} />
                {userStoryList.map((story, index) => (
                  <Story key={index} story={story} />
                ))}
              </Slider>
            </div>
          ) : (
            <div className={cx("reels-content")}>
              <div className={cx("stories-content-list")}>
                <Slider {...sliderSettings} className={cx("custom-slider")}>
                  <CreateStories userData={userData} />
                  {userStoryList.map((story, index) => (
                    <Story key={index} story={story} />
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const CreateStories = ({ userData }) => {
  return (
    <div className={cx("stories-content")}>
      <div className={cx("create-story")}>
        <div className={cx("user-image")}>
          <img
            src={userData.userAvatar ? userData.userAvatar : UserImg}
            alt="user-avt"
            className={cx("user-avt")}
          />
        </div>
        <div className={cx("create-icon")}>
          <i className={cx("fa-regular fa-plus", "icon")}></i>
        </div>
        <div className={cx("create-text")}>Create story</div>
      </div>
    </div>
  );
};

const Story = ({ story }) => {
  const storyStyle = {
    backgroundImage: `url(${story.userStory})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className={cx("stories-content")}>
      <div className={cx("upload-story")} style={storyStyle}>
        <div className={cx("user-avt")}>
          <img src={story.avatar} alt="user-avt" className={cx("user-img")} />
          <div className={cx("active-dot")}></div>
        </div>
        <div className={cx("user-name")}>{story.name}</div>
      </div>
    </div>
  );
};

export default UserStory;
