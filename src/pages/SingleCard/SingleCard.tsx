import { useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import Preloader from "../../components/Preloaders/Preloader";
import ShareButton from "../../components/ShareButton/ShareButton";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import SearchPanel from "../../components/SearchPanel/SearchPanel";

import {
  useAddInFavoritesMutation,
  useGetFavoritesByIdQuery,
  useRemoveFromFavoritesMutation,
} from "../../redux/rtkQuery/favoritesApi";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useGetVinylsByIdQuery } from "../../redux/rtkQuery/vinylsApi";
import { FeatureContext } from "../../context";

const SingleCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

    if (favoriteVinyl && vinyl) {
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
      {vinyl && (
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
              <img
                width={500}
                height={500}
                src={vinyl.coverImage}
                alt={vinyl.author}
              />
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
      )}
    </>
  );
};

export default SingleCard;
