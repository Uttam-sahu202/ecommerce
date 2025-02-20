import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchingDataForHomePage from "../asynchronousCalls/fetchingDataForHomePage.js";
import "../HomePage.css"; // Import the CSS

const HomePage = ({ loadingFlag, success, errorMessage, fetchData }) => {
    const navigate = useNavigate();
    const sliderRefs = useRef({}); // Store refs for each category's product slider

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    const goToSearchPage = (e, categoryName) => {
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
    const categoryEntries = Object.entries(categoryWiseProducts);  // now we have an array of array like [ ["laptops",[products]],["grosory",[products]],...]

    for (let i = 0; i < categoryEntries.length; i += 4) {      // now 1st index will contain 4 category with it's product array 
        groupedCategories.push(categoryEntries.slice(i, i + 4));
    }


    const handleScrollLeft = (categoryName) => {

        sliderRefs.current[categoryName].scrollBy({ left: -200 });

    };

    const handleScrollRight = (categoryName) => {

        sliderRefs.current[categoryName].scrollBy({ left: 200 });

    };

    if (loadingFlag) return <h1>Loading...</h1>;
    if (errorMessage) return <h1>{errorMessage}</h1>;

    return (
        <div className="home-container">
            {groupedCategories.map((categoryRow, rowIndex) => ( // categoryRow will have 3 index with category and product array in each index including zero  
                <div key={rowIndex} className="category-row">
                    {categoryRow.map(([categoryName, products], index) => ( // ritriving each array which is like ["caterory",[products]]
                        <div key={index} className="category">
                            <h3 onClick={(e) => goToSearchPage(e, categoryName)} >{categoryName}</h3>
                            <div
                                className="product-slider"
                                ref={(el) => {                             // it take variable and functon as well so passing function to it
                                    sliderRefs.current[categoryName] = el;   // store {categoryName : <div productSlider>...</div>} like this 
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

                            <button className="scroll-btn left" onClick={() => handleScrollLeft(categoryName)}>
                                &#10094;
                            </button>


                            <button className="scroll-btn right" onClick={() => handleScrollRight(categoryName)}>
                                &#10095;
                            </button>

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
