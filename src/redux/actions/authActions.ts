import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase.config";
import { setUser, userNotFound } from "../slices/authSlice";

type RegistrationForm = {
  email: string;
  password: string;
};

export const registrationAction = createAsyncThunk(
  "auth/registration",
  async ({ email, password }: RegistrationForm, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (response.user) {
        toast.success("Success Registration");
      }
    } catch (error) {
      toast.error("Error Registration");
      return rejectWithValue(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }: RegistrationForm, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response.user) {
        toast.success("Success Login");
      }
    } catch (error) {
      toast.error("Error Login");
      return rejectWithValue(error);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  (_, { rejectWithValue, dispatch }) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return dispatch(setUser({ email: user.email, uid: user.uid }));
        } else {
          return dispatch(userNotFound());
        }
      });
    } catch (error) {
      toast.error("Error Login");
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk("auth/logOutUser", () => signOut(auth));
