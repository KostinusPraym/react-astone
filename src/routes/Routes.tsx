import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Preloader from "../components/Preloader/Preloader";

const Home = lazy(() => import("../pages/Home/Home"));
const Register = lazy(() => import("../pages/Register/Register"));
const SingleCard = lazy(() => import("../pages/SingleCard/SingleCard"));
const Login = lazy(() => import("../pages/Login/Login"));
const Layout = lazy(() => import("../components/Layout/Layout"));

const Public = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/search-page" element={<h1>search-page</h1>}></Route>
            <Route path="/card/:id" element={<SingleCard />}></Route>
            <Route path="/history-page" element={<h1>history-page</h1>}></Route>
            <Route path="/favorite-page" element={<h1>f</h1>}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Public;
