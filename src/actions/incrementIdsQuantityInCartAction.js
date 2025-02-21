const incrementIdsQuantityInCartAction = (idToincrementQuantity) =>{
    return {
        type : "increment",
        idToincrementQuantity : idToincrementQuantity,
    }
}

export default incrementIdsQuantityInCartAction;