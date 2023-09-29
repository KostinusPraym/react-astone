import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "../../hooks/useDebounce";
import SearchSuggest from "../SearchSuggest/SearchSuggest";
import { setSearchValue } from "../../redux/slices/searchSlice";
import { useAddInHistoryMutation } from "../../redux/rtkQuery/historyApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authSelectors, searchSelectors } from "../../redux";

const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const input = useRef<HTMLInputElement>(null);
  const uid = useAppSelector(authSelectors.uid);
  const searchValue = useAppSelector(searchSelectors.searchValue);
  const [isShowSuggest, setShowSuggest] = React.useState(false);
  const [addInHistory] = useAddInHistoryMutation();
  const debouncedSearch = useDebounce(searchValue, 500);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!debouncedSearch) {
      return;
    }

    navigate(`/search-page?search=${debouncedSearch}`);

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
          className="absolute right-[8px] top-[8px] h-[28px] w-[28px] cursor-pointer"
          src="/images/search.svg"
          alt="search"
          onClick={() => input?.current?.focus()}
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setSearchValue({ searchValue: e.target.value }))
          }
          value={searchValue}
          className="w-[250px] border border-solid px-[30px] py-[10px]"
          type="text"
          placeholder="Search"
          ref={input}
          onFocus={() => setShowSuggest(true)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 200)}
        />
      </div>
      {isShowSuggest && debouncedSearch ? (
        <SearchSuggest
          handleSubmit={handleSubmit}
          debouncedSearch={debouncedSearch}
        />
      ) : null}
    </form>
  );
};

export default Search;
