const NotFoundBySearch = ({ searchQueryParam }: { searchQueryParam: string | null }) => {
  return (
    <div style={{ fontSize: "20px" }}>
      По запросу
      <span style={{ fontWeight: "700" }}> "{searchQueryParam}" </span>
      Ничего не найдено
    </div>
  );
};

export default NotFoundBySearch;
