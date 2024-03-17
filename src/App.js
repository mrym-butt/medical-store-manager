import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signinup from "./containers/Signinup";
import MedicineLists from "./componens/MedicineLists";
import Signin from "./componens/Signin";
import Signup from "./componens/Signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signinup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/medicineLists" element={<MedicineLists />} />
      </Routes>
    </Router>
  );
}


export default App;
