import qs from "qs";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "../../hooks/use-debounce";
import SearchSuggest from "../SearchSuggest/SearchSuggest";
import { setSearchValue } from "../../redux/slices/searchSlice";
import { useAddInHistoryMutation } from "../../redux/rtkQuery/historyApi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { uid } = useAppSelector((state) => state.auth);
  const { search: searchValue } = useAppSelector((state) => state.search);
  const [isShowSuggest, setShowSuggest] = React.useState(false);
  const [addInHistory] = useAddInHistoryMutation();
  const debouncedSearch = useDebounce(searchValue, 500);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!debouncedSearch) {
      return;
    }

    const queryString = qs.stringify({
      search: debouncedSearch,
    });

    navigate(`/search-page?${queryString}`);

    if (uid) {
      await addInHistory({
        searchUrl: window.location.href,
        uid,
        search: debouncedSearch,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-[30px] text-right">
      <div>
        <img
          className="absolute right-[8px] top-[8px] h-[28px] w-[28px]"
          src="/images/search.svg"
          alt="search"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setSearchValue({ searchValue: e.target.value }))
          }
          value={searchValue}
          className="w-[250px] border border-solid px-[30px] py-[10px]"
          type="text"
          placeholder="Search"
          onFocus={() => setShowSuggest(true)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 200)}
        />
      </div>
      {(isShowSuggest && debouncedSearch) ? (
        <SearchSuggest
          handleSubmit={handleSubmit}
          debouncedSearch={debouncedSearch}
        />
      ) : null}
    </form>
  );
};

export default Search;
