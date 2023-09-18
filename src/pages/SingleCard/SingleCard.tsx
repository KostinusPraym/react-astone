import { useParams } from "react-router";

import { useGetVinylsByIdQuery } from "../../redux/vinylsApi";
import Preloader from "../../components/Preloader/Preloader";

import s from "./SingleCard.module.scss";

const SingleCard = () => {
  const { id } = useParams();
  const {
    data: vinyls,
    isLoading,
    isFetching,
  } = useGetVinylsByIdQuery(String(id));
  const getGenre = () => (!vinyls ? "" : vinyls.genre.join(", "));

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return (
    <>
      {vinyls && (
        <div className={s.singleCard}>
          <h1 className={s.title}>{vinyls.author}</h1>
          <div className={s.optionsGroup}>
            <div className={s.imageGroup}>
              <img
                width={500}
                height={500}
                src={vinyls.coverImage}
                alt={s.author}
              />
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
                <p>{vinyls.edition}</p>
              </div>
              <div>
                <p>Цена:</p>
                <p>{vinyls.price}$</p>
              </div>
              <div>
                <p>Тип записи:</p>
                <p>{vinyls.mediaType}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCard;
