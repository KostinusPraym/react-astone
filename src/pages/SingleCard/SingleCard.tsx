import { useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useGetVinylsByIdQuery } from "../../redux/rtkQuery/vinylsApi";
import Preloader from "../../components/Preloader/Preloader";
import ShareButton from "../../components/ShareButton/ShareButton";
import {
  useAddInFavoritesMutation,
  useGetFavoritesByIdQuery,
  useRemoveFromFavoritesMutation,
} from "../../redux/rtkQuery/favoritesApi";
import { useAppSelector } from "../../hooks/redux-hooks";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import { FeatureContext } from "../../context";

const SingleCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { uid } = useAppSelector((state) => state.auth);

  const { isTelegramShareEnabled } = useContext(FeatureContext);

  const [addFavorites] = useAddInFavoritesMutation();
  const [removeFavorites] = useRemoveFromFavoritesMutation();
  const getGenre = () => vinyl && vinyl.genre.join(", ");

  const { data: vinyl, isLoading } = useGetVinylsByIdQuery(String(id));
  const { data: favoriteVinyl, isFetching } = useGetFavoritesByIdQuery({
    id: String(id),
    uid,
  });

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
      <div className="flex flex-col">
        <div className="mb-[10px] flex items-center justify-between">
          <h1 className="text-[32px] font-bold">{vinyl.author}</h1>
          <div className="flex items-center gap-1">
            {isTelegramShareEnabled && <ShareButton />}
            <FavoriteButton
              favoriteVinyl={favoriteVinyl}
              isFetching={isFetching}
              changeStatusFavorites={changeStatusFavorites}
            />
          </div>
        </div>
        <div className="flex gap-[40px]">
          <img width={500} height={500} src={vinyl.coverImage} alt={vinyl.author} />
          <div className="flex flex-col gap-[15px]">
            <div className="flex">
              <p className="w-[180px] font-bold">Жанр:</p>
              <p>{getGenre()}</p>
            </div>
            <div className="flex">
              <p className="w-[180px] font-bold">Издание:</p>
              <p>{vinyl.edition}</p>
            </div>
            <div className="flex">
              <p className="w-[180px] font-bold">Цена:</p>
              <p>{vinyl.price}$</p>
            </div>
            <div className="flex">
              <p className="w-[180px] font-bold">Тип записи:</p>
              <p>{vinyl.mediaType}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
