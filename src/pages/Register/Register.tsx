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
  const auth = getAuth();
  const db = getDatabase();

  const handleRegister = (email: string, password: string) => {
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
      .then(({ email, token, id }) => {
        set(ref(db, "user"), {
          email,
          token,
          id,
        });
      })
      .finally(() => navigate("/"))
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Registration:</h1>
      <Form title="Register" handleClick={handleRegister} />
      <Link className={styles.registerLink} to="/login">
        or login
      </Link>
    </div>
  );
};

export default Register;
