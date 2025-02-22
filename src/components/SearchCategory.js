const SearchCategory = ({ input, setInput, handleCategoryClick }) => {
    return (
        <div className="searchForCategories">
            <input
                type="text"
                value={input}
                placeholder="Search categories..."
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => handleCategoryClick(input)}>Search</button>
        </div>
    );
};

export default SearchCategory;
