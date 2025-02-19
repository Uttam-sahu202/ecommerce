import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchingDataForHomePage from "../asynchronousCalls/fetchingDataForHomePage.js";
import "../HomePage.css"; // Import the CSS

const HomePage = ({ loadingFlag, success, errorMessage, fetchData }) => {
    const navigate = useNavigate();
    const sliderRefs = useRef({}); // Store refs for each category's product slider
    const [scrollPosition, setScrollPosition] = useState({}); // Track scroll position for buttons

    useEffect(() => {
        fetchData();
    }, [fetchData]);

   

    const goToSearchPage = (e,categoryName) =>{
        e.stopPropagation();
        navigate(`/search/${categoryName}`);
    }

    const categoryWiseProducts = (success?.categoryWiseFourOrLessData || []).reduce((acc, categoryData) => {  // maping product array category wise 
        if (categoryData?.products?.length > 0) {
            const categoryName = categoryData.products[0].category;
            acc[categoryName] = categoryData.products;
        }
        return acc;
    }, {});



    const groupedCategories = [];
    const categoryEntries = Object.entries(categoryWiseProducts);

    for (let i = 0; i < categoryEntries.length; i += 4) {
        groupedCategories.push(categoryEntries.slice(i, i + 4));
    }


    const handleScroll = (categoryName) => {
        const scrollContainer = sliderRefs.current[categoryName];
        setScrollPosition((prev) => ({
            ...prev,
            [categoryName]: {
                leftHidden: scrollContainer.scrollLeft <= 0,
                rightHidden: scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth,
            },
        }));
    };

    const handleScrollLeft = (categoryName) => {
        if (sliderRefs.current[categoryName]) {
            sliderRefs.current[categoryName].scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const handleScrollRight = (categoryName) => {
        if (sliderRefs.current[categoryName]) {
            sliderRefs.current[categoryName].scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    if (loadingFlag) return <h1>Loading...</h1>;
    if (errorMessage) return <h1>{errorMessage}</h1>;

    return (
        <div className="home-container">
            {groupedCategories.map((categoryRow, rowIndex) => (
                <div key={rowIndex} className="category-row">
                    {categoryRow.map(([categoryName, products], index) => (
                        <div key={index} className="category">
                            <h3 onClick={(e)=>goToSearchPage(e,categoryName)} >{categoryName}</h3>
                            <div
                                className="product-slider"
                                ref={(el) => {
                                    sliderRefs.current[categoryName] = el;
                                    if (el) el.addEventListener("scroll", () => handleScroll(categoryName));
                                }}
                            >
                                {products.map((product) => (
                                    <div key={product.id} className="product-card" onClick={() => navigate(`/detail/${product.id}`)}>
                                        <img src={product.thumbnail} alt={product.title} />
                                        <h4>{product.title}</h4>
                                        <p>Price: ${product.price}</p>
                                    </div>
                                ))}
                            </div>
                            {!scrollPosition[categoryName]?.leftHidden && (
                                <button className="scroll-btn left" onClick={() => handleScrollLeft(categoryName)}>
                                    &#10094;
                                </button>
                            )}
                            {!scrollPosition[categoryName]?.rightHidden && (
                                <button className="scroll-btn right" onClick={() => handleScrollRight(categoryName)}>
                                    &#10095;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    loadingFlag: state.dataFetchedForHomePage.loading,
    success: state.dataFetchedForHomePage.data,
    errorMessage: state.dataFetchedForHomePage.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchingDataForHomePage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
