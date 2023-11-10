import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./UserStory.module.scss";
import UserImg from "~/assets/images/user.jpg";
import UserStoryImg from "~/assets/images/use_2.jpg";
import StoryImg from "~/assets/images/story.jpg";
const cx = classNames.bind(styles);
function UserStory() {
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

  const arrayRenderStory = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22,
  ];
  const numberOfSlides = arrayRenderStory.length + 1;

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
    return (
      <div
        className={cx("custom-prev-arrow", {
          disabled: props.currentSlide === 0,
        })}
        onClick={() => {
          if (props.currentSlide > 0) {
            props.onClick();
          }
        }}
      >
        <i className={cx("fa-regular fa-chevron-left", "icon-prev")}></i>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    return (
      <div
        className={cx("custom-next-arrow", {
          disabled:
            props.currentSlide === props.slideCount - props.slidesToShow,
        })}
        onClick={() => {
          if (props.currentSlide < props.slideCount - props.slidesToShow) {
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
    prevArrow:
      currentSlide === 0 ? (
        <div style={{ display: "none" }}></div>
      ) : (
        <CustomPrevArrow currentSlide={currentSlide} />
      ),
    nextArrow:
      currentSlide === numberOfSlides - slidesToShow ? (
        <div style={{ display: "none" }}></div>
      ) : (
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
                <CreateStories />
                {arrayRenderStory.map((item, index) => (
                  <Story key={index} />
                ))}
              </Slider>
            </div>
          ) : (
            <div className={cx("reels-content")}>
              <div className={cx("stories-content-list")}>
                <Slider {...sliderSettings} className={cx("custom-slider")}>
                  <CreateStories />
                  {arrayRenderStory.map((item, index) => (
                    <Story key={index} />
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

const CreateStories = () => {
  return (
    <div className={cx("stories-content")}>
      <div className={cx("create-story")}>
        <div className={cx("user-image")}>
          <img src={UserImg} alt="user-avt" className={cx("user-avt")} />
        </div>
        <div className={cx("create-icon")}>
          <i className={cx("fa-regular fa-plus", "icon")}></i>
        </div>
        <div className={cx("create-text")}>Create story</div>
      </div>
    </div>
  );
};

const Story = () => {
  const storyStyle = {
    backgroundImage: `url(${StoryImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className={cx("stories-content")}>
      <div className={cx("upload-story")} style={storyStyle}>
        <div className={cx("user-avt")}>
          <img src={UserStoryImg} alt="user-avt" className={cx("user-img")} />
          <div className={cx("active-dot")}></div>
        </div>
        <div className={cx("user-name")}>Nguyen Thuc Thuy Tien</div>
      </div>
    </div>
  );
};

export default UserStory;
