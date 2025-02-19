import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchingDataForDetailPage from "../asynchronousCalls/fetchingDataForDetailPage.js";

const DetailPage = ({ loadingFlag, successMessage, errorMessage, fetchData }) => {
    const { id } = useParams();

    useEffect(() => {
        fetchData(id);
    }, [id, fetchData]);

    if (loadingFlag) {
        return <h1>Loading...</h1>;
    }

    if (errorMessage) {
        return <h1>{errorMessage}</h1>;
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
    loadingFlag: state.detailReducer.loading,
    successMessage: state.detailReducer.data,
    errorMessage: state.detailReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: (id) => dispatch(fetchingDataForDetailPage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
