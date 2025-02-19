import DetailPage from "./components/DetailPage";
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import CartPage from "./components/CartPage.js"
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; 

const  MainApp = () =>{
    const [inputContent, setInputContent] = useState(""); 
    const navigate = useNavigate(); 
  
    
    const handleSearch = () => {
        if (inputContent.trim()) { 
            navigate(`/search/${inputContent.trim()}`);  
        }
    };

    const handleCartButton = () =>{
      navigate("/cart");
    }
  
    return (
      <>
        
        <header className="inputSection">
          <input
            type="text"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Search the category here ..."
          />
          <button onClick={handleSearch}>Search</button>
          <div><button onClick={() => handleCartButton()}>Cart</button></div>
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