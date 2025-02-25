import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchingDataForHomePage from "../asynchronousCalls/fetchingDataForHomePage.js";
import Carousel from "./Carousel"; 
import "../HomePage.css"; 

const HomePage = ({ fetchData, products, categories }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [fetchData]);

    const goToSearchPage = (e, categoryName) => {    // navigating to  search page with the clcked category 
        e.stopPropagation();
        navigate(`/search/${categoryName}`);
    };

    const categoryEntries = Object.entries(                  
        Object.values(products).reduce((acc, product) => {  // object.values(products) return an array and then applying .reduce funtion on each array element 
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {})
    );                 // now converting the objects into the array form like [ ["categoryNmae",[productsArray]],... ]

    if (isLoading && !categories) return <h1>Loading...</h1>;
    if (typeof categories !== "object") return <h1>{categories}</h1>;

    return (
        <div className="home-container">
            {categoryEntries.map(([categoryName, products], index) => (  // destructuring the categoryName and productsArray
                <div key={index} className="category-section">
                    <h3 onClick={(e) => goToSearchPage(e, categoryName)}>{categoryName}</h3>  {/* applying  event linstner on it */}
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

const mapDispatchToProps = (dispatch) => ({               // is a function that connects action creators to a component
    fetchData: () => dispatch(fetchingDataForHomePage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage); // connect is a HOC use to inject redux state and dispatch in component
