import React from "react";
import { useParams } from "react-router";

import { useAppDispatch } from "../../hooks/redux-hooks";
import { fetchDataById } from "../../redux/actions/fetchActions";
import { Item } from "../Home/Home";

import s from "./SingleCard.module.scss";

const SingleCard = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [item, setItem] = React.useState<Item>();
  const getGenre = () => (!item ? "" : item.genre.join(", "));

  React.useEffect(() => {
    (async function () {
      try {
        if (id) {
          const data = await dispatch(fetchDataById(id));
          setItem(data.payload);
        }
      } catch (error) {}
    })();
  }, [id]);

  if (!item) {
    return null;
  }

  return (
    <div className={s.singleCard}>
      <h1 className={s.title}>{item.author}</h1>
      <div className={s.optionsGroup}>
        <div className={s.imageGroup}>
          <img width={500} height={500} src={item.coverImage} alt={s.author} />
          <button onClick={() => {}} className={s.favorite}>
            Добавить в избранное
          </button>
        </div>
        <div className={s.options}>
          <div>
            <p>Жанр:</p>
            <p>{getGenre()}</p>
          </div>
          <div>
            <p>Издание:</p>
            <p>{item.edition}</p>
          </div>
          <div>
            <p>Цена:</p>
            <p>{item.price}$</p>
          </div>
          <div>
            <p>Тип записи:</p>
            <p>{item.mediaType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
