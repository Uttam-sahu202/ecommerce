import './App.css';
import MainApp from './mainApp';
import { BrowserRouter } from "react-router-dom";  

function App() {
  return (
    <BrowserRouter>        {/*  <Router history={customHistory}>  BrowserRouter will manage history outomatically  */}
      <MainApp />
    </BrowserRouter>
  );
}


export default App;
