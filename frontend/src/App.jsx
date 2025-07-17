
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Membership from './pages/Membership'
import Events from './pages/Events'
import Contact from './pages/Contact'
import AdminNavbar from './admin/AdminNavbar';

import Dashboard from './admin/Dashboard'
import ManageContact from './admin/ManageSocials'
import Manageevents from './admin/Manageevents'
import Managemembers from './admin/Managemembers'
import Managerecruitments from './admin/Managerecruitments'
import AdminLogin from './pages/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import TeamMembers from './pages/TeamMembers';
import ManageSocials from './admin/ManageSocials';
import ManageLeaders from './admin/ManageLeaders';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin';
  return (
     <>
         {isAdminRoute ? <PrivateRoute><AdminNavbar /></PrivateRoute> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/admin/members" element={<PrivateRoute><Managemembers /></PrivateRoute>} />
        <Route path="/admin/events" element={<PrivateRoute><Manageevents /></PrivateRoute>} />
        <Route path="/admin/recruitments" element={<PrivateRoute><Managerecruitments /></PrivateRoute>} />
        <Route path="/admin/socials" element={<PrivateRoute><ManageSocials /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/leaders" element={<PrivateRoute><ManageLeaders /></PrivateRoute>} />
        <Route path="/team/:slug" element={<TeamMembers />} />
      </Routes>
    </>
  );
}
