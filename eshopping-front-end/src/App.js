import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Shoppingcart from "./components/Shoppingcart";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Shoppingcart
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
