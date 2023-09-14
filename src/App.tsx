import React from "react";
import toast, { Toaster } from "react-hot-toast";

import { useAppDispatch } from "./hooks/redux-hooks";
import { checkAuth } from "./redux/actions/authActions";
import Routes from "./routes/Routes";

function App() {
  const dispatch = useAppDispatch();

  //TODO
  React.useEffect(() => {
    (async function () {
      try {
        dispatch(checkAuth());
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
