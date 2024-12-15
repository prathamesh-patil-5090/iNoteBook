import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <NoteState>
        <div className="App">
          <NavBar /> {/* Add NavBar component */}
          <Alert message="" />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </NoteState>
    </Router>
  );
}

export default App;
