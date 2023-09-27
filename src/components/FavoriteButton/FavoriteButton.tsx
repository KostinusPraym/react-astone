import { ResponseParams } from "../../redux/rtkQuery/favoritesApi";
import PreloaderFavorite from "../Preloaders/PreloaderFavorite";

import { ReactComponent as FavoritesImg } from "./favorite.svg";

type Props = {
  favoriteVinyl: ResponseParams | undefined | null;
  changeStatusFavorites: (e: React.MouseEvent) => void;
  isFetching: boolean;
};
const FavoriteButton = ({
  favoriteVinyl,
  isFetching,
  changeStatusFavorites,
}: Props) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center p-2"
      onClick={changeStatusFavorites}
      title="Добавить/удалить избранное"
    >
      {isFetching ? (
        <PreloaderFavorite />
      ) : (
        <FavoritesImg
          className="hover:fill-rose-400"
          fill={favoriteVinyl ? "#fb7185" : "rgb(30, 29, 29)"}
        />
      )}
    </div>
  );
};

export default FavoriteButton;
