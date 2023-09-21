import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useGetVinylsByIdQuery } from "../../redux/vinylsApi";
import Preloader from "../../components/Preloader/Preloader";
import {
  useAddInFavoritesMutation,
  useGetFavoritesByIdQuery,
  useRemoveFromFavoritesMutation,
} from "../../redux/favoritesApi";
import { useAppSelector } from "../../hooks/redux-hooks";
import FavoriteIcons from "../../components/Card/FavoriteIcons/FavoriteIcons";
import SearchPanel from "../../components/SearchPanel/SearchPanel";

import s from "./SingleCard.module.scss";

const SingleCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { uid } = useAppSelector((state) => state.auth);

  const [addFavorites] = useAddInFavoritesMutation();
  const [removeFavorites] = useRemoveFromFavoritesMutation();
  const getGenre = () => vinyl && vinyl.genre.join(", ");

  const { data: vinyl, isLoading } = useGetVinylsByIdQuery(String(id));
  const { data: favoriteVinyl, isLoading: isLoadingFavorites } =
    useGetFavoritesByIdQuery({ id: String(id), uid });

  const changeStatusFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!uid) {
      navigate("/login");
      return;
    }
    if (!vinyl) {
      return;
    }
    if (favoriteVinyl) {
      await removeFavorites({ id: vinyl.id, uid });
    } else {
      await addFavorites({ vinyl, uid });
    }
  };

  if (isLoading || !vinyl) {
    return <Preloader />;
  }

  return (
    <>
      <SearchPanel />
      <div className={s.singleCard}>
        <div className={s.headerGroup}>
          <h1 className={s.title}>{vinyl.author}</h1>
          <FavoriteIcons
            favoriteVinyl={favoriteVinyl}
            isLoading={isLoadingFavorites}
            changeStatusFavorites={changeStatusFavorites}
          />
        </div>
        <div className={s.optionsGroup}>
          <img width={500} height={500} src={vinyl.coverImage} alt={s.author} />
          <div className={s.options}>
            <div>
              <p>Жанр:</p>
              <p>{getGenre()}</p>
            </div>
            <div>
              <p>Издание:</p>
              <p>{vinyl.edition}</p>
            </div>
            <div>
              <p>Цена:</p>
              <p>{vinyl.price}$</p>
            </div>
            <div>
              <p>Тип записи:</p>
              <p>{vinyl.mediaType}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
