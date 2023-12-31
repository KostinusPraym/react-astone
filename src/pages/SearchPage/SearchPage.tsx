import React from "react";
import { useSearchParams } from "react-router-dom";

import Preloader from "../../components/Preloaders/Preloader";
import FoundBySearch from "../../components/FoundBySearch/FoundBySearch";
import NotFoundBySearch from "../../components/NotFoundBySearch/NotFoundBySearch";
import SearchPanel from "../../components/SearchPanel/SearchPanel";

import { setSearchValue } from "../../redux/slices/searchSlice";
import { useGetVinylsBySearchQuery } from "../../redux/rtkQuery/vinylsApi";
import { useAppDispatch } from "../../hooks/reduxHooks";

const SearchPage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search");
  const {
    data: vinyls,
    isLoading,
    isFetching,
  } = useGetVinylsBySearchQuery({
    search: searchQueryParam,
  });

  React.useEffect(() => {
    if (!searchQueryParam) {
      return;
    }
    dispatch(setSearchValue({ searchValue: searchQueryParam }));
  }, [dispatch, searchQueryParam]);

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return (
    <div>
      {vinyls && (
        <>
          <SearchPanel />
          {vinyls.length ? (
            <FoundBySearch
              searchQueryParam={searchQueryParam}
              vinyls={vinyls}
            />
          ) : (
            <NotFoundBySearch searchQueryParam={searchQueryParam} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
