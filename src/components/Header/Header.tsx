import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";

import LinkGroup from "./LinkGroup/LinkGroup";

import styles from "./Header.module.scss";

const Header = () => {
  const { isAuth, email } = useAuth();

  return (
    <header>
      <Link className={styles.logoGroup} to="/">
        <img src="/images/logo.png" alt="logo" />
        <p>Vinyl Music</p>
      </Link>
      {isAuth ? <LinkGroup email={email} /> : <Link to="/login">Login</Link>}
    </header>
  );
};

export default Header;
