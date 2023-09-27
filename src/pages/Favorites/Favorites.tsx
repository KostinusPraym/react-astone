import { useGetFavoritesQuery } from "../../redux/rtkQuery/favoritesApi";
import Preloader from "../../components/Preloader/Preloader";
import { useAppSelector } from "../../hooks/redux-hooks";
import Card from "../../components/Card/Card";
import { getVinylsForFavorite } from "../../utils/getVinylsForFavorite";

const Favorites = () => {
  const { uid } = useAppSelector((state) => state.auth);
  const { data, isFetching, isLoading } = useGetFavoritesQuery(uid);
  
  if (isFetching || isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold uppercase">Favorites</h2>
      <div className="container">
        {data &&
          data.map((vinyl) => (
            <Card key={vinyl.id} vinyl={vinyl} />
          ))}
      </div>
    </>
  );
};

export default Favorites;
