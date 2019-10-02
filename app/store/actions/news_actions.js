import { GET_NEWS } from "../types";
import axios from "axios";
import { FIREBASEURL } from "../../utils/misc";

export function getNews() {
  const request = axios({
    method: "GET",
    url: `${FIREBASEURL}/news.json`
  })
    .then(response => {
      const articles = [];

      // response.data is the whole object, key is each individual item in the objcet
      //each item has an id which holds that objcet, thats now refered to as the key.
      for (let key in response.data) {
        articles.push({
          ...response.data[key],
          id: key
        });
      }
      return articles;
    })
    .catch(e => {
      return false;
    });

  return {
    type: GET_NEWS,
    payload: request
  };
}
