const SearchedProductsList = ({ successMessage = [], handlingProductCardClick, handleCartButton, productIdInCart }) => {
    return (
        <section className="searched-content-perPage">
            {successMessage.length > 0 ? (
                successMessage.map((product) => (
                    <div key={product.id} onClick={(e) => handlingProductCardClick(e, product.id)} className="productDivInsideSearch">
                        <img src={product.thumbnail} alt={product.title} className="searchedImage" />
                        <h4>{product.title}</h4>
                        <p>Rating: {product.rating}</p>
                        <p>Price: ${product.price}</p>
                        <button className="cartButton" onClick={(e) => handleCartButton(e, product)}>
                            {productIdInCart.some(item => item.id === product.id) ? "Added" : "Add to Cart"}
                        </button>
                    </div>
                ))
            ) : (
                <h2>No Products Found</h2>
            )}
        </section>
    );
};

export default SearchedProductsList;
