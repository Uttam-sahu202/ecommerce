const MinimumPrice = ({ setMinPrice, optionsArray, minPrice }) => {
    return (
        <select value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))}>
            {optionsArray.map((price, index) => (
                <option key={index} value={price}>
                    {index === 0 ? "Min" : price}
                </option>
            ))}
        </select>
    );
};

export default MinimumPrice;
