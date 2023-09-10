import React from "react";

import styles from "./Home.module.scss";

type Item = {
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

    </div>
  );
};

export default Home;
