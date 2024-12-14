import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route  } from "react-router";
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';

function App() {
  return (
    <Router>
      <NoteState>
        <div className="App">
          <NavBar /> {/* Add NavBar component */}
          <Alert message = ""/>
          <div>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
              </Routes>
          </div>
        </div>
      </NoteState>
    </Router>
  );
}

export default App;
