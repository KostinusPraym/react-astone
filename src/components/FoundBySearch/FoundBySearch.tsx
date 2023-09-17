import { Vinyl } from "../../pages/Home/Home";
import Card from "../Card/Card";

import s from "./FoundBySearch.module.scss";

type Props = {
  vinyls: Vinyl[];
  searchQp: string | null;
};

const FoundBySearch = ({ searchQp, vinyls }: Props) => {
  return (
    <div className={s.foundBySearch}>
      <div>
        Найдено по запросу
        <span> "{searchQp}" </span>
      </div>
      <div className="container">
        {vinyls.map((vinyl) => (
          <Card key={vinyl.id} {...vinyl} />
        ))}
      </div>
    </div>
  );
};

export default FoundBySearch;
