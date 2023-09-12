import React from "react";
import { getDatabase, ref, set } from "firebase/database";

import { useAppDispatch } from "../../../hooks/redux-hooks";
import { removeUser } from "../../../redux/slices/authSlice";

import s from "./LinkGroup.module.scss";

type Props = {
  email: string | null;
};

const LinkGroup: React.FC<Props> = ({ email }) => {
  const dispatch = useAppDispatch();
  const db = getDatabase();

  //TODO
  const handleOut = () => {
    dispatch(removeUser());
    set(ref(db, "user"), null);
  };

  return (
    <div>
      <span>{email}</span>
      <button className={s.out}>Favorites</button>
      <button className={s.out}>History</button>
      <button className={s.out} onClick={handleOut}>
        Out
      </button>
    </div>
  );
};

export default LinkGroup;
