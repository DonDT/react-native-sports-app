import axios from "axios";
import { SIGN_IN, SIGN_UP } from "../types";

export function signUp() {
  return {
    type: SIGN_UP,
    payload: {
      email: "ediagee@gmail.com",
      token: "busbiosbisbibsidos"
    }
  };
}

export function signIn() {
  return {
    type: SIGN_IN,
    payload: {
      email: "ediagee@gmail.com",
      token: "busbiosbisbibsidos"
    }
  };
}
