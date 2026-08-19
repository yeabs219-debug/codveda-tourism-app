import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import Home from "./pages/Home/Home";
import Destinations from "./pages/Destinations/Destinations";
import DestinationDetails from "./pages/DestinationDetails/DestinationDetails";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Bookings from "./pages/Dashboard/Bookings";
import Favourites from "./pages/Dashboard/Favourites";
import Profile from "./pages/Dashboard/Profile";
import AdminDestinations from "./pages/Admin/AdminDestinations";
import { Footer } from "./components/layout/Footer";
function App() {
  return (
    <>
    <main>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
         <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          }
      />
       <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
      />
       <Route
          path="/admin/destinations"
          element={
            <ProtectedRoute adminOnly>
              <AdminDestinations />
            </ProtectedRoute>
          }
      />
      </Routes>
    </main>
      <Footer/>
    </>
  );
}

export default App;