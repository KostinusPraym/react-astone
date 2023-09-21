import React from "react";
import { Toaster } from "react-hot-toast";

import { useAppDispatch } from "./hooks/redux-hooks";
import { checkAuth } from "./redux/actions/authActions";
import Routes from "./routes/Routes";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="app">
      <Toaster />
      <Routes />
    </div>
  );
}

export default App;
