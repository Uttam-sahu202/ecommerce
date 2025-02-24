import DetailPage from "./components/DetailPage";
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import CartPage from "./components/CartPage.js"
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const MainApp = ({ numberOfItemInCart }) => {              
  const navigate = useNavigate();




  const handleCartButton = () => {
    navigate("/cart");
  }

  return (
    <>

      <header className="inputSection">
        <div>
          wellcome to ecommerce ...
        </div>
        <div>
          <button className="cart-button" onClick={() => handleCartButton()}>
            Cart{numberOfItemInCart > 0 && <span className="cartValue">{numberOfItemInCart}</span>}
          </button>
        </div>
      </header>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchedItem?" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}


const mapStateToProps = (state) => ({
  numberOfItemInCart: state.cartReducer.length,
});
export default connect(mapStateToProps, null)(MainApp);