import Card from "../../components/Card/Card";
import Preloader from "../../components/Preloaders/Preloader";

import { useGetFavoritesQuery } from "../../redux/rtkQuery/favoritesApi";
import { useAppSelector } from "../../hooks/redux-hooks";

const Favorites = () => {
  const { uid } = useAppSelector((state) => state.auth);
  const { data = [], isFetching, isLoading } = useGetFavoritesQuery(uid);
  console.log(data)
  if (isFetching || isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold uppercase">Favorites</h2>
      <div className="container">
        {data && data.map((vinyl) => <Card key={vinyl.id} vinyl={vinyl} />)}
      </div>
    </>
  );
};

export default Favorites;
