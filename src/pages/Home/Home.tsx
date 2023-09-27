import Card from "../../components/Card/Card";
import Preloader from "../../components/Preloaders/Preloader";
import SearchPanel from "../../components/SearchPanel/SearchPanel";

import { useGetVinylsQuery } from "../../redux/rtkQuery/vinylsApi";

const Home = () => {
  const { data: vinyls, isLoading } = useGetVinylsQuery({ search: "" });

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      {vinyls && (
        <>
          <SearchPanel />
          <div className="container">
            {vinyls.map((vinyl) => (
              <Card key={vinyl.id} vinyl={vinyl} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
