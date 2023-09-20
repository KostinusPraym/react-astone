import { useNavigate } from "react-router-dom";

import { useGetFavoritesQuery } from "../../redux/favoritesApi";
import Preloader from "../../components/Preloader/Preloader";
import { useAppSelector } from "../../hooks/redux-hooks";
import Card from "../../components/Card/Card";
import { getVinylsForFavorite } from "../../utils/getVinylsForFavorite";

const Favorites = () => {
  const navigate = useNavigate();
  const { uid } = useAppSelector((state) => state.auth);
  const { data, isFetching, isLoading } = useGetFavoritesQuery(uid);

  if (!uid) {
    navigate("/login");
  }

  if (isFetching || isLoading) {
    return <Preloader />;
  }

  return (
    <div className="container">
      {data &&
        getVinylsForFavorite(data).map((vinyl) => (
          <Card key={vinyl.id} vinyl={vinyl} />
        ))}
    </div>
  );
};

export default Favorites;
