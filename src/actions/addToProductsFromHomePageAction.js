const addToProductsFromHomePageAction = (product) =>{
    return {
        type: "addProduct",
        payload : product,
    }
}


export default addToProductsFromHomePageAction; 