import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage/LoginPage';
import Register from './LoginPage/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/home/*" element={<HomePage/>}/>
      </Routes>

    </Router>
  );
}

export default App;
