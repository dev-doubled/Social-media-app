import ImageViewer from "~/components/ImageViewer";
import Confirm from "~/components/Auth/SignUp/Confirm";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import LoginFail from "~/components/Auth/LoginFail";
import LoginRecovery from "~/components/Auth/LoginRecovery";
import UserProfile from "~/pages/UserProfile";
import Page from "~/components/Auth/LoginRecovery/PasswordTip";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/login/fail", component: LoginFail },
  { path: "/login/recovery", component: LoginRecovery },
  { path: "/profile", component: UserProfile },
  { path: "/photo", component: ImageViewer },
  { path: "/confirm", component: Confirm },
  { path: "/page", component: Page },
];

export { publicRoutes };
