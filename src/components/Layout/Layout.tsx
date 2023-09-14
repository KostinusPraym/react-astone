import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

const Layout = () => {
  // if (!isLoading) {
  //   return null;
  // }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
