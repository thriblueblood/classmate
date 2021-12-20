// import LoginPage from "./LoginPage/LoginPage";
// import MainPage from "./MainPage/MainPage";
// import Register from "./LoginPage/Register";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage/>}/>
//         <Route path="/signup" element={<Register/>}/>
//         <Route path="/main/*" element={<MainPage/>}/>
//       </Routes>

//     </Router>
//   )
// }

// export default App;






import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import Register from "./LoginPage/Register";
import InitialPage from "./InitialPage";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {useEffect, useState} from "react";

function App() {


  const [hasToken,setToken] = useState(false);

  const authToken = (boolean) =>{
    setToken(boolean);

  }

  async function checkAuth(){
    try {
      const response = await fetch("http://localhost:3001/api/user/verify",{
        method: "GET",
        headers: {token: localStorage.token},
        
      });

      const parseRes = await response.json();

      parseRes === true 
        ? setToken(true)
        : setToken(false);

      console.log(parseRes);
      
    } catch (err) {
      console.error(err.message);
      
    }
  }

  useEffect(() => {
    checkAuth();
  
  });

  return (
    <Router>
      <Routes>
        <Route  path="/" element={(props) => hasToken ? (<InitialPage {...props} authToken={authToken}/>) : (<Navigate to="/main" />)}/>
        <Route  path="/login" element={(props) => hasToken ? (<LoginPage {...props} authToken={authToken}/>) : (<Navigate to="/" />)}/>
        <Route  path="/signup" element={(props) => hasToken ? (<Register {...props} authToken={authToken}/>) : (<Navigate to="/" />)}/>
        <Route  path="/main/*" element={(props) => hasToken ? (<MainPage {...props} authToken={authToken}/>) : (<Navigate to="/" />)}/>
      </Routes>

    </Router>
  )
}

export default App;
