import Header from "./components/Header";
import Dropdown from "./components/Dropdown";
import Mainpage from "./components/Mainpage";
import ProductListPage from "./components/ProductListPage";
import BookmarkListPage from "./components/BookmarkListPage";
import Footer from "./components/Footer";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Header setShowDropdown={setShowDropdown} showDropdown={showDropdown} />
        {showDropdown && <Dropdown />}
        <main>
          {" "}
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/bookmark" element={<BookmarkListPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
