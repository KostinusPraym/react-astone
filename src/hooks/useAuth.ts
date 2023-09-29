import { authSelectors } from "../redux";

import { useAppSelector } from "./reduxHooks";

export function useAuth() {
  const email = useAppSelector(authSelectors.email);

  return {
    isAuth: !!email,
    email,
  };
}
