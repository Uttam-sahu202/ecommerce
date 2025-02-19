const addToCartAction = (productDetail) =>{
      return {
        type : "add",
        product : productDetail,
      }
}

export default addToCartAction ;