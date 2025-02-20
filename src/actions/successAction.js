const successAction = (data) => {
    if (typeof data === "object" && data !== null) {
        return {
            type: "SUCCESS",
            payload: data,
        };
    } else {
        return {
            type: "ERROR",
            payload: { message: "Invalid data received" },
        };
    }
};

export default successAction;
