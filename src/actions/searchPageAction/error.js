const error = (error) => {
    return ({
        type: "Searcherror",
        payload: error,
    });
}

export default error;