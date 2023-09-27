import { Link } from "react-router-dom";

import Form from "../../components/Form/Form";

import { useAppDispatch } from "../../hooks/redux-hooks";
import { registrationAction } from "../../redux/actions/authActions";

const Register = () => {
  const dispatch = useAppDispatch();
  const handleRegister = (email: string, password: string) => {
    dispatch(registrationAction({ email, password }));
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-[0.6rem]">
      <div className="relative border-2 border-solid px-[35px] py-[20px]">
        <div className="flex items-center justify-center">
          <h1 className="text-center text-xl">Sign Up:</h1>
          <Link to="/">
            <img
              className="absolute right-[10px] top-[10px] h-[20px] w-[20px] cursor-pointer"
              src="/images/close.svg"
              alt="close"
            />
          </Link>
        </div>
        <Form handleClick={handleRegister} />
        <Link className="relative left-[275px] underline" to="/login">
          or login
        </Link>
      </div>
    </div>
  );
};

export default Register;
