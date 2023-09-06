import React from "react";

import styles from "./Form.module.scss";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Type e-mail</label>
        <input onChange={changeHandler} id="email" type="email" value={email} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Type password</label>
        <input
          onChange={changeHandler}
          id="password"
          type="password"
          value={password}
        />
      </div>

      <button
        className={styles.submit}
        onClick={() => handleClick(email, password)}
      >
        {title}
      </button>
    </form>
  );
};

export default Form;
