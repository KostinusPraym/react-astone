import React from "react";
import { Link } from "react-router-dom";

import { Vinyl } from "../../pages/Home/Home";

import s from "./Card.module.scss";

const Card: React.FC<Vinyl> = (vinyl) => {
  const genre = vinyl.genre.join(", ");
  return (
    <Link to={`card/${vinyl.id}`} className={s.card}>
      <img width={300} height={250} src={vinyl.coverImage} alt="vinyl cover" />
      <h2 className={s.author}>{vinyl.author}</h2>
      <p className={s.price}>{vinyl.price}$</p>
      <p className={s.genre}>{genre}</p>
    </Link>
  );
};

export default Card;
