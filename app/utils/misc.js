import { AsyncStorage } from "react-native";

export const FIREBASEURL = `https://rn-nba-app-815ad.firebaseio.com`;
export const APIKEY = `AIzaSyD7lyp7lBpRrI3BGHb8cVgeN7i1EK7ZaZg`;
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}
`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}
`;

export const getTokens = cb => {
  // here the data is simply retrived and passed, to the callback of getTokens, which is cb.
  AsyncStorage.multiGet([
    "@nba_app@token",
    "@nba_app@refreshToken",
    "@nba_app@expireToken", // we can't store numbers, so we convert them to strings
    "@nba_app@uid"
  ]).then(value => {
    cb(value);
  });
};

export const setTokens = (values, cb) => {
  const datenow = new Date();
  const expiration = datenow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ["@nba_app@token", values.token],
    ["@nba_app@refreshToken", values.refToken],
    ["@nba_app@expireToken", expiration.toString()], // we can't store numbers, so we convert them to strings
    ["@nba_app@uid", values.uid]
  ]).then(response => {
    cb();
  });
};
