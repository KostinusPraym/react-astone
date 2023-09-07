import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

type Props = {
  isLoading: boolean;
}

const Layout: React.FC<Props> = ({ isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <img className="loader" src="/images/eclipse.gif" alt="loader" />
      )}
    </div>
  );
};

export default Layout;
