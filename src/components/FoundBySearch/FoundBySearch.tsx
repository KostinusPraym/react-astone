import { Vinyl } from "../../pages/Home/Home";
import Card from "../Card/Card";

import s from "./FoundBySearch.module.scss";

type Props = {
  vinyls: Vinyl[];
  searchQueryParam: string | null;
};

const FoundBySearch = ({ searchQueryParam, vinyls }: Props) => {
  return (
    <div className={s.foundBySearch}>
      <div>
        Найдено по запросу
        <span> "{searchQueryParam}" </span>
      </div>
      <div className="container">
        {vinyls.map((vinyl) => (
          <Card key={vinyl.id} vinyl={vinyl} />
        ))}
      </div>
    </div>
  );
};

export default FoundBySearch;
