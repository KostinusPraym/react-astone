import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase.config";

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

export const loginActions = createAsyncThunk(
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
