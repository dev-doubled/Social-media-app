// import Home from "~/pages/Home";
// import Login from "./pages/Login";
import { deleteObject, ref } from "firebase/storage";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { storage } from "./config/firebase";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const postData = JSON.parse(localStorage.getItem("postContent"));
      const postImage = JSON.parse(localStorage.getItem("postImage"));
      if (postData || postImage) {
        const confirmationMessage = `Reload site?. Changes you made may not be saved.`;
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };
    const cleanup = async () => {
      const postData = JSON.parse(localStorage.getItem("postContent"));
      const postImage = JSON.parse(localStorage.getItem("postImage"));
      const postImageSave = JSON.parse(localStorage.getItem("postImageSave"));
      if (postData || postImage || postImageSave) {
        localStorage.removeItem("postContent");
        localStorage.removeItem("postImage");
        try {
          const parsedUrl = new URL(postImageSave);
          const pathWithoutLeadingSlash = parsedUrl.pathname.substring(1);
          const imagePath = pathWithoutLeadingSlash.split("o/")[1];
          const decodedImagePath = decodeURIComponent(imagePath);
          const imageToDeleteRef = ref(storage, decodedImagePath);
          await deleteObject(imageToDeleteRef);
          localStorage.removeItem("postImageSave");
          console.log("File deleted successfully");
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
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated}/>} /> */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
