import { useGetHistoryQuery } from "../../redux/rtkQuery/historyApi";
import { useAppSelector } from "../../hooks/redux-hooks";

import HistoryItem from "../../components/HistoryItem/HistoryItem";
import Preloader from "../../components/Preloader/Preloader";

const History = () => {
  const { uid } = useAppSelector((state) => state.auth);
  const { data, isFetching, isLoading } = useGetHistoryQuery(uid);

  if (isFetching || isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold uppercase">History</h2>
      {data && (
        <ul className="flex flex-col items-center gap-4 text-xl">
          {Object.entries(data).map((searchResponse) => {
            const [key, { search, searchUrl }] = searchResponse;
            return (
              <HistoryItem
                key={key}
                search={search}
                uniqKey={key}
                searchUrl={searchUrl}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default History;
