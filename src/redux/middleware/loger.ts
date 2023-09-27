import { createListenerMiddleware } from "@reduxjs/toolkit";

import { logout } from "../actions/authActions";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: "auth/setUser",
  effect: (action: any) => {
    const date = new Date();
    console.group("User login");
    console.log("1.", date.toTimeString());
    console.log("2. User logged in with email:", action.payload.email);
    console.groupEnd();
  },
});

listenerMiddleware.startListening({
  actionCreator: logout.fulfilled,
  effect: () => {
    const date = new Date();
    console.group("User logout");
    console.log("1.", date.toTimeString());
    console.log("2. User logged out.");
    console.groupEnd();
  },
});

export default listenerMiddleware;
