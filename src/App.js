import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { publicHeaderRoutes, publicRoutes } from "~/routes";
import LoginFail from "./components/Auth/LoginFail";
import LoginRecovery from "./components/Auth/LoginRecovery";
import Confirm from "./components/Auth/SignUp/Confirm";
import LeavePage from "./components/LeavePage";
import { storage } from "./configs/firebase";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./layouts/Header";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isRecovery, setRecovery] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showLeavePage, setShowLeavePage] = useState(false);
  const [typeLeavePage, setTypeLeavePage] = useState("");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isOpenCreateStatus, setIsOpenCreateStatus] = useState(false);
  const [isOpenCreateStatusUser, setIsOpenCreateStatusUser] = useState(false);
  const [isOpenStatusPopup, setIsOpenStatusPopup] = useState(false);
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const postData = JSON.parse(localStorage.getItem("postContent"));
      const postImage = JSON.parse(localStorage.getItem("postImage"));
      const postDataUser = JSON.parse(localStorage.getItem("postContentUser"));
      const postImageUser = JSON.parse(localStorage.getItem("postImageUser"));
      if (postData || postImage || postDataUser || postImageUser) {
        const confirmationMessage = `Reload site?. Changes you made may not be saved.`;
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };
    const cleanup = async () => {
      const postData = JSON.parse(localStorage.getItem("postContent"));
      const postImage = JSON.parse(localStorage.getItem("postImage"));
      const postImageSave = JSON.parse(localStorage.getItem("postImageSave"));
      const postDataUser = JSON.parse(localStorage.getItem("postContentUser"));
      const postImageUser = JSON.parse(localStorage.getItem("postImageUser"));
      const postImageSaveUser = JSON.parse(
        localStorage.getItem("postImageSaveUser")
      );
      if (
        postData ||
        postImage ||
        postImageSave ||
        postDataUser ||
        postImageUser ||
        postImageSaveUser
      ) {
        localStorage.removeItem("postContent");
        localStorage.removeItem("postImage");
        localStorage.removeItem("postContentUser");
        localStorage.removeItem("postImageUser");
        try {
          // Handle postImageSave
          if (postImageSave) {
            const parsedUrl = new URL(postImageSave);
            const pathWithoutLeadingSlash = parsedUrl.pathname.substring(1);
            const imagePath = pathWithoutLeadingSlash.split("o/")[1];
            const decodedImagePath = decodeURIComponent(imagePath);
            const imageToDeleteRef = ref(storage, decodedImagePath);
            await deleteObject(imageToDeleteRef);
            localStorage.removeItem("postImageSave");
            console.log("File deleted successfully");
          }

          // Handle postImageSaveUser
          if (postImageSaveUser) {
            const parsedUrlUser = new URL(postImageSaveUser);
            const pathWithoutLeadingSlashUser =
              parsedUrlUser.pathname.substring(1);
            const imagePathUser = pathWithoutLeadingSlashUser.split("o/")[1];
            const decodedImagePathUser = decodeURIComponent(imagePathUser);
            const imageToDeleteRefUser = ref(storage, decodedImagePathUser);
            await deleteObject(imageToDeleteRefUser);
            localStorage.removeItem("postImageSaveUser");
            console.log("User's file deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting file:", error.message);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      cleanup();
    };
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  return (
    <AuthProvider>
      <Router>
        {showLeavePage && (
          <LeavePage
            setShowLeavePage={setShowLeavePage}
            typeLeavePage={typeLeavePage}
          />
        )}
        <Routes>
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login
                  onLogin={handleLogin}
                  setIsSignup={setIsSignup}
                  setIsLoginFail={setIsLoginFail}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login/fail"
            element={
              !isLoggedIn && isLoginFail ? (
                <LoginFail onLogin={handleLogin} setRecovery={setRecovery} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login/recovery"
            element={isRecovery ? <LoginRecovery /> : <Navigate to="/login" />}
          />
          <Route
            path="/confirm"
            element={isSignup ? <Confirm /> : <Navigate to="/login" />}
          />

          {publicHeaderRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLoggedIn ? (
                    <div>
                      <Header
                        onLogout={handleLogout}
                        setShowLeavePage={setShowLeavePage}
                        setTypeLeavePage={setTypeLeavePage}
                        setIsLoginFail={setIsLoginFail}
                        isEditProfileOpen={isEditProfileOpen}
                        isOpenCreateStatus={isOpenCreateStatus}
                        isOpenCreateStatusUser={isOpenCreateStatusUser}
                        isOpenStatusPopup={isOpenStatusPopup}
                      />
                      <Page
                        isEditProfileOpen={isEditProfileOpen}
                        setIsEditProfileOpen={setIsEditProfileOpen}
                        isOpenCreateStatus={isOpenCreateStatus}
                        setIsOpenCreateStatus={setIsOpenCreateStatus}
                        isOpenCreateStatusUser={isOpenCreateStatusUser}
                        setIsOpenCreateStatusUser={setIsOpenCreateStatusUser}
                        isOpenStatusPopup={isOpenStatusPopup}
                        setIsOpenStatusPopup={setIsOpenStatusPopup}
                      />
                    </div>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}

          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
