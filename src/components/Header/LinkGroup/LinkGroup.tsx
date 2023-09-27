import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { logout } from "../../../redux/actions/authActions";

type Props = {
  email: string | null;
};

const LinkGroup = ({ email }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-[0.9rem]">
      <div className="flex gap-[0.4rem]">
        <Link
          to="/favorites"
          className="w-[5.6rem] border border-solid p-[0.4rem] text-center"
        >
          Favorites
        </Link>
        <Link
          to="/history"
          className="w-[5.6rem] border border-solid p-[0.4rem] text-center"
        >
          History
        </Link>
        <button
          className="w-[5.6rem] border border-solid p-[0.4rem] text-center"
          onClick={() => dispatch(logout())}
        >
          Out
        </button>
      </div>
      {email && (
        <div className="flex h-10 w-10 items-center justify-center rounded-[50%] bg-teal-400">
          <p className="text-2xl uppercase text-white">{email.slice(0, 1)}</p>
        </div>
      )}
    </div>
  );
};

export default LinkGroup;
