import { useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";
import addToCartAction from "../actions/addToCartAction";
import removeFromTheCart from "../actions/removeFromTheCart";

const SearchPage = ({ successMessage, removeFromCart,addToCart, productInCart}) => {
    
    const navigate = useNavigate();
    
    const handleCartButton = (e, product) => {
        e.stopPropagation();
        console.log(product);
        if (e.target.textContent === "add cart") {
            addToCart(product);
            e.target.textContent = "added"; 
        } else {
            removeFromCart(product.id);
            e.target.textContent = "add cart"; 
        }
    };

    const handlingProductCardClick = (e, productId) => {     // send to fetch the whole detal in detail page 
        e.stopPropagation();
        navigate(`/detail/${productId}`);
    };


    const {searchedItem} = useParams();
    const [input, setInput] = useState("");
    const [productName, setProductName] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000000);
    const [rating, setRating] = useState(0);

    if (!successMessage || successMessage.length === 0) {
        return <h1>Error: No data available in store!</h1>;
    }

    // Find products for the selected category
    const requiredDataCategoryWise = successMessage.filter((eachData) => eachData.categories === searchedItem);

    if (!requiredDataCategoryWise) {
        return <h1>No products found for "{searchedItem}"</h1>;
    }

    let actualProducts = requiredDataCategoryWise[0].products;

    const filteredProducts = actualProducts.filter((product) => {
        return (
            product.title.toLowerCase().includes(productName.toLowerCase()) &&
            product.price >= minPrice &&
            product.price <= maxPrice &&
            product.rating >= rating
        );
    });

    return (
        <div className="wholePage">
            <section className="filterSection">
                <div className="searchProductFilter">
                    <input
                        type="text"
                        value={input}
                        placeholder="Search Product..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={() => setProductName(input)}>Search</button>
                </div>

                <div className="price-range">
                    <div className="min-price">
                        <select onChange={(e) => setMinPrice(Number(e.target.value))}>
                            <option value={0}>Min</option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
                            <option value={5000}>5000</option>
                            <option value={10000}>10000</option>
                        </select>
                        <div>to</div>
                        <div className="max-price">
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
                </div>

                <div className="rating-range">
                    <select onChange={(e) => setRating(Number(e.target.value))}>
                        <option value={0}>All Ratings</option>
                        <option value={4}>4 & above</option>
                        <option value={3}>3 & above</option>
                        <option value={2}>2 & above</option>
                        <option value={1}>1 & above</option>
                    </select>
                </div>
            </section>

            <section className="product-container-searchPage">

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} onClick={(e) => handlingProductCardClick(e, product.id)} className="product-card searchPage">
                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                            <h4>{product.title}</h4>
                            <p>Rating: {product.rating}</p>
                            <p>Price: ${product.price}</p>
                            <p><button onClick={(e) => handleCartButton(e, product)}>add cart</button></p>
                        </div>
                    ))
                ) : (
                    <h2>No products match your search criteria.</h2>
                )}

            </section>
        </div>
    );
};

const mapStateToProps = (state) => ({
    successMessage: state.homePageReducer.data,
    productInCart : state.cartReducer,
});

const mapDispatchToProps = (dispatch) =>({
    addToCart : (productInformation) => dispatch(addToCartAction(productInformation)),
    removeFromCart : (id) => dispatch(removeFromTheCart(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
