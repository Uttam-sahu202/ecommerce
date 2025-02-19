import loadingAction from "../actions/loadingAction";
import errorAction from "../actions/errorAction";
import successAction from "../actions/successAction";

const fetchingDataForHomePage = () => {
    return async (dispatch) => {
        dispatch(loadingAction());

        try {
            const response = await fetch("http://localhost:3005/categories");  // fetching all the categories available in database
            const categories = await response.json();

            if (!categories || categories.length === 0) {
                dispatch(errorAction("No categories found. Check if your server is running!"));
                return;
            }

            // Fetching all category data categoryWise one by one 
            const categoryDataList = await Promise.all(
                categories.map(async (category) => {
                    try {
                        const res = await fetch(`http://localhost:3005/categories/${category}?limit=4`);
                        return await res.json();
                    } catch (err) {
                        console.error(`Error fetching data for ${category}:`, err);
                        return null;
                    }
                })
            );

            const validCategoryData = categoryDataList.filter(data => data !== null);

            if (validCategoryData.length === 0) {
                dispatch(errorAction("Failed to fetch category data."));
                return;
            }

            dispatch(successAction({
                AllCategories: categories,
                categoryWiseFourOrLessData: validCategoryData,
            }));
        } catch (error) {
            console.error("Error during fetch:", error);
            dispatch(errorAction(error.message));
        }
    };
}

export default fetchingDataForHomePage;
