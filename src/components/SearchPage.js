import { useEffect, useState, useRef } from "react";
import fetchAllCategories from "../asynchronousCalls/fetchAllCategories";
import MinimumPrice from "./MinimumPrice.js";
import MaximumPrice from "./MaximumPrice.js";
import SearchCategory from "./SearchCategory.js";
import FooterPagination from "./FooterPagination.js";
import SearchedProductsList from "./SearchedProductsList.js"
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import fetchingDataForSearchPage from "../asynchronousCalls/fetchingDataForSearchPage";
import addToCartAction from "../actions/addToCartAction";
import removeFromTheCart from "../actions/removeFromTheCart";
import addToProductsFromHomePageAction from "../actions/addToProductsFromHomePageAction.js";
import "../SearchPage.css";

const SearchPage = ({ removeFromCart, addToCart, productIdInCart, AllCategories, addToProduct, productsInStore }) => {
    const [currentPage, setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState(AllCategories);
    const [input, setInput] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000000);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const { searchedItem } = useParams();

    const fetchDataAsync = async (category = searchedItem, page = 1) => {
        setLoading(true);
        try {
            const data = await fetchingDataForSearchPage(category, page, minPrice, maxPrice, rating);
            setSuccessMessage(data.products || []);
            setTotal(data.total);
        } catch (error) {
            setSuccessMessage([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDataAsync(searchedItem);
    }, [searchedItem,currentPage,minPrice,maxPrice,rating]);

    // from here fetching the categories in case of refrece the page 

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await fetchAllCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            alert("Error in fetching categories");
        }
    };


    useEffect(() => {
        if (!categories || categories.length === 0) {
            fetchCategories();
        }
    }, []);


    
    const handleCategoryClick = (category) => {
        navigate(`/search/${category}`);
    };


    console.log(successMessage);
    if (successMessage.length > 0) {
        successMessage.forEach(pro => {
            if (!productsInStore[pro.id]) { // Check if product is already in store
                addToProduct(pro); // Dispatch the action to add product
            }
        });
    }




    const handleCartButton = (e, product) => {
        e.stopPropagation();
        if (productIdInCart.some(item => item.id === product.id)) {
            removeFromCart(product.id);
        }
        else {
            addToCart(product.id);
        }
    };

    const handlingProductCardClick = (e, productId) => {
        e.stopPropagation();
        navigate(`/detail/${productId}`);
    };






    if (loading) return <h2>Loading...</h2>;
    if (!successMessage.length) return <h1>No products found with the applied filters!</h1>;

    return (
        <div className="wholePage">
            <section className="filterSection">
                <div className="filter-selector">
                    <SearchCategory input={input} setInput={setInput} handleCategoryClick={handleCategoryClick} />
                    <div className="price-range">
                        <div className="min-price">{"Set Price "}
                            {<MinimumPrice setMinPrice={setMinPrice}  minPrice ={minPrice} optionsArray={[0, 100, 200, 500, 1000, 5000, 10000]} />}
                            <span> to </span>
                            {<MaximumPrice setMaxPrice={setMaxPrice} maxPrice ={maxPrice} optionsArray={[1000000000, 1000, 2000, 5000, 50000, 100000]} />}
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
                            <button key={index} onClick={() => handleCategoryClick(category)}>
                                {category}
                            </button>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
            </section>

            <SearchedProductsList
                successMessage={successMessage}
                handlingProductCardClick={handlingProductCardClick}
                handleCartButton={handleCartButton}
                productIdInCart={productIdInCart}
            />
            <FooterPagination
                currentPage={currentPage}
                total={total}
                fetchDataAsync={fetchDataAsync}
                setcurrentPage={setcurrentPage}
                searchedItem={searchedItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);