const errorAction = (error) => {
    return ({
        type: "error",
        payload: error,
    });
}

export default errorAction;