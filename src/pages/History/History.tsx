import { useNavigate } from "react-router";

import { useGetHistoryQuery } from "../../redux/rtkQuery/historyApi";
import { useAppSelector } from "../../hooks/redux-hooks";

import HistoryItem from "../../components/HistoryItem/HistoryItem";
import Preloader from "../../components/Preloader/Preloader";

import s from "./History.module.scss";

const History = () => {
  const navigate = useNavigate();
  const { uid } = useAppSelector((state) => state.auth);
  const { data, isFetching, isLoading } = useGetHistoryQuery(uid);

  if (isFetching || isLoading) {
    return <Preloader />;
  }

  if (!uid) {
    navigate("/login");
  }

  return (
    <>
      <h2>History</h2>
      {data && (
        <ul className={s.historyContainer}>
          {Object.entries(data).map((resultList) => {
            const [key, { search, searchUrl}] = resultList;
            return <HistoryItem key={key} search={search} uniqKey={key} searchUrl={searchUrl} />;
          })}
        </ul>
      )}
    </>
  );
};

export default History;
