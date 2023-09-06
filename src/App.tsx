import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import { setUser } from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/redux-hooks";

function App() {
  const dbRef = ref(getDatabase());
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    get(child(dbRef, "user"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(setUser(snapshot.val()));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
