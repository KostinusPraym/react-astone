import React from "react";
import toast, { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { setUser } from "./redux/slices/authSlice";
import { useAppDispatch } from "./hooks/redux-hooks";
import Layout from "./components/Layout/Layout";
import { getUserAction } from "./redux/actions/authActions";
import SingleCard from "./pages/SingleCard/SingleCard";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const user = await dispatch(getUserAction());
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
          <Route path="/card/:id" element={<SingleCard />}></Route>
          <Route path="/history-page" element={<h1>history-page</h1>}></Route>
          <Route path="/favorite-page" element={<h1>favorite-page</h1>}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
