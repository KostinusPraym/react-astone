import { ResponseParams } from "../../../redux/favoritesApi";

import s from "./FavoriteIcons.module.scss";

import { ReactComponent as FavoritesImg } from "./favorite.svg";

type Props = {
  isFavorite: ResponseParams | undefined;
  isLoading: boolean;
  handleAddFavorites: (e: React.MouseEvent) => void;
};

const FavoriteIcons = ({
  isFavorite,
  isLoading,
  handleAddFavorites,
}: Props) => {
  return (
    <div className={s.favorite}>
      <div onClick={handleAddFavorites} title="Добавить/удалить избранное">
        {isLoading ? null : (
          <FavoritesImg
            fill={isFavorite ? "rgb(246, 109, 109)" : "rgb(30, 29, 29)"}
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteIcons;
