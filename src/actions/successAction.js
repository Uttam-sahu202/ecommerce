const successAction = (data) => {
    return ({
        type: "success",
        payload: data,
    });
}

export default successAction;