const MaximumPrice = ({optionsArray,setMaxPrice }) => {
    
    return (
        <select onChange={(e) => setMaxPrice(Number(e.target.value))}>
            {optionsArray.map((price, index) => (
                <option key={index} value={price}>
                    {index === 0 ? "Max" : price}
                </option>
            ))}
        </select>
    );
};

export default MaximumPrice;