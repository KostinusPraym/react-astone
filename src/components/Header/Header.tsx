import React from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

import { useAuth } from "../../hooks/use-auth";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeUser } from "../../redux/slices/userSlice";

import styles from "./Header.module.scss";

const Header = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useAppDispatch();
  const db = getDatabase();

  const handleOut = () => {
    dispatch(removeUser());
    set(ref(db, "user"), null);
  };

  return (
    <header>
      <Link className={styles.logoGroup} to="/">
        <img src="/images/logo.png" alt="logo" />
        <p>Vinyl Music</p>
      </Link>
      {isAuth ? (
        <div>
          <span>{email}</span>
          <button className={styles.out} onClick={handleOut}>
            Out
          </button>
        </div>
      ) : (
        <Link to="/login" className={styles.login}>
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
