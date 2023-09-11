import React from "react";

import Card from "../../components/Card/Card";

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

type Props = {
  items: Item[];
};

const Home: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.home}>
      {items.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
};

export default Home;
