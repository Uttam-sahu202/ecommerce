import './App.css';
import MainApp from './mainApp';
import { BrowserRouter } from "react-router-dom";  

function App() {
  return (
    <BrowserRouter> 
      <MainApp />
    </BrowserRouter>
  );
}


export default App;
