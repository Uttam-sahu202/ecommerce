const decrementIdsQuantityInCartAction = (idTodecrement) =>{
    return {
        type : "decrement",
        idTodecrement : idTodecrement,
    }
}

export default decrementIdsQuantityInCartAction;