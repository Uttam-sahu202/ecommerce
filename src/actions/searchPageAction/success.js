const success = (data) =>{
    return ({
        type : "success",
        payload : data,
    })
}

export default success;