import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Gifts from "./views/pages/Pages";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Gifts" element={<Gifts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
