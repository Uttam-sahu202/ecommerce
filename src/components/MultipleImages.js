const MultipleImages = ({ images, setImageArrayIndex }) => {
    return (
        <div className="multipleImagesViwes">
            {images?.map((image, index) => (
                <div 
                    key={index} 
                    className="eachImage" 
                    onClick={() => setImageArrayIndex(index)}
                >
                    <img src={image} alt={`${index}`} />
                </div>
            ))}
        </div>
    );
};

export default MultipleImages;
