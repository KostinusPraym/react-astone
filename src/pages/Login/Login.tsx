import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { loginAction } from "../../redux/actions/authActions";


import s from "./Login.module.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await dispatch(loginAction({ email, password }));
      if (user.type === "auth/login/fulfilled") {
        navigate("/");
      }
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <div className={s.login}>
      <div className={s.wrapper}>
        <div className={s.headerGroup}>
          <h1>Sign In:</h1>
          <Link to="/">
            <img className={s.close} src="/images/close.svg" alt="close" />
          </Link>
        </div>
        <Form handleClick={handleLogin} />
        <Link className={s.registerLink} to="/register">
          or register
        </Link>
      </div>
    </div>
  );
};

export default Login;
