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
        case "ERROR": {
            alert("error happend in fetching retry");
            return {
                ...state,
            };
        }
        case "addProduct":
            return {
                ...state,
                products: {
                    ...state.products, 
                    [action.payload.id]: action.payload, 
                },
            };

        default:
            return state;
    }
};

export default homePageReducer;
