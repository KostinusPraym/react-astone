import { useAppSelector } from "./redux-hooks";

export function useAuth() {
  const { email } = useAppSelector((state) => state.auth);

  return {
    isAuth: !!email,
    email,
  };
}
