async function fetchingDataForDefaultSearch() {
    try {
        const response = await fetch(`http://localhost:3005/products`);

        if (!response.ok) {
            throw new Error("Failed to fetch product data");
        }

        const data = await response.json();

        return data || "Couldn't get the data ";

    } catch (error) {
        return "Can't get the data for product";
    }
}

export default fetchingDataForDefaultSearch;
