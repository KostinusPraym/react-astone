import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Vinyl } from "../../redux/rtkQuery/vinylsApi";
import {
  useAddInFavoritesMutation,
  useGetFavoritesByIdQuery,
  useRemoveFromFavoritesMutation,
} from "../../redux/rtkQuery/favoritesApi";
import { useAppSelector } from "../../hooks/reduxHooks";

import FavoriteButton from "../FavoriteButton/FavoriteButton";

type Props = {
  vinyl: Vinyl;
};

const Card = ({ vinyl }: Props) => {
  const navigate = useNavigate();
  const [addFavorites] = useAddInFavoritesMutation();
  const [removeFavorites] = useRemoveFromFavoritesMutation();
  const { uid } = useAppSelector((state) => state.auth);
  const genre = vinyl.genre.join(", ");
  const { data: favoriteVinyl, isFetching } = useGetFavoritesByIdQuery({
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
    <Link className="w-[18.8rem] hover:bg-gray-100" to={`/card/${vinyl.id}`}>
      <img
        className="h-[15.6rem] w-[18.8rem]"
        src={vinyl.coverImage}
        alt="vinyl cover"
      />
      <div className="flex justify-between">
        <div className="flex flex-col p-2">
          <h2 className="mb-[0.3rem] text-lg">{vinyl.author}</h2>
          <p className="mb-[0.3rem] text-lg font-bold">{vinyl.price}$</p>
          <p className="text-sm text-gray-500">{genre}</p>
        </div>
        <FavoriteButton
          favoriteVinyl={favoriteVinyl}
          changeStatusFavorites={changeStatusFavorites}
          isFetching={isFetching}
        />
      </div>
    </Link>
  );
};

Card.propTypes = {
  vinyl: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    mediaType: PropTypes.string.isRequired,
    edition: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
  }),
};

export default Card;
