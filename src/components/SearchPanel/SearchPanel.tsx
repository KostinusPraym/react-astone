import qs from "qs";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "../../hooks/use-debounce";
import { useGetSearchSuggestQuery } from "../../redux/vinylsApi";
import SearchSuggest from "../SearchSuggest/SearchSuggest";
import Preloader from "../Preloader/Preloader";

import s from "./SearchPanel.module.scss";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");
  const [isShowSuggest, setShowSuggest] = React.useState(true);
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: vinyls } = useGetSearchSuggestQuery({
    search: debouncedSearch,
    limit: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vinyls) {
      const queryString = qs.stringify({
        search: debouncedSearch,
      });
      navigate(`/search?${queryString}`);
    }
  };

  if (!vinyls) {
    return <Preloader />;
  }

  return (
    <form onSubmit={handleSubmit} className={s.search}>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className={s.searchInput}
        type="text"
        placeholder="Search"
        onFocus={() => setShowSuggest(true)}
        onBlur={() => setTimeout(() => setShowSuggest(false), 200)}
      />
      {isShowSuggest ? (
        <SearchSuggest
          handleSubmit={handleSubmit}
          vinyls={vinyls}
          searchValue={searchValue}
        />
      ) : null}
    </form>
  );
};

export default Search;
