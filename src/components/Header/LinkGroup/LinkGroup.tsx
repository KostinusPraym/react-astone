import React from "react";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { logoutAction } from "../../../redux/actions/authActions";

import s from "./LinkGroup.module.scss";

type Props = {
  email: string | null;
};

const LinkGroup: React.FC<Props> = ({ email }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <span>{email}</span>
      {/* TODO */}
      <button className={s.out}>Favorites</button>
      <button className={s.out}>History</button>
      <button className={s.out} onClick={() => dispatch(logoutAction())}>
        Out
      </button>
    </div>
  );
};

export default LinkGroup;
