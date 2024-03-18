import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signinup from "./containers/Signinup";
import MedicineLists from "./componens/MedicineLists";
import Signin from "./componens/Signin";
// import Signup from "./componens/Signup";
import Registration from "./componens/Registration";
import Medicineinput from "./componens/Medicineinput";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signinup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Registration" element={<Registration />} />
        {/* <Route path="/Signup" element={<Signup />} /> */}
        <Route path="/medicineLists" element={<MedicineLists />} />
        {/* <Route path="/medicineinput" element={<Medicineinput />} /> */}
      </Routes>
      {/* <Registration/> */}
    </Router>
  );
}


export default App;
