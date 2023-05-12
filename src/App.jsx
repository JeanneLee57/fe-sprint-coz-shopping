import Header from "./components/Header";
import Dropdown from "./components/Dropdown";
import ProductList from "./components/Productlist";
import BookmarkList from "./components/BookmarkList";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <Header setShowDropdown={setShowDropdown} showDropdown={showDropdown} />
      {showDropdown && <Dropdown />}
      <ProductList />
      <BookmarkList />
    </>
  );
}

export default App;
