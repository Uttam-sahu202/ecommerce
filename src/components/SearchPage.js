import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import fetchingDataForSearchPage from "../asynchronousCalls/fetchingDataForSearchPage";
import addToCartAction from "../actions/addToCartAction";
import removeFromTheCart from "../actions/removeFromTheCart";
import "../SearchPage.css";

const SearchPage = ({
    successMessage, removeFromCart, addToCart, productInCart, AllCategories, fetchData, error, Total
}) => {

    const [input, setInput] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000000);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const { searchedItem } = useParams();

    // Ref for pagination scrolling effect
    const footerRef = useRef(null);

    useEffect(() => {
        fetchData(searchedItem, 1, minPrice, maxPrice, rating);
    }, [searchedItem, fetchData]);

    const handleCategoryClick = (category, page = 1) => {
        fetchData(category, page, minPrice, maxPrice, rating);
    };

    const handleCartButton = (e, product) => {
        e.stopPropagation();
        if (e.target.textContent === "add cart") {
            addToCart(product);
            e.target.textContent = "added";
        } else {
            removeFromCart(product.id);
            e.target.textContent = "add cart";
        }
    };

    const handlingProductCardClick = (e, productId) => {
        e.stopPropagation();
        navigate(`/detail/${productId}`);
    };

    const handleFilterSearch = () => {
        fetchData(input, 1, minPrice, maxPrice, rating);
    };

    // Pagination scrolling effect
    const handleScroll = (direction) => {
        if (footerRef.current) {
            footerRef.current.scrollBy({
                left: direction === "left" ? -70 : 70,
                behavior: "smooth"
            });
        }
    };

    if (error) return <h2>{error}</h2>;

    if (!successMessage || successMessage.length === 0) {
        return <h1>No products found with the applied filters!</h1>;
    }

    const filteredProducts = successMessage.filter((product) =>
        product.price >= minPrice && product.price <= maxPrice && product.rating >= rating
    );

    return (
        <div className="wholePage">
            <section className="filterSection">
                <div className="filter-selector">
                    <div className="searchForCategories">
                        <input
                            type="text"
                            value={input}
                            placeholder="Search categories..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleFilterSearch}>Search</button>
                    </div>

                    <div className="price-range">
                        <div className="min-price">Set Price
                            <select onChange={(e) => setMinPrice(Number(e.target.value))}>
                                <option value={0}>Min</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={500}>500</option>
                                <option value={1000}>1000</option>
                                <option value={5000}>5000</option>
                                <option value={10000}>10000</option>
                            </select>
                            <span> to </span>
                            <select onChange={(e) => setMaxPrice(Number(e.target.value))}>
                                <option value={10000000000}>Max</option>
                                <option value={1000}>1000</option>
                                <option value={2000}>2000</option>
                                <option value={5000}>5000</option>
                                <option value={10000}>10000</option>
                                <option value={50000}>50000</option>
                                <option value={100000}>100000</option>
                            </select>
                        </div>
                    </div>

                    <div className="rating-range">Set Rating
                        <select onChange={(e) => setRating(Number(e.target.value))}>
                            <option value={0}>All Ratings</option>
                            <option value={4}>4 & above</option>
                            <option value={3}>3 & above</option>
                            <option value={2}>2 & above</option>
                            <option value={1}>1 & above</option>
                        </select>
                    </div>
                </div>

                <div className="category-buttons">
                    {AllCategories?.length > 0 ? (
                        AllCategories.map((category, index) => (
                            <button key={index} onClick={() => handleCategoryClick(category)}>
                                {category}
                            </button>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
            </section>

            {/* Products Section */}
            <section className="searched-content-perPage">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} onClick={(e) => handlingProductCardClick(e, product.id)} className="productDivInsideSearch">
                            <img src={product.thumbnail} alt={product.title} className="searchedImage" />
                            <h4>{product.title}</h4>
                            <p>Rating: {product.rating}</p>
                            <p>Price: ${product.price}</p>
                            <button onClick={(e) => handleCartButton(e, product)}>add cart</button>
                        </div>
                    ))
                ) : (
                    <h2>No products match your search criteria.</h2>
                )}
            </section>

            {/* Pagination Footer with Scroll Effect */}
            <footer className="vavigation-footer">
                <div className="withButtons">
                    <button onClick={() => handleScroll("left")}>&#10094;</button>
                    <div className="footer-div" ref={footerRef}>
                        {[...Array(Math.ceil(Total / 10))].map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleCategoryClick(searchedItem, index + 1)}
                                className="pageNumber"
                            >
                                {index + 1}/{Math.ceil(Total / 10)}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleScroll("right")}>&#10095;</button>
                </div>
            </footer>
        </div>
    );
};

const mapStateToProps = (state) => ({
    AllCategories: state.dataFetchedForHomePage.data.AllCategories,
    productInCart: state.cartReducer,
    successMessage: state.searchedData.data.products,
    error: state.searchedData.error,
    Total: state.searchedData.data.total,
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (productInformation) => dispatch(addToCartAction(productInformation)),
    removeFromCart: (id) => dispatch(removeFromTheCart(id)),
    fetchData: (searchedItem, page = 1, minPrice, maxPrice, rating) =>
        dispatch(fetchingDataForSearchPage(searchedItem, page, minPrice, maxPrice, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
