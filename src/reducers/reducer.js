import detailReducer from "./detailReducer";
import homePageReducer from "./homePageReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
    detailReducer: detailReducer,    // Handles state related to product details
    homePageReducer: homePageReducer, // Handles state related to homepage data
    cartReducer: cartReducer,
});

export default reducer;
