import { Link } from "react-router-dom";

import { Vinyl } from "../../../redux/rtkQuery/vinylsApi";

type Props = {
  vinyl: Vinyl;
};

const SearchItem = ({ vinyl }: Props) => {
  return (
    <Link
      to={`/card/${vinyl.id}`}
      className="flex items-center justify-start gap-[20px] p-[10px]"
    >
      <img width={40} height={40} src={vinyl.coverImage} alt="Cover" />
      <li>{vinyl.author}</li>
    </Link>
  );
};

export default SearchItem;
