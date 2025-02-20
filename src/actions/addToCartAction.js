const addToCartAction = (productId) =>{
      return {
        type : "add",
        idToAdd : productId,
      }
}

export default addToCartAction ;