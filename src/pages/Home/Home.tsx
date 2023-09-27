import React from "react";

import Card from "../../components/Card/Card";

import { useGetVinylsQuery } from "../../redux/rtkQuery/vinylsApi";
import Preloader from "../../components/Preloader/Preloader";
import SearchPanel from "../../components/SearchPanel/SearchPanel";

// Todo не используется сдесь
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
  const { data: vinyls = [], isLoading } = useGetVinylsQuery({ search: "" });

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <SearchPanel />
      <div className="container">
        {vinyls.map((vinyl) => (
          <Card key={vinyl.id} vinyl={vinyl} />
        ))}
      </div>
    </>
  );
};

export default Home;
