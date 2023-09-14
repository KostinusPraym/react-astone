import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { registrationAction } from "../../redux/actions/authActions";

import s from "./Register.module.scss";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    try {
      const user = await dispatch(registrationAction({ email, password }));
      if (user.type === "auth/registration/fulfilled") {
        navigate("/");
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <div className={s.register}>
      <div className={s.wrapper}>
        <div className={s.headerGroup}>
          <h1>Sign Up:</h1>
          <Link to="/">
            <img className={s.close} src="/images/close.svg" alt="close" />
          </Link>
        </div>
        <Form handleClick={handleRegister} />
        <Link className={s.registerLink} to="/login">
          or login
        </Link>
      </div>
    </div>
  );
};

export default Register;
