import React from "react";
import toast, { Toaster } from "react-hot-toast";

import { setUser } from "./redux/slices/authSlice";
import { useAppDispatch } from "./hooks/redux-hooks";
import { getUser } from "./redux/actions/authActions";
import Routes from "./routes/Routes";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  //TODO
  React.useEffect(() => {
    (async function () {
      try {
        const user = await dispatch(getUser());
        dispatch(setUser(user.payload));
        setIsLoading(true);
      } catch (error) {
        const typedError = error as Error;
        toast.error(typedError.message);
      }
    })();
  }, [dispatch]);

  return (
    <div className="app">
      <Toaster />
      <Routes />
    </div>
  );
}

export default App;
