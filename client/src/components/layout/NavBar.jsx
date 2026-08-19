import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Heart, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";

export function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
     <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
            Codeveda <span className="text-accent">Tourism</span>
           </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/destinations" className="text-text hover:text-primary transition-colors">
              Destinations
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-text hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/favourites" className="text-text hover:text-primary transition-colors">
                  Favourites
                </Link>
                <Link to="/bookings" className="text-text hover:text-primary transition-colors">
                  Bookings
                </Link>
                {isAdmin && (
                  <Link to="/admin/destinations" className="text-text hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="text-text hover:text-primary transition-colors">
                  {user.name}
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text hover:text-primary transition-colors">
                  Login
                </Link>
                <Button variant="primary" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-3 pb-4">
            <Link to="/destinations" onClick={() => setMobileOpen(false)} className="text-text">
              Destinations
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-text">
                  Dashboard
                </Link>
                <Link to="/favourites" onClick={() => setMobileOpen(false)} className="text-text">
                  Favourites
                </Link>
                <Link to="/bookings" onClick={() => setMobileOpen(false)} className="text-text">
                  Bookings
                </Link>
                {isAdmin && (
                  <Link to="/admin/destinations" onClick={() => setMobileOpen(false)} className="text-text">
                    Admin
                  </Link>
                )}
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-text">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-left text-error">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-text">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-primary font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}