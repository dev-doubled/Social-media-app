import { useState } from "react";
import className from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import api from "~/services/apiService";
import LoadingSpinner from "~/components/LoadingSpinner";
import styles from "./SignUp.module.scss";
const cx = className.bind(styles);
function SignUp({ setShowSignUp }) {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const valueMonth = (month) => {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return;
    }
  };
  const valueMonthCovert = (month) => {
    switch (month) {
      case "Jan":
        return 1;
      case "Feb":
        return 2;
      case "Mar":
        return 3;
      case "Apr":
        return 4;
      case "May":
        return 5;
      case "Jun":
        return 6;
      case "Jul":
        return 7;
      case "Aug":
        return 8;
      case "Sep":
        return 9;
      case "Oct":
        return 10;
      case "Nov":
        return 11;
      case "Dec":
        return 12;
      default:
        return;
    }
  };
  const generateYearOptions = (minYear, maxYear) => {
    const options = [];
    for (let year = maxYear; year >= minYear; year--) {
      options.push(year);
    }
    return options;
  };
  const years = generateYearOptions(1905, new Date().getFullYear());
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(valueMonth(new Date().getMonth() + 1));
  const [year, setYear] = useState(new Date().getFullYear());
  const [userData, setUserData] = useState({
    firstName: "",
    surName: "",
    userName: "",
    password: "",
    dob: date + "/" + valueMonthCovert(month) + "/" + year,
    gender: null,
  });
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
  const [isSurNameEmpty, setIsSurNameEmpty] = useState(false);
  const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isDateOfBirthEmpty, setIsDateOfBirthEmpty] = useState(false);
  const [isGenderEmpty, setIsGenderEmpty] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    updateDateOfBirth(e.target.value, month, year);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    updateDateOfBirth(date, e.target.value, year);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    updateDateOfBirth(date, month, e.target.value);
  };

  const updateDateOfBirth = (selectedDate, selectedMonth, selectedYear) => {
    const formattedDate = convertDateFormat(
      `${selectedMonth} ${selectedDate}, ${selectedYear}`
    );
    setUserData({ ...userData, dob: formattedDate });
  };

  const handleYearBlur = () => {
    const inputDate = userData.dob;
    const result = compareDates(inputDate);
    if (result === false) {
      setIsDateOfBirthEmpty(true);
    } else {
      setIsDateOfBirthEmpty(false);
    }
  };

  const handleGenderChange = (e) => {
    setIsGenderEmpty(false);
    setUserData({
      ...userData,
      gender: e.target.value === "true" ? true : false,
    });
  };

  const handleSignUp = () => {
    const inputDate = userData.dob;
    const result = compareDates(inputDate);
    if (result === false) {
      setIsDateOfBirthEmpty(true);
    }
    setIsFirstNameEmpty(
      userData.firstName.trim() === "" || userData.firstName === null
    );
    setIsSurNameEmpty(
      userData.surName.trim() === "" || userData.surName === null
    );
    setIsUserNameEmpty(
      userData.userName.trim() === "" || userData.userName === null
    );
    setIsPasswordEmpty(
      userData.password.trim() === "" ||
        isValidPassword(userData.password) === false
    );
    setIsGenderEmpty(userData.gender === null);
    if (!isValidPassword(userData.password)) {
      setErrorMsg(
        "The password must consist of a minimum of 8 characters, including at least one special character."
      );
    } else if (!compareDates(userData.dob)) {
      setErrorMsg(
        "The user's birthday must be a minimum of 5 years prior to the current date."
      );
    } else if (
      userData.firstName &&
      userData.surName &&
      userData.userName &&
      userData.password &&
      result === true &&
      userData.gender !== null
    ) {
      setErrorMsg("");
      setLoading(true);
      api
        .post("/auth/signup", userData)
        .then((res) => {
          const email = res.data.email;
          const url = "/confirm?email=" + encodeURIComponent(email);
          setLoading(false);
          navigate(url);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.response.data.error);
          console.log(err.response.data.error);
        });
    }
  };

  const compareDates = (inputDate) => {
    const [day, month, year] = inputDate.split("/").map(Number);
    const inputDateTime = new Date(year, month - 1, day);
    const currentDateTime = new Date();
    const timeDifference = currentDateTime - inputDateTime;
    const fiveYearsInMilliseconds = 5 * 365.25 * 24 * 60 * 60 * 1000;
    return (
      inputDateTime < currentDateTime &&
      timeDifference >= fiveYearsInMilliseconds
    );
  };

  const convertDateFormat = (inputDate) => {
    const parsedDate = new Date(inputDate);
    if (isNaN(parsedDate)) {
      console.error("Invalid date format");
      return null;
    }
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const isValidPassword = (password) => {
    const pattern = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    return pattern.test(password);
  };

  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      <div className={cx("sign-up-wrapper")}>
        <div className={cx("sign-up-container")}>
          <div className={cx("sign-up-header")}>
            <div className={cx("main-text")}>
              <div className={cx("text")}>Sign Up</div>
              <div className={cx("close")} onClick={() => setShowSignUp(false)}>
                <i className={cx("fa-sharp fa-regular fa-xmark", "icon")}></i>
              </div>
            </div>
            <div className={cx("sub-text")}>It's quick and easy.</div>
          </div>
          <div className={cx("sign-up-content")}>
            {errorMsg && (
              <div className={cx("sign-up-error")}>
                <div className={cx("error-text")}>{errorMsg}</div>
              </div>
            )}
            <div className={cx("name-container")}>
              <div
                className={cx(
                  "first-name",
                  isFirstNameEmpty && "first-name-error"
                )}
              >
                <input
                  type="text"
                  spellCheck={false}
                  className={cx("first-name-input")}
                  placeholder="First name"
                  autoFocus={true}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  onBlur={() =>
                    setIsFirstNameEmpty(
                      userData.firstName === null ||
                        userData.firstName.trim() === ""
                    )
                  }
                  onFocus={() => setIsFirstNameEmpty(false)}
                />
                {isFirstNameEmpty && (
                  <i
                    className={cx(
                      "fa-sharp fa-solid fa-circle-exclamation",
                      "icon"
                    )}
                  ></i>
                )}
              </div>
              <div
                className={cx("sur-name", isSurNameEmpty && "sur-name-error")}
              >
                <input
                  type="text"
                  spellCheck={false}
                  className={cx("sur-name-input")}
                  placeholder="Surname"
                  onChange={(e) => handleInputChange("surName", e.target.value)}
                  onBlur={() =>
                    setIsSurNameEmpty(
                      userData.surName === null ||
                        userData.surName.trim() === ""
                    )
                  }
                  onFocus={() => setIsSurNameEmpty(false)}
                />
                {isSurNameEmpty && (
                  <i
                    className={cx(
                      "fa-sharp fa-solid fa-circle-exclamation",
                      "icon"
                    )}
                  ></i>
                )}
              </div>
            </div>
            <div
              className={cx(
                "email-phone",
                isUserNameEmpty && "email-phone-error"
              )}
            >
              <input
                type="text"
                spellCheck={false}
                className={cx("email-phone-input")}
                placeholder="Mobile number or email address"
                onChange={(e) => handleInputChange("userName", e.target.value)}
                onBlur={() =>
                  setIsUserNameEmpty(
                    userData.userName === null ||
                      userData.userName.trim() === ""
                  )
                }
                onFocus={() => setIsUserNameEmpty(false)}
              />
              {isUserNameEmpty && (
                <i
                  className={cx(
                    "fa-sharp fa-solid fa-circle-exclamation",
                    "icon"
                  )}
                ></i>
              )}
            </div>
            <div
              className={cx(
                "new-password",
                isPasswordEmpty && "new-password-error"
              )}
            >
              <input
                type="password"
                spellCheck={false}
                className={cx("new-password-input")}
                placeholder="New password"
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={() =>
                  setIsPasswordEmpty(
                    userData.password === null ||
                      userData.password.trim() === ""
                  )
                }
                onFocus={() => setIsPasswordEmpty(false)}
              />
              {isPasswordEmpty && (
                <i
                  className={cx(
                    "fa-sharp fa-solid fa-circle-exclamation",
                    "icon"
                  )}
                ></i>
              )}
            </div>
            <div className={cx("date-of-birth")}>
              <div className={cx("small-text")}>
                <div className={cx("small-text-left")}>
                  <span className={cx("text")}>Date of birth</span>
                  <i
                    className={cx(
                      "fa-sharp fa-solid fa-circle-question",
                      "icon"
                    )}
                  ></i>
                </div>
                {isDateOfBirthEmpty && (
                  <i
                    className={cx(
                      "fa-sharp fa-solid fa-circle-exclamation",
                      "icon"
                    )}
                  ></i>
                )}
              </div>

              <div
                className={cx("date-of-bird-picker")}
                onBlur={handleYearBlur}
              >
                <div className={cx("date-picker")}>
                  <select
                    className={cx("date", isDateOfBirthEmpty && "date-error")}
                    value={date}
                    onChange={handleDateChange}
                    onFocus={() => setIsDateOfBirthEmpty(false)}
                  >
                    {days.map((day, index) => (
                      <option key={index}>{day}</option>
                    ))}
                  </select>
                  <div className={cx("custom-select-arrow")}>
                    <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
                  </div>
                </div>
                <div className={cx("month-picker")}>
                  <select
                    className={cx("month", isDateOfBirthEmpty && "month-error")}
                    value={month}
                    onChange={handleMonthChange}
                    onFocus={() => setIsDateOfBirthEmpty(false)}
                  >
                    {months.map((month, index) => (
                      <option key={index}>{month}</option>
                    ))}
                  </select>
                  <div className={cx("custom-select-arrow")}>
                    <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
                  </div>
                </div>
                <div className={cx("year-picker")}>
                  <select
                    className={cx("year", isDateOfBirthEmpty && "year-error")}
                    value={year}
                    onChange={handleYearChange}
                    onFocus={() => setIsDateOfBirthEmpty(false)}
                  >
                    {years.map((year, index) => (
                      <option key={index}>{year}</option>
                    ))}
                  </select>
                  <div className={cx("custom-select-arrow")}>
                    <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("gender")}>
              <div className={cx("small-text")}>
                <div className={cx("small-text-left")}>
                  <span className={cx("text")}>Gender</span>
                  <i
                    className={cx(
                      "fa-sharp fa-solid fa-circle-question",
                      "icon"
                    )}
                  ></i>
                </div>
                {isGenderEmpty && (
                  <i
                    className={cx(
                      "fa-sharp fa-solid fa-circle-exclamation",
                      "icon"
                    )}
                  ></i>
                )}
              </div>
              <div className={cx("gender-picker-container")}>
                <div className={cx("male", isGenderEmpty && "male-error")}>
                  <label htmlFor="boy" className={cx("male-label")}>
                    Male
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="true"
                    id="boy"
                    className={cx("male-pick")}
                    checked={userData.gender === true}
                    onChange={handleGenderChange}
                  />
                </div>
                <div className={cx("female", isGenderEmpty && "female-error")}>
                  <label htmlFor="girl" className={cx("female-label")}>
                    Female
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="false"
                    id="girl"
                    className={cx("female-pick")}
                    checked={userData.gender === false}
                    onChange={handleGenderChange}
                  />
                </div>
              </div>
            </div>
            <div className={cx("information-text")}>
              People who use our service may have uploaded your contact
              information to Facebook.
              <Link to=""> Learn more.</Link>
            </div>
            <div className={cx("privacy-text")}>
              By clicking Sign Up, you agree to our <Link to="">Terms</Link>,{" "}
              <Link to="">Privacy Policy</Link> and{" "}
              <Link to="">Cookies Policy</Link>. You may receive SMS
              notifications from us and can opt out at any time.
            </div>
            <div className={cx("sign-up-submit")}>
              <button className={cx("sign-up-btn")} onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
