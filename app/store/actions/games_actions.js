import { GET_GAMES } from "../types";
import axios from "axios";
import { FIREBASEURL, convertFirebase, findTeamData } from "../../utils/misc";

export function getGames() {
  const promise = new Promise((resolve, reject) => {
    const request = axios({
      method: "GET",
      url: `${FIREBASEURL}/teams.json`
    })
      .then(response => {
        const teams = convertFirebase(response.data);
        axios({ method: "GET", url: `${FIREBASEURL}/games.json` }).then(
          response => {
            const articles = convertFirebase(response.data);
            const responseData = [];
            for (let key in articles) {
              responseData.push({
                ...articles[key],
                awayData: findTeamData(articles[key].away, teams),
                localData: findTeamData(articles[key].local, teams)
              });
            }
            resolve(responseData);
          }
        );
      })
      .catch(e => {
        reject(false);
      });
  });

  return {
    type: GET_GAMES,
    payload: promise
  };
}

// https://images.covers.com/editorial/2019/kawhi_lebron070819.jpg
// https://cdn-s3.si.com/s3fs-public/2019/09/17/all-decades-gold.png
// https://cdn-s3.si.com/s3fs-public/styles/marquee_large_2x/public/2019/05/02/kyrie-irving-celtics-nba-playoffs-bucks.jpg?itok=6V42GU5_
// https://heavyeditorial.files.wordpress.com/2019/05/gettyimages-1148128498-e1557951258275.jpg?quality=65&strip=all
// https://i.ytimg.com/vi/9EqB4eNmrCk/maxresdefault.jpg
// https://cdn.images.express.co.uk/img/dynamic/4/590x/NBA-news-Anthony-Davis-Lakers-LeBron-James-Pelicans-1020491.jpg?r=1537488457501

// http://testinrnative.ferdinandwolf.com/news/1.jpg"
// http://testinrnative.ferdinandwolf.com/news/2.jpg
// http://testinrnative.ferdinandwolf.com/news/3.jpg"
// http://testinrnative.ferdinandwolf.com/news/4.jpg
// http://testinrnative.ferdinandwolf.com/news/5.jpg
// http://testinrnative.ferdinandwolf.com/news/6.png
