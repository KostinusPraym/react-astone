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

import s from "./SingleCard.module.scss";

const SingleCard = () => {
  const navigate = useNavigate();
  const [addFavorites] = useAddInFavoritesMutation();
  const [removeFavorites] = useRemoveFromFavoritesMutation();
  const { uid } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const {
    data: vinyl,
    isLoading,
    isFetching,
  } = useGetVinylsByIdQuery(String(id));
  const { data: isFavorite, isLoading: isLoadingFavorites } =
    useGetFavoritesByIdQuery(vinyl ? { id: vinyl.id, uid } : {});

  const getGenre = () => (!vinyl ? "" : vinyl.genre.join(", "));

  const handleAddFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!uid) {
      navigate("/login");
      return;
    }
    if (!vinyl) {
      return;
    }
    if (isFavorite) {
      await removeFavorites({ id: vinyl.id, uid });
    } else {
      await addFavorites({ vinyl, uid });
    }
  };

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return (
    <>
      {vinyl && (
        <div className={s.singleCard}>
          <div className={s.headerGroup}>
            <h1 className={s.title}>{vinyl.author}</h1>
            <FavoriteIcons
              isFavorite={isFavorite}
              isLoading={isLoadingFavorites}
              handleAddFavorites={handleAddFavorites}
            />
          </div>
          <div className={s.optionsGroup}>
            <div className={s.imageGroup}>
              <img
                width={500}
                height={500}
                src={vinyl.coverImage}
                alt={s.author}
              />
              <button onClick={() => {}} className={s.favorite}>
                Добавить в избранное
              </button>
            </div>
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
      )}
    </>
  );
};

export default SingleCard;
