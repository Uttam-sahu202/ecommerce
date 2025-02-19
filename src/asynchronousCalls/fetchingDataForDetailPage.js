import loadingForDetailPage from "../actions/loadingForDetailPage";
import successForDetailPage from "../actions/successForDetailPage";
import errorForDetailPage from "../actions/errorForDetailPage";

const fetchingDataForDetailPage = (productId) =>{
    return async (dispatch) => {
        dispatch(loadingForDetailPage());

        try {
            const response = await fetch(`http://localhost:3005/products/${productId}d`);
            const data = await response.json();

            if(data)
            dispatch(successForDetailPage(data));

            if(!data)
                dispatch(errorForDetailPage(`can't get the data for product id : ${productId}`));
        } catch (error) {
            dispatch(errorForDetailPage(`try catch error :- can't get the data for product id : ${productId}`));
        }
    };
}

export default fetchingDataForDetailPage;