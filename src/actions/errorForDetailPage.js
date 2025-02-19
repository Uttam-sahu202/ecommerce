const errorForDetailPage = (error) =>{
    return {
        type : "errorDetail",
        payload : error,
    }
}

export default errorForDetailPage;