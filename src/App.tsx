import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          {/* Logo */}
          <img src="src/assets/logo.png" alt="logo" className="w-12 h-12" />

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Log in
            </Link>
            <span className="text-gray-400">or</span>
            <Link
              to="/register"
              className="bg-blackk text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-2xl text-center">
            {/* Main heading */}
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              E-auctions made easy!
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Simple way for selling your unused products, or
              <br />
              getting a deal on product you want!
            </p>

            {/* CTA button */}
            <button className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition-colors shadow-sm">
              Start bidding
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
