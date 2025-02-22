async function fetchAllCategories() {
    try {
        const response = await fetch("http://localhost:3005/categories");  // fetching all the categories available in database
        const categories = await response.json();
        return categories;
    } catch (error) {
       alert("error in fetching refrece again");
       return [];
    }
}

export default fetchAllCategories;