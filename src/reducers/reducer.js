import detailReducer from "./detailReducer";
import homePageReducer from "./homePageReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";
import searchPageReducer from "./searchPageReducer.js";

const reducer = combineReducers({
    detailReducer: detailReducer,    // Handles state related to product details
    dataFetchedForHomePage: homePageReducer, // Handles state related to homepage data
    cartReducer: cartReducer,
    searchedData : searchPageReducer,
});

export default reducer;
