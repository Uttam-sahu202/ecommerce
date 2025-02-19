import DetailPage from "./components/DetailPage";
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import CartPage from "./components/CartPage.js"
import { Routes, Route, useNavigate } from "react-router-dom"; 

const  MainApp = () =>{             // inject the nomber of array you have in the cart and show this above cart 
    const navigate = useNavigate(); 
  

    const handleCartButton = () =>{
      navigate("/cart");
    }
  
    return (
      <>
        
        <header className="inputSection">
          <div>
          wellcome to ecommerce ...
          </div>
          <div>
            <button onClick={() => handleCartButton()}>Cart</button>
          </div>
        </header>
  
        
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/search/:searchedItem" element={<SearchPage />} /> 
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }

  export default MainApp;