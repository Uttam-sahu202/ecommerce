const initialState = {
    products: [],
    categories: [],
};

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUCCESS": {
            return {
                ...state,
                products: action.payload.products || [],
                categories: action.payload.AllCategories || [], 
            };
        }
        case "ERROR":{
            alert("error happend in fetching retry");
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default homePageReducer;
