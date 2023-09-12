import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { child, get } from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, dbRef } from "../../firebase.config";

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
        password
      );

      if (response.user) {
        toast.success("Success Registration");
      }
    } catch (error) {
      toast.error("Error Registration");
      return rejectWithValue(error);
    }
  }
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
  }
);

export const getUserAction = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await get(child(dbRef, "user"));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return { email: null };
      }
    } catch (error) {
      toast.error("Error Login");
      return rejectWithValue(error);
    }
  }
);

