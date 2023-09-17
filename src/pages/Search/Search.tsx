import { useSearchParams } from "react-router-dom";

import { useGetVinylsQuery } from "../../redux/vinylsApi";
import Preloader from "../../components/Preloader/Preloader";
import FoundBySearch from "../../components/FoundBySearch/FoundBySearch";
import NotFoundBySearch from "../../components/NotFoundBySearch/NotFoundBySearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQp = searchParams.get("search");
  const {
    data: vinyls = [],
    isLoading,
    isFetching,
  } = useGetVinylsQuery({
    search: searchQp,
  });

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return (
    <div>
      {vinyls.length ? (
        <FoundBySearch searchQp={searchQp} vinyls={vinyls} />
      ) : (
        <NotFoundBySearch searchQp={searchQp} />
      )}
    </div>
  );
};

export default Search;
