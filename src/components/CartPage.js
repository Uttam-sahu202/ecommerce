import { connect } from "react-redux";
import addToCartAction from "../actions/addToCartAction.js";
import removeFromTheCart from "../actions/removeFromTheCart.js";
import { useState, useEffect } from "react";

const CartPage = ({ product, addToCart, removeFromCart }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCounts, setItemCounts] = useState({});


    useEffect(() => {             // re-render and re-initialising when the product array changes 
        const initialCounts = {};
        product.forEach((pro) => {
            initialCounts[pro.id] = 1;
        });
        setItemCounts(initialCounts);
    }, [product]);

    
    useEffect(() => {    // re - rendering when productarray or content inside the itemCounts change
        const newTotalPrice = product.reduce((sum, pro) => {
            return sum + (pro.price * itemCounts[pro.id]);
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [itemCounts, product]);

    const incrementItem = (id) => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 1) + 1,     // never let the count be zero 
        }));
    };

    const decrementItem = (id) => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [id]: Math.max(prevCounts[id]  - 1, 1),
        }));
    };

    const handleRemoveClick = (e, id) => {
        e.stopPropagation();
        removeFromCart(id);
    };

    return (
        <div className="cart-body">
            <div className="itemSet">
                {product.length > 0 ? (
                    product.map((pro) => (
                        <div key={pro.id} className="each-cart-product-container">
                            <div className="cart-image-div">
                                <img src={pro.thumbnail} alt={pro.title} className="cart-product-image" />
                            </div>
                            <div className="product-information">
                                <h3>{pro.title}</h3>
                                <p>Price: ${pro.price}</p>
                            </div>
                            <div className="cart-buttons">
                                <div className="increment-decrement-button">
                                    <button onClick={() => incrementItem(pro.id)}>+</button>
                                    <span>{itemCounts[pro.id] || 1}</span>
                                    <button onClick={() => decrementItem(pro.id)}>-</button>
                                </div>
                                <div className="remove-from-cart-button">
                                    <button onClick={(e) => handleRemoveClick(e, pro.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Your cart is empty.</h2>
                )}
            </div>
            <div className="priceDiv">
                <h1>Total Amount: ${totalPrice.toFixed(2)}</h1>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    product: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (productInformation) => dispatch(addToCartAction(productInformation)),
    removeFromCart: (id) => dispatch(removeFromTheCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
