const removeFromTheCart = (productId) =>{
    return {
        type : "remove",
         idToRemove : productId,
    }
}

export default removeFromTheCart;