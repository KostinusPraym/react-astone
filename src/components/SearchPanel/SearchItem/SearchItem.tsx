import React from "react";
import { Link } from "react-router-dom";

import { Vinyl } from "../../../pages/Home/Home";

import s from "./SearchItem.module.scss";

type Props = {
  vinyl: Vinyl;
};

const SearchItem = ({ vinyl }: Props) => {
  return (
    <Link to={`/card/${vinyl.id}`} className={s.searchItem}>
      <img width={40} height={40} src={vinyl.coverImage} alt="Cover" />
      <li>{vinyl.author}</li>
    </Link>
  );
};

export default SearchItem;
