// const initialState ={
//     loadig : false,
//     data : [],
//     error : "",
// }


// const searchPageReducer =(state = initialState, action) =>{
//     switch (action.type) {
//         case "Searchloading":
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case "Searchsuccess":
//             return {
//                 ...state,
//                 loading: false,
//                 error: "",
//                 data: action.payload,
//             }
//         case "Searcherror":
//             return {
//                 ...state,
//                 loading: false,
//                 data: [],
//                 error: action.payload,
//             }
//         default:
//             return state;
//     }
// }

// export default searchPageReducer;