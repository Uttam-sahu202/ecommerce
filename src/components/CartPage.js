import { connect } from "react-redux";
import incrementIdsQuantityInCartAction from "../actions/incrementIdsQuantityInCartAction.js";
import decrementIdsQuantityInCartAction from "../actions/decrementIdsQuantityInCartAction.js";
import removeFromTheCart from "../actions/removeFromTheCart.js";
import { useState, useEffect } from "react";

const CartPage = ({ removeFromCart, productIdAndQuantity, productIdAndProductMapping, increaseQuantity, decreaseQuantity }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {    
        const newTotalPrice = productIdAndQuantity.reduce((sum, pro) => {
            const product = productIdAndProductMapping[pro.id];  
            return product ? sum + (product.price * pro.quantity) : sum;
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [productIdAndQuantity, productIdAndProductMapping]);

    const incrementItem = (id) => {
        increaseQuantity(id);
    };

    const decrementItem = (id) => {
       // alert("dec button clicked ");
        decreaseQuantity(id);
    };

    const handleRemoveClick = (e, id) => {
        e.stopPropagation();
        removeFromCart(id);
    };

    return (
        <div className="cart-body">
            <div className="itemSet">
                {productIdAndQuantity.length > 0 ? (
                    productIdAndQuantity.map((pro) => {
                        const product = productIdAndProductMapping[pro.id];
                        return product ? (
                            <div key={pro.id} className="each-cart-product-container">
                                <div className="cart-image-div">
                                    <img src={product.thumbnail} alt={product.title} className="cart-product-image" />
                                </div>
                                <div className="product-information">
                                    <h3>{product.title}</h3>
                                    <p>Price: ${product.price}</p>
                                </div>
                                <div className="cart-buttons">
                                    <div className="increment-decrement-button">
                                        <button onClick={() => incrementItem(pro.id)}>+</button>
                                        <span>{pro.quantity}</span>
                                        <button onClick={() => decrementItem(pro.id)}>-</button>
                                    </div>
                                    <div className="remove-from-cart-button">
                                        <button onClick={(e) => handleRemoveClick(e, pro.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ) : null;
                    })
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
    productIdAndQuantity: state.cartReducer,  
    productIdAndProductMapping: state.homePageReducer.products,  
});

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (id) => dispatch(removeFromTheCart(id)),
    increaseQuantity: (id) => dispatch(incrementIdsQuantityInCartAction(id)),  
    decreaseQuantity: (id) => dispatch(decrementIdsQuantityInCartAction(id)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
