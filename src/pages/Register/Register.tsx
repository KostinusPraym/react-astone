import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import Form from "../../components/Form/Form";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";

import styles from "./Register.module.scss";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userTemplate = {
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        };

        dispatch(setUser(userTemplate));
        return userTemplate;
      })
      .then((user) => {
        const db = getDatabase();
        set(ref(db, "user"), user);
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.register}>
      <div className={styles.wrapper}>
        <div className={styles.headerGroup}>
          <h1>Sign Up:</h1>
          <Link to="/">
            <img className={styles.close} src="/images/close.svg" alt="close" />
          </Link>
        </div>
        <Form handleClick={handleRegister} />
        <Link className={styles.registerLink} to="/login">
          or login
        </Link>
      </div>
    </div>
  );
};

export default Register;
