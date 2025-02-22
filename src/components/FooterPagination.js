const FooterPagination = ({ currentPage, total, fetchDataAsync, setcurrentPage, searchedItem }) => {
    return (
        <footer className="vavigation-footer">
            <div className="withButtons">
                <button
                    onClick={() => {
                        if (currentPage > 1) {
                            fetchDataAsync(searchedItem, currentPage - 1);
                            setcurrentPage((prev) => prev - 1);
                        }
                    }}
                >
                    &#10094;
                </button>
                <div className="footer-div">
                    {currentPage}/{Math.ceil(total / 10)}
                </div>
                <button
                    onClick={() => {
                        if (currentPage < Math.ceil(total / 10)) {
                            fetchDataAsync(searchedItem, currentPage + 1);
                            setcurrentPage((prev) => prev + 1);
                        }
                    }}
                >
                    &#10095;
                </button>
            </div>
        </footer>
    );
};

export default FooterPagination;
