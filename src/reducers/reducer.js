import homePageReducer from "./homePageReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
     homePageReducer, // Handles state related to homepage data
    cartReducer: cartReducer,
});

export default reducer;
