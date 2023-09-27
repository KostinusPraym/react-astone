import { Link } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux-hooks";
import { useRemoveFromHistoryMutation } from "../../redux/rtkQuery/historyApi";

type Props = { search: string; searchUrl: string; uniqKey: string };

const HistoryItem = ({ search, uniqKey, searchUrl }: Props) => {
  const { uid } = useAppSelector((state) => state.auth);
  const [removeFromHistory] = useRemoveFromHistoryMutation();

  return (
    <li className="flex w-1/2 transform items-center justify-between rounded-xl bg-gray-100 p-3.5 hover:translate-x-1">
      <div className="flex items-center  gap-1 text-blue-400">
        <img className="h-8 w-8" src="/images/search.svg" alt="search"/>
        <Link to={searchUrl}>{search}</Link>
      </div>
      <img
        className="h-8 w-8 cursor-pointer"
        src="/images/close-circle.svg"
        alt="search"
        onClick={() => removeFromHistory({ uid, uniqKey })}
      />
    </li>
  );
};

export default HistoryItem;
