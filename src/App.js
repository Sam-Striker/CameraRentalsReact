import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Remove `useNavigate`
import CustomerDashboard from './Components/Dashboard/CustomerDashboard.jsx';
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx';
import ClientCameras from './Components/Handlers/ClientCameras.jsx';
import ListCameras from './Components/Handlers/ListCameras';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route
          path="/CustomerDashboard"
          // element={<AuthGuard component={CustomerDashboard} isAuthenticated={isAuthenticated} />}
          element={<CustomerDashboard />} />
          <Route
          path="/AdminDashboard"        
          element={<AdminDashboard />} /> 
          <Route
          path="/ClientCameras"        
          element={<ClientCameras />} /> 
          <Route
          path="/ListCameras"        
          element={<ListCameras />} />       
      </Routes>
    </Router>
  );
}
export default App;
