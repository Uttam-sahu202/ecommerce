const initialState = {
    loading: false,
    data: [],
    error: "",
}


const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: true,
            };
        case "success":
            return {
                ...state,
                loading: false,
                error: "",
                data: action.payload,
            }
        case "error":
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            }
        default:
            return state;
    }
}

export default homePageReducer;