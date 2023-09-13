import React from "react";

import Card from "../../components/Card/Card";

import { useGetVinylsQuery } from "../../redux/vinylsApi";

import styles from "./Home.module.scss";

export type Vinyl = {
  id: string;
  author: string;
  price: string;
  genre: string[];
  mediaType: string;
  edition: string;
  coverImage: string;
};

const Home = () => {
  const { data: vinyls = [], isLoading } = useGetVinylsQuery();

  if (isLoading) {
    return <img className="loader" src="/images/eclipse.gif" alt="loader" />;
  }
  return (
    <div className={styles.home}>
      {vinyls.map((vinyl: Vinyl) => (
        <Card key={vinyl.id} {...vinyl} />
      ))}
    </div>
  );
};

export default Home;
