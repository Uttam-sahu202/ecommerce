import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchingDataForHomePage from "../asynchronousCalls/fetchingDataForHomePage.js";

const HomePage = ({ loadingFlag, successMessage, errorMessage, fetchData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlingProductCardClick = (e, productId) => {     // send to fetch the whole detal in detail page 
        e.stopPropagation();
        navigate(`/detail/${productId}`);
    };

    const handleCategoriesClick = (e) => {
        e.stopPropagation();
        const selectedCategory = e.target.textContent;
        navigate(`/search/${selectedCategory}`);
    }

    if (loadingFlag) {
        return <h1>Loading...</h1>;
    }

    if (successMessage?.length > 0) {
        const lastCategory = successMessage[successMessage.length - 1]?.AllCategories ?? [];

        return (
            <>

                <div className="carousel-container">
                    {lastCategory.map((curr, index) => (
                        <div key={index} onClick={handleCategoriesClick} className="AllCategories">
                            {curr}
                        </div>
                    ))}
                </div>

                <div className="ListingTheItems">
                    {successMessage.map((curr, index) => (
                        <div key={index}>
                            <h3 className="categories">{curr.categories}</h3>
                            <div className="products-container">
                                {(curr.products?.slice(0, 4) ?? []).map((pro) => (
                                    <div key={pro.id} onClick={(e) => handlingProductCardClick(e, pro.id)} className="product-card">

                                        <img src={pro.thumbnail} alt={pro.title} className="product-image" />
                                        <h4>{pro.title}</h4>
                                        <p>Rating: {pro.rating}</p>
                                        <p>Price: ${pro.price}</p>
                                        <p>Category:<span onClick={(e) => handleCategoriesClick(e)}>{curr.categories}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return <h1>{errorMessage || "Something went wrong!"}</h1>;
};

const mapStateToProps = (state) => ({
    loadingFlag: state.homePageReducer.loading,
    successMessage: state.homePageReducer.data,
    errorMessage: state.homePageReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchingDataForHomePage()),

});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
