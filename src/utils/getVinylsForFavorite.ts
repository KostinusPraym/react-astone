import { ResponseParams } from "../redux/rtkQuery/favoritesApi";
import { Vinyl } from "../redux/rtkQuery/vinylsApi";

type FavoriteItem = {
  [uniqueId: string]: Vinyl;
};

type FavoritesById = FavoriteItem[];
/**
 * Спускаемся во вложенный объект чтобы получить результат
 * Example:
 * {id: {uniqueId: {vinyl}} => [{vinyl},{vinyl}...]
 * @param data
 * @returns Vinyl[]
 */
export function getVinylsForFavorite(data: ResponseParams | undefined) : Vinyl[] | never[] {
  if (!data) {
    return [];
  }
  const res: FavoritesById = Object.values(data);
  return res.map((vinyl) => Object.values(vinyl)[0]);
}
