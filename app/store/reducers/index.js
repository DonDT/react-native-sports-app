import { combineReducers } from "redux";
import User from "./user_reducer";
import News from "./news_reducer";

const rootReducer = combineReducers({
  User,
  News
});

export default rootReducer;
