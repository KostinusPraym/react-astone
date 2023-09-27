import { Vinyl } from "../../pages/Home/Home";
import Card from "../Card/Card";

type Props = {
  vinyls: Vinyl[];
  searchQueryParam: string | null;
};

const FoundBySearch = ({ searchQueryParam, vinyls }: Props) => {
  return (
    <>
      <div className="text-xl mb-5">
        Найдено по запросу
        <span className="font-bold"> "{searchQueryParam}" </span>
      </div>
      <div className="container">
        {vinyls.map((vinyl) => (
          <Card key={vinyl.id} vinyl={vinyl} />
        ))}
      </div>
    </>
  );
};

export default FoundBySearch;
