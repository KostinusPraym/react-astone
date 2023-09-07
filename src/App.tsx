import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Header from "./components/Header/Header";
import { setUser } from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/redux-hooks";
import Layout from "./components/Layout/Layout";

function App() {
  const dbRef = ref(getDatabase());
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    get(child(dbRef, "user"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(setUser(snapshot.val()));
        }
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout isLoading={isLoading}/>}>
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
