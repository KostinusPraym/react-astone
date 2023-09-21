import { ResponseParams } from "../../../redux/favoritesApi";

import s from "./FavoriteIcons.module.scss";

import { ReactComponent as FavoritesImg } from "./favorite.svg";

type Props = {
  favoriteVinyl: ResponseParams | undefined;
  isLoading: boolean;
  changeStatusFavorites: (e: React.MouseEvent) => void;
};

const FavoriteIcons = ({
  favoriteVinyl,
  isLoading,
  changeStatusFavorites,
}: Props) => {
  return (
    <div className={s.favorite}>
      <div onClick={changeStatusFavorites} title="Добавить/удалить избранное">
        {isLoading ? null : (
          <FavoritesImg
            fill={favoriteVinyl ? "rgb(246, 109, 109)" : "rgb(30, 29, 29)"}
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteIcons;
