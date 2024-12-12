import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Link, Routes, Route  } from "react-router";

function App() {
  return (
    <>
      <div className="App">
        <NavBar /> {/* Add NavBar component */}
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
