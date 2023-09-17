const NotFoundBySearch = ({ searchQp }: { searchQp: string | null }) => {
  return (
    <div style={{ fontSize: "20px" }}>
      По запросу
      <span style={{ fontWeight: "700" }}> "{searchQp}" </span>
      Ничего не найдено
    </div>
  );
};

export default NotFoundBySearch;
