

const ProductCard = ({ product, navigate }) => {
    return (
        <div key={product.id} className="product-card" onClick={() => navigate(`/detail/${product.id}`)}>
            <img src={product.thumbnail} alt={product.title} />
            <h4>{product.title}</h4>
            <p>Price: ${product.price}</p>
        </div>
    );
};

export default ProductCard;
