import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

type Props = {
  isLoading: boolean;
};

const Layout: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
