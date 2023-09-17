import { Vinyl } from "../../pages/Home/Home";
import SearchItem from "../SearchPanel/SearchItem/SearchItem";

const SearchSuggest = ({ vinyls, searchValue, handleSubmit }: any) => {
  return (
    <>
      {searchValue && (
        <ul>
          {vinyls.map((vinyl: Vinyl) => {
            return <SearchItem key={vinyl.id} vinyl={vinyl} />;
          })}
          <li>
            <button onSubmit={handleSubmit}>
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
