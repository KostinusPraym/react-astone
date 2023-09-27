import qs from "qs";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "../../hooks/use-debounce";
import { useGetSearchSuggestQuery } from "../../redux/rtkQuery/vinylsApi";
import SearchSuggest from "../SearchSuggest/SearchSuggest";
import Preloader from "../Preloaders/Preloader";
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
  const { data: vinyls, isLoading } = useGetSearchSuggestQuery({
    search: debouncedSearch,
    limit: debouncedSearch ? 5 : 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!debouncedSearch) {
      return;
    }
    if (vinyls) {
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
    }
  };

  if (isLoading || !vinyls) {
    return <Preloader />;
  }

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
