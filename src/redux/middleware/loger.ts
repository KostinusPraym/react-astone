/* eslint-disable no-console */
import { Action, createListenerMiddleware } from "@reduxjs/toolkit";

import { logout } from "../actions/authActions";

export interface iactionwithpayload extends Action {
  type: string;
  payload?: {
    email: string | null;
    uid: string | null;
  };
}

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: "auth/setUser",
  effect: (action: iactionwithpayload) => {
    const date = new Date();
    console.group("User login");
    console.log("1.", date.toTimeString());
    console.log("2. User logged in with email:", action.payload?.email);
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
