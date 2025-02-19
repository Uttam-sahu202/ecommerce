const initialState = [];

const cartReducer = (state = initialState, action) =>{
    switch(action.type){
        case "add":
            {
                const temprary = [...state];
                temprary.push(action.product);
                return temprary;
            }
        case "remove":
            {
                const temprary = state.filter(curr =>(curr.id !== action.idToRemove));
                return temprary;
            } 
        default:
            return state;       
    }
}

export default cartReducer;