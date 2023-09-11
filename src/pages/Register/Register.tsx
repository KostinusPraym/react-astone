import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { registrationAction } from "../../redux/actions/authActions";
import { saveUser, setUser } from "../../redux/slices/userSlice";

import styles from "./Register.module.scss";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    try {
      const user = await dispatch(registrationAction({ email, password }));

      if (user.type === "auth/registration/fulfilled") {
        dispatch(saveUser(email));
        dispatch(setUser({ email }));
        navigate("/");
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
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
