import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";
import { useAppSelector } from "../../hooks/redux-hooks";
import Preloader from "../Preloaders/Preloader";

import LinkGroup from "./LinkGroup/LinkGroup";

const Header = () => {
  const { isAuth, email } = useAuth();
  const { statusAuth } = useAppSelector((state) => state.auth);

  if (statusAuth !== "SUCCESS") {
    return <Preloader />;
  }

  return (
    <header className="mb-5 flex items-center justify-between gap-5 border-b border-solid py-5 ">
      <Link className="flex items-center gap-4" to="/">
        <img src="/images/logo.png" alt="logo" />
        <p>Vinyl Music</p>
      </Link>
      {isAuth ? (
        <LinkGroup email={email} />
      ) : (
        <Link className="w-24 border border-solid p-2 text-center" to="/login">
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
