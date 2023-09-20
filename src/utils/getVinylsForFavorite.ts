import { ResponseParams } from "../redux/favoritesApi";
import { Vinyl } from "../pages/Home/Home";

type FavoritesById = {
  [uniqueId: string]: Vinyl;
};

export function getVinylsForFavorite(data: ResponseParams) {
  const res: FavoritesById[] = Object.values(data);
  return res.map((vinyl) => Object.values(vinyl)[0]);
}
