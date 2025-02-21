import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchingDataForHomePage from "../asynchronousCalls/fetchingDataForHomePage.js";
import Carousel from "./Carousel"; // Import Carousel Component
import "../HomePage.css"; // Import the CSS

const HomePage = ({ fetchData, products, categories }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [fetchData]);

    const goToSearchPage = (e, categoryName) => {
        e.stopPropagation();
        navigate(`/search/${categoryName}`);
    };

    // Group products by category
    const categoryEntries = Object.entries(
        Object.values(products).reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {})
    );

    if (isLoading && !categories) return <h1>Loading...</h1>;
    if (typeof categories !== "object") return <h1>{categories}</h1>;

    return (
        <div className="home-container">
            {categoryEntries.map(([categoryName, products], index) => (
                <div key={index} className="category-section">
                    <h3 onClick={(e) => goToSearchPage(e, categoryName)}>{categoryName}</h3>
                    <Carousel products={products} navigate={navigate} />
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    products: state.homePageReducer.products,
    categories: state.homePageReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchingDataForHomePage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
