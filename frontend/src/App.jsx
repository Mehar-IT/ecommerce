import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.jsx";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid", "Chilanks"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route extact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
