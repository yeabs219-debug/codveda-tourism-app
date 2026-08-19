import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-white/80 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-extrabold text-lg mb-3">Codeveda Tourism</h3>
            <p className="text-sm">
              Discover places worth remembering. Explore, book, and experience the journey.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-sm">
              A student project exploring modern travel booking experiences.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-sm text-center text-white/60">
          © {new Date().getFullYear()} Codeveda Tourism. All rights reserved.
        </div>
      </div>
    </footer>
  );
}