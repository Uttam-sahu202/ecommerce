const initialState ={
    loadig : false,
    data : [],
    error : "",
}


const detailReducer =(state = initialState, action) =>{
    switch (action.type) {
        case "loadingDetail":
            return {
                ...state,
                loading: true,
            };
        case "successDetail":
            return {
                ...state,
                loading: false,
                error: "",
                data: action.payload,
            }
        case "errorDetail":
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

export default detailReducer;