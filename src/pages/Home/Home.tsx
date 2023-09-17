import React from "react";

import Card from "../../components/Card/Card";

import { useGetVinylsQuery } from "../../redux/vinylsApi";
import Preloader from "../../components/Preloader/Preloader";



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
  const { data: vinyls = [], isLoading } = useGetVinylsQuery({search: ""});

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="container">
      {vinyls.map((vinyl) => (
        <Card key={vinyl.id} {...vinyl} />
      ))}
    </div>
  );
};

export default Home;
