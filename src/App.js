import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Info from "./components/Main/Info/Info";
import ListCountry from "./components/Main/ListCountry";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  document.title = "Danh sách quốc gia";
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header></Header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ListCountry />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
