const error = (error) => {
    return ({
        type: "error",
        payload: error,
    });
}

export default error;