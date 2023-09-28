import { useAppSelector } from "./reduxHooks";

export function useAuth() {
  const { email } = useAppSelector((state) => state.auth);

  return {
    isAuth: !!email,
    email,
  };
}
