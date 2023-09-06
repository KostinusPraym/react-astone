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
    const db = getDatabase();
    
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userTemplate = {
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        };

        dispatch(
          setUser(userTemplate)
        );
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
      .catch((err) => alert("Invalid User"));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Login:</h1>
      <Form title="Login" handleClick={handleLogin} />
      <Link className={styles.registerLink} to="/register">
        or register
      </Link>
    </div>
  );
};

export default Login;
