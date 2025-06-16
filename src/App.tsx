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
          <div className="flex items-center font-bold space-x-4">
            <Link
              to="/login"
              className="text-primary  hover:text-gray-900 transition-colors"
            >
              Log in
            </Link>
            <span className="text-black font-light">or</span>
            <Link
              to="/register"
              className="signup-button bg-blackk text-white font-light px-6 py-2 rounded-full hover:bg-gray-900 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="main flex flex-col items-center justify-center px-8 py-[16px]">
          <div className="w-auto  text-center">
            {/* Main heading */}
            <h1 className="text-[64px] w-full font-bold text-primary mb-6">
              E-auctions made easy!
            </h1>
            <p className="font-light text-primary leading-relaxed">
              Simple way for selling your unused products, or
              <br />
              getting a deal on product you want!
            </p>
            {/* Bid button */}
            <button className="bid-button primary-yellow-bg text-primary font-semibold px-[16px] py-[8px]">
              Start bidding
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
