
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { logoutAction } from "../../../redux/actions/authActions";

import s from "./LinkGroup.module.scss";

type Props = {
  email: string | null;
};

const LinkGroup = ({ email }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.links}>
      <div className={s.linkGroup}>
        <Link to="/favorites" className={s.favorite}>
          Favorites
        </Link>
        <Link to="/" className={s.out}>
          History
        </Link>
        <button className={s.out} onClick={() => dispatch(logoutAction())}>
          Out
        </button>
      </div>
      {email && (
        <div className={s.avatar}>
          <p className={s.emailValue}>{email.slice(0, 1)}</p>
        </div>
      )}
    </div>
  );
};

export default LinkGroup;
