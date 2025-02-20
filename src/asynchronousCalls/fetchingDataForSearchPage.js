import loading from "../actions/searchPageAction/loading";
import success from "../actions/searchPageAction/success";
import error from "../actions/searchPageAction/error";

const fetchingDataForSearchPage = (searchedItem, page = 1, minPrice = 0, maxPrice = 10000000, rating = 0) => {
    return async (dispatch) => {
        dispatch(loading());

        try {
            const url = `http://localhost:3005/categories/${searchedItem}?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data) {
                dispatch(success(data));
            } else {
                dispatch(error(`Can't get the data for category: ${searchedItem}`));
            }
        } catch (err) {
            dispatch(error(`Try-catch error: Can't get the data for category: ${searchedItem}`));
        }
    };
};

export default fetchingDataForSearchPage;
