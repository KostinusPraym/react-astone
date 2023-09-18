import { Vinyl } from "../../pages/Home/Home";
import SearchItem from "../SearchPanel/SearchItem/SearchItem";

type Props = {
  vinyls: Vinyl[];
  searchValue: string;
  handleSubmit: (value: React.FormEvent) => void;
} 

const SearchSuggest = ({ vinyls, searchValue, handleSubmit }: Props) => {
  return (
    <>
      {searchValue && (
        <ul>
          {vinyls.map((vinyl) => {
            return <SearchItem key={vinyl.id} vinyl={vinyl} />;
          })}
          <li>
            <button type="submit" onSubmit={handleSubmit}>
              Показать результаты по запросу:
              <span style={{ fontWeight: "700", marginLeft: "4px" }}>
                "{searchValue}"
              </span>
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default SearchSuggest;
