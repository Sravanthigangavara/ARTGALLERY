import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import AdminDashboard from "./pages/AdminDashboard";
import ArtistDashboard from "./pages/ArtistDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/artistdashboard" element={<ArtistDashboard />} />
      <Route path="/customerdashboard" element={<CustomerDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;