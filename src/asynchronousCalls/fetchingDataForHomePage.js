
import successAction from "../actions/successAction";

const fetchingDataForHomePage = () => {
    return async (dispatch) => {

        try {
            const response = await fetch("http://localhost:3005/categories");  // fetching all the categories available in database
            const categories = await response.json();

            if (!categories || categories.length === 0) {
                dispatch(successAction("No categories found. Check if your server is running!"));
                return;
            }

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

            const validCategoryData = categoryDataList.filter(data => data !== null);  // array of object each index will contain {total:,page:,limit:,products:[]}

            if (validCategoryData.length === 0) {
                dispatch(successAction("Failed to fetch category data."));
                return;
            }

            let ProductsMapingWithIds = validCategoryData.reduce((acc, curr) => { // making key value pair, key as product id and value as product array
                curr.products.forEach(product => {    // curr ka products is a array of 4 products
                    acc[product.id] = product; 
                });
                return acc;
            }, {});
            

            dispatch(successAction({             // now dispatching the normalise form of the data into the redux store 
                AllCategories: categories,
                products : ProductsMapingWithIds,
            }));
        } catch (error) {
            console.error("Error during fetch:", error);
            dispatch(successAction(error.message));
        }
    };
}

export default fetchingDataForHomePage;
