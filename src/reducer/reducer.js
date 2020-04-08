import {combineReducers} from "redux";

import dataReducer from "./data/data.js";
import gameReducer from "./game/game.js";
import userReducer from "./user/user.js";

export default combineReducers({
  data: dataReducer,
  game: gameReducer,
  user: userReducer,
});
