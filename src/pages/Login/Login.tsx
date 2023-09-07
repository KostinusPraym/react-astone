import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import Form from "../../components/Form/Form";
import { setUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";

import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
   
    signInWithEmailAndPassword(auth, email, password)
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
      .catch((err) => alert("Invalid User"));
  };

  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.headerGroup}>
          <h1>Sign In:</h1>
          <Link to="/">
            <img className={styles.close} src="/images/close.svg" alt="close" />
          </Link>
        </div>
        <Form handleClick={handleLogin} />
        <Link className={styles.registerLink} to="/register">
          or register
        </Link>
      </div>
    </div>
  );
};

export default Login;
