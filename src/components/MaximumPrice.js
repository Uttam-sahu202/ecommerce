const MaximumPrice = ({ optionsArray, setMaxPrice, maxPrice }) => {
    return (
        <select value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
            {optionsArray.map((price, index) => (
                <option key={index} value={price}>
                    {index === 0 ? "Max" : price}
                </option>
            ))}
        </select>
    );
};

export default MaximumPrice;
