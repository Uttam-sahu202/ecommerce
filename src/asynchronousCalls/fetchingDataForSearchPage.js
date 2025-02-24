async function fetchingDataForSearchPage(searchedItem, page = 1, minPrice = 0, maxPrice = 10000000, rating = 0) {
    try {
        let url;
        if (typeof searchedItem === "undefined") {
            url = `http://localhost:3005/products?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}`;
        } else {
            url = `http://localhost:3005/products?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}&category=${searchedItem}`;
        }
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data ?? "Can't get the data for category"; 
    } catch (err) {
        console.error("Error fetching search page data:", err);
        return "Try-catch error: Can't get the data for category";
    }
}

export default fetchingDataForSearchPage;
