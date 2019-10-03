import { combineReducers } from "redux";
import User from "./user_reducer";
import News from "./news_reducer";
import Games from "./games_reducer";

const rootReducer = combineReducers({
  User,
  News,
  Games
});

export default rootReducer;
