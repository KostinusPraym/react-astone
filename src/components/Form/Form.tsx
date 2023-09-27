import React, { useRef } from "react";
import PropTypes from "prop-types";

type Props = {
  handleClick: (email: string, password: string) => void;
};

const Form = ({ handleClick }: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (!input.current) {
      return;
    }
    input.current.focus();
  }, []);

  return (
    <form
      className="flex max-w-[25rem] flex-col gap-4 p-7"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between gap-[0.6rem]">
        <label htmlFor="email">Type e-mail</label>
        <input
          className="max-w-[12rem] border-b border-solid bg-transparent"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          value={email}
          ref={input}
        />
      </div>
      <div className="flex items-center justify-between gap-[0.6rem]">
        <label htmlFor="password">Type password</label>
        <input
          className="max-w-[12rem] border-b border-solid bg-transparent"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          value={password}
        />
      </div>

      <button
        className="border border-solid p-1"
        onClick={() => handleClick(email, password)}
      >
        Submit
      </button>
    </form>
  );
};

Form.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Form;
