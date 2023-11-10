import Home from "~/pages/Home";
import UserProfile from "~/pages/UserProfile";
import ImageViewer from "~/components/ImageViewer";
import Page from "~/components/User/UserBody/Intro/InputBio"
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/user", component: UserProfile },
  { path: "/photo", component: ImageViewer },
  { path: "/page", component: Page },
];

export { publicRoutes };
