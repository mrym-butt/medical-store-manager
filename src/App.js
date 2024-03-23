import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signinup from "./containers/Signinup";
import MedicineLists from "./componens/MedicineLists";
import Signin from "./componens/Signin";
import Registration from "./componens/Registration";
import UpdatedMedicineList from "./componens/UpdatedMedicineList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signinup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/medicineLists" element={<MedicineLists />} />
        
        <Route path="/updated-medicine-list" element={<UpdatedMedicineList />} />

      </Routes>
    </Router>
  );
}

export default App;
