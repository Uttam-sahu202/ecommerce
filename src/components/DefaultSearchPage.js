import { useEffect, useState } from "react";
import fetchAllCategories from "../asynchronousCalls/fetchAllCategories";
import fetchingDataForDefaultSearch from "../asynchronousCalls/fetchingDataForDefaultSearch";
import MinimumPrice from "./MinimumPrice.js";
import MaximumPrice from "./MaximumPrice.js";
import SearchCategory from "./SearchCategory.js";
import SearchedProductsList from "./SearchedProductsList.js";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import addToCartAction from "../actions/addToCartAction";
import removeFromTheCart from "../actions/removeFromTheCart";
import addToProductsFromHomePageAction from "../actions/addToProductsFromHomePageAction.js";
import "../SearchPage.css";

const DefaultSearchPage = ({ removeFromCart, addToCart, productIdInCart, AllCategories, addToProduct, productsInStore }) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [categories, setCategories] = useState(AllCategories || []);
    const [input, setInput] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000000);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    // Fetch default search products
    const fetchDataAsync = async () => {
        setLoading(true);
        try {
            const data = await fetchingDataForDefaultSearch();
            if(data)
            setSuccessMessage(data.products);
            else alert("fetching issue");
        } catch (error) {
            setSuccessMessage([]);
        }
        setLoading(false);
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const fetchedCategories = await fetchAllCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            alert("Error in fetching categories");
        }
    };

    useEffect(() => {
        fetchDataAsync();
        if (!AllCategories || AllCategories.length === 0) {
            fetchCategories();
        }
    }, []);


    useEffect(() => {
        successMessage.forEach(pro => {
            if (!productsInStore[pro.id]) {
                addToProduct(pro);
            }
        });
    }, [successMessage, addToProduct, productsInStore]);



    const handleCategoryClick = (category) => {
        navigate(`/search/${category}`);
    };

    const handleCartButton = (e, product) => {
        e.stopPropagation();
        if (productIdInCart.some(item => item.id === product.id)) {
            removeFromCart(product.id);
        } else {
            addToCart(product.id);
        }
    };

    const handlingProductCardClick = (e, productId) => {
        e.stopPropagation();
        navigate(`/detail/${productId}`);
    };

    if (loading) return <h2>Loading...</h2>;
    if (!successMessage.length) return <h1>No products found with the applied filters!</h1>;

    const filteredProducts = successMessage.filter(product =>
        product.price >= minPrice && product.price <= maxPrice && product.rating >= rating
    );

    return (
        <div className="wholePage">
            <section className="filterSection">
                <div className="filter-selector">
                    <SearchCategory input={input} setInput={setInput} handleCategoryClick={handleCategoryClick} />
                    <div className="price-range">
                        <div className="min-price">{"Set Price "}
                            {<MinimumPrice setMinPrice={setMinPrice} optionsArray={[0, 100, 200, 500, 1000, 5000, 10000]} />}
                            <span> to </span>
                            {<MaximumPrice setMaxPrice={setMaxPrice} optionsArray={[1000000000, 1000, 2000, 5000, 50000, 100000]} />}
                        </div>
                    </div>
                    <div className="rating-range">Set Rating
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value={0}>All Ratings</option>
                            <option value={4}>4 & above</option>
                            <option value={3}>3 & above</option>
                            <option value={2}>2 & above</option>
                            <option value={1}>1 & above</option>
                        </select>
                    </div>
                </div>
                <div className="category-buttons">
                    {categories?.length > 0 ? (
                        categories.map((category, index) => (
                            <button key={index} onClick={() => navigate(`/search/${category}`)}>
                                {category}
                            </button>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
            </section>

            <SearchedProductsList
                filteredProducts={filteredProducts}
                handlingProductCardClick={handlingProductCardClick}
                handleCartButton={handleCartButton}
                productIdInCart={productIdInCart}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.homePageReducer.categories,
    productsInStore: state.homePageReducer.products,
    productIdInCart: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (productInformation) => dispatch(addToCartAction(productInformation)),
    removeFromCart: (id) => dispatch(removeFromTheCart(id)),
    addToProduct: (product) => dispatch(addToProductsFromHomePageAction(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSearchPage);
