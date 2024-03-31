import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Gifts from "./views/pages/Pages";
import "bootstrap/dist/css/bootstrap.min.css";
import GiftList from "./views/pages/GiftByList";
import GiftById from "./views/pages/GiftById";
import AddGift from "./views/pages/createGift";
import GiftListActive from "./views/pages/ListActive";
import ReservedGift from "./views/pages/ReservedGift";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Gifts" element={<Gifts />} />
          <Route path="/Gifts/List/:listId" element={<GiftList />} />
          <Route path="/Gifts/:listId" element={<GiftById />} />
          <Route path="/Gifts/create" element={<AddGift />} />
          <Route path="/GiftsList/active" element={<GiftListActive />} />
          <Route path="/Gifts/reserved" element={<ReservedGift />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
