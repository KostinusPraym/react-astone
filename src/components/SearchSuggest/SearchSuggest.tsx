import { Vinyl } from "../../pages/Home/Home";
import SearchItem from "../SearchPanel/SearchItem/SearchItem";

type Props = {
  vinyls: Vinyl[];
  searchValue: string;
  handleSubmit: (value: React.FormEvent) => void;
};

const SearchSuggest = ({ vinyls, searchValue, handleSubmit }: Props) => {
  return (
    <>
      {searchValue && (
        <ul className="absolute right-0 z-10 flex w-[250px] flex-col gap-[4px] overflow-hidden bg-white">
          {vinyls.map((vinyl) => {
            return <SearchItem key={vinyl.id} vinyl={vinyl} />;
          })}
          <li className="p-[10px] text-left text-sm">
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
