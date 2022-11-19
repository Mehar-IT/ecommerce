import "./App.css";
import Header from "./components/layout/Header";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";

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
    </Router>
  );
}

export default App;
