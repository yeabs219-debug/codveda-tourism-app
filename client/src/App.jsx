import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useAuth } from "./context/AuthContext";

function Home() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-primary">
        {isAuthenticated ? `Logged in as ${user.name}` : "Not logged in"}
      </h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;