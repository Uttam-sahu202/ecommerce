const initialState = [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "add": {
            return [
                ...state,
                {
                    id: action.idToAdd,
                    quantity: 1,
                }
            ]; 
        }

        case "remove": {
            return state.filter(curr => curr.id !== action.idToRemove);
        } 

        case "increment": {
            return state.map(curr => curr.id === action.idToincrementQuantity ? { ...curr, quantity: curr.quantity + 1 } : curr );
        }

        case "decrement": {
            return state.map(curr => curr.id === action.idTodecrement && curr.quantity > 1 ? { ...curr, quantity: curr.quantity - 1 } : curr );
        }

        default:
            return state;       
    }
};

export default cartReducer;
