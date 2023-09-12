import React from "react";
import toast from "react-hot-toast";

import Card from "../../components/Card/Card";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { fetchData } from "../../redux/actions/fetchActions";
import { setItems } from "../../redux/slices/itemsSlice";
import { useAppSelector } from "../../hooks/redux-hooks";

import styles from "./Home.module.scss";

export type Item = {
  id: string;
  author: string;
  price: string;
  genre: string[];
  mediaType: string;
  edition: string;
  coverImage: string;
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const items: Item[] = useAppSelector((state) => state.items.items);

  React.useEffect(() => {
    (async function () {
      try {
        const data = await dispatch(fetchData());
        dispatch(setItems(data.payload));
      } catch (error) {
        const typedError = error as Error;
        toast.error(typedError.message);
      }
    })();
  }, [dispatch]);

  return (
    <div className={styles.home}>
      {items.map((item: Item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Home;
