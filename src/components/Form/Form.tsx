import React, { useRef } from "react";

import styles from "./Form.module.scss";

type Props = {
  handleClick: (email: string, password: string) => void;
};

const Form = ({ handleClick }: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const input = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!input.current) {
      return;
    }
    input.current.focus();
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Type e-mail</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          value={email}
          ref={input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Type password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          value={password}
        />
      </div>

      <button
        className={styles.submit}
        onClick={() => handleClick(email, password)}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
