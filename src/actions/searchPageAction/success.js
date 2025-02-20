const success = (data) =>{
    return ({
        type : "Searchsuccess",
        payload : data,
    })
}

export default success;