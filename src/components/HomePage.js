import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchingDataForHomePage from "../asynchronousCalls/fetchingDataForHomePage.js";
import "../HomePage.css"; // Import the CSS

const HomePage = ({ fetchData,products,categories }) => {
    const navigate = useNavigate();
    const sliderRefs = useRef({}); // Store refs for each category's product slider

    const [isLoading,setIsLoading] = useState(false);

    //console.log("hi from " ,success);

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [fetchData]);



    const goToSearchPage = (e, categoryName) => {
        e.stopPropagation();
        navigate(`/search/${categoryName}`);
    }

    const categoryEntries = Object.entries(
        Object.values(products).reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {})
      );

     const groupedCategories = [];

    for (let i = 0; i < categoryEntries.length; i += 4) {      // now 1st index will contain 4 category with it's product array 
        groupedCategories.push(categoryEntries.slice(i, i + 4));
    }


    const handleScrollLeft = (categoryName) => {

        sliderRefs.current[categoryName].scrollBy({ left: -200 });

    };

    const handleScrollRight = (categoryName) => {

        sliderRefs.current[categoryName].scrollBy({ left: 200 });

    };

    if (isLoading && categories === undefined) return <h1>Loading...</h1>;
    if (typeof(categories) !== "object") return <h1>{categories}</h1>;

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
    products : state.homePageReducer.products,
    categories : state.homePageReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchingDataForHomePage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
