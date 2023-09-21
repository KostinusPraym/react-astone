import { Outlet } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux-hooks";

import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

const Layout = () => {
  const { status } = useAppSelector((state) => state.auth);

  if (status !== "SUCCESS") {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
