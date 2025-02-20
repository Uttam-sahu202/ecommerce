import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchingDataForDetailPage from "../asynchronousCalls/fetchingDataForDetailPage.js";

const DetailPage = ({ products}) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchDataAsync = async () => {
            if (products[id] === undefined) {
                setLoading(true);
                try {
                    const data = await fetchingDataForDetailPage(id);
                    setSuccessMessage(data);
                } catch (error) {
                    setSuccessMessage("Can't get the data for product");
                }
                setLoading(false);
            } else {
                setSuccessMessage(products[id]);
            }
        };

        fetchDataAsync();
    }, [id, products]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (typeof successMessage !== "object") {
        return <h1>{successMessage}</h1>;
    }

    return (
        <div className="detail-page-container">
            {/* Product Image */}
            <div className="selected-product-image">
                <img src={successMessage?.thumbnail} alt={successMessage?.title} />
            </div>

            {/* Product Details */}
            <div className="detail-content">
                <h2>{successMessage?.title}</h2>
                <p><strong>Description:</strong> {successMessage?.description}</p>
                <p><strong>Category:</strong> {successMessage?.category}</p>
                <p><strong>Brand:</strong> {successMessage?.brand}</p>
                <p><strong>Price:</strong> ${successMessage?.price}</p>
                <p><strong>Discount:</strong> {successMessage?.discountPercentage}%</p>
                <p><strong>Rating:</strong> ⭐ {successMessage?.rating}</p>
                <p><strong>Stock:</strong> {successMessage?.availabilityStatus}</p>
                <p><strong>SKU:</strong> {successMessage?.sku}</p>
                <p><strong>Weight:</strong> {successMessage?.weight}g</p>
                <p><strong>Warranty:</strong> {successMessage?.warrantyInformation}</p>
                <p><strong>Shipping:</strong> {successMessage?.shippingInformation}</p>
                <p><strong>Return Policy:</strong> {successMessage?.returnPolicy}</p>
                <p><strong>Minimum Order Quantity:</strong> {successMessage?.minimumOrderQuantity}</p>
            </div>

            {/* Customer Reviews */}
            <div className="reviews-section">
                <h3>Customer Reviews</h3>
                <div className="reviews">
                    {successMessage?.reviews?.length > 0 ? (
                        successMessage.reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                                <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                                <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    products: state.homePageReducer.products,
});



export default connect(mapStateToProps)(DetailPage);
