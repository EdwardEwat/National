import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Info from "./components/Main/Info/Info";
import ListCountry from "./components/Main/ListCountry";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  document.title = "Danh sách quốc gia";
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<ListCountry />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
      <Footer haveclass={null}></Footer>
    </div>
  );
}

export default App;
