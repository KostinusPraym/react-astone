type Props = { searchQueryParam: string | null }

const NotFoundBySearch = ({ searchQueryParam }: Props) => {
  return (
    <div style={{ fontSize: "20px" }}>
      По запросу
      <span style={{ fontWeight: "700" }}> "{searchQueryParam}" </span>
      Ничего не найдено
    </div>
  );
};

export default NotFoundBySearch;
