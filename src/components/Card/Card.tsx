import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Vinyl } from "../../pages/Home/Home";
import {
  useAddInFavoritesMutation,
  useGetFavoritesByIdQuery,
  useRemoveFromFavoritesMutation,
} from "../../redux/favoritesApi";
import { useAppSelector } from "../../hooks/redux-hooks";

import FavoriteIcons from "./FavoriteIcons/FavoriteIcons";

import s from "./Card.module.scss";

type Props = {
  vinyl: Vinyl;
};

const Card = ({ vinyl }: Props) => {
  const navigate = useNavigate();
  const [addFavorites] = useAddInFavoritesMutation();
  const [removeFavorites] = useRemoveFromFavoritesMutation();
  const { uid } = useAppSelector((state) => state.auth);
  const genre = vinyl.genre.join(", ");
  const { data: favoriteVinyl, isLoading } = useGetFavoritesByIdQuery({
    id: vinyl.id,
    uid,
  });

  const changeStatusFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!uid) {
      navigate("/login");
      return;
    }
    if (favoriteVinyl) {
      await removeFavorites({ id: vinyl.id, uid });
    } else {
      await addFavorites({ vinyl, uid });
    }
  };

  return (
    <Link to={`/card/${vinyl.id}`} className={s.card}>
      <img width={300} height={250} src={vinyl.coverImage} alt="vinyl cover" />
      <div className={s.optionsWrapper}>
        <div className={s.options}>
          <h2 className={s.author}>{vinyl.author}</h2>
          <p className={s.price}>{vinyl.price}$</p>
          <p className={s.genre}>{genre}</p>
        </div>
        <FavoriteIcons
          favoriteVinyl={favoriteVinyl}
          isLoading={isLoading}
          changeStatusFavorites={changeStatusFavorites}
        />
      </div>
    </Link>
  );
};

export default Card;
