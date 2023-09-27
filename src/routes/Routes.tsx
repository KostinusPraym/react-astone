import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import Preloader from "../components/Preloaders/Preloader";
import { useAuth } from "../hooks/use-auth";
import { useAppSelector } from "../hooks/redux-hooks";

const Home = lazy(() => import("../pages/Home/Home"));
const History = lazy(() => import("../pages/History/History"));
const SearchPage = lazy(() => import("../pages/SearchPage/SearchPage"));
const Register = lazy(() => import("../pages/Register/Register"));
const SingleCard = lazy(() => import("../pages/SingleCard/SingleCard"));
const Login = lazy(() => import("../pages/Login/Login"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));
const Layout = lazy(() => import("../components/Layout/Layout"));

type Props = {
  isAuth: boolean;
  statusAuth: string;
};

const PrivateRoute = ({ isAuth, statusAuth }: Props) => {
  if (statusAuth !== "SUCCESS") {
    return <Preloader />;
  }
  return <> {isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RedirectAfterSuccessAuth = ({ isAuth, statusAuth }: Props) => {
  if (statusAuth !== "SUCCESS") {
    return <Preloader />;
  }
  return <> {isAuth ? <Navigate to="/" /> : <Outlet />}</>;
};

const Public = () => {
  const { statusAuth } = useAppSelector((state) => state.auth);
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/search-page" element={<SearchPage />}></Route>
            <Route path="/card/:id" element={<SingleCard />}></Route>
            <Route
              element={<PrivateRoute isAuth={isAuth} statusAuth={statusAuth} />}
            >
              <Route path="/history" element={<History />}></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
            </Route>
          </Route>
          <Route
            element={
              <RedirectAfterSuccessAuth
                isAuth={isAuth}
                statusAuth={statusAuth}
              />
            }
          >
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Public;
