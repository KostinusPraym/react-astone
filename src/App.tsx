import React from "react";
import toast, { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { setUser } from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/redux-hooks";
import Layout from "./components/Layout/Layout";
import { getUser } from "./store/actions/authActions";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

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
      <Routes>
        <Route path="/" element={<Layout isLoading={isLoading} />}>
          <Route index element={<Home />}></Route>
          <Route path="/search-page" element={<h1>search-page</h1>}></Route>
          <Route path="/card-page" element={<h1>card-page</h1>}></Route>
          <Route path="/history-page" element={<h1>history-page</h1>}></Route>
          <Route path="/favorite-page" element={<h1>favorite-page</h1>}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
