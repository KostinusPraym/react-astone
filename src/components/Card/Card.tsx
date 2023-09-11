import React from "react";
import { Link } from "react-router-dom";

import { Item } from "../../pages/Home/Home";

import s from "./Card.module.scss";

type Props = Item;

const Card: React.FC<Props> = (item) => {
  const genre = item.genre.join(", ");
  return (
    <Link to={`card/${item.id}`} className={s.card}>
      <img width={300} height={250} src={item.coverImage} alt="card" />
      <h2 className={s.author}>{item.author}</h2>
      <p className={s.price}>{item.price}$</p>
      <p className={s.genre}>{genre}</p>
    </Link>
  );
};

export default Card;
