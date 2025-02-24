import { useRef } from "react";
import ProductCard from "./ProductCard"; 

const Carousel = ({ products, navigate }) => {
    const sliderRef = useRef(null);

    const handleScrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const handleScrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div className="carousel-container">
            <button className="scroll-btn left" onClick={handleScrollLeft}>&#10094;</button>
            <div className="product-slider" ref={sliderRef}>                                   {/* strong the refrence of each category div so that i can apply a scrollBy on it  */}
                {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} navigate={navigate} />
                ))}
            </div>
            <button className="scroll-btn right" onClick={handleScrollRight}>&#10095;</button>
        </div>
    );
};

export default Carousel;
