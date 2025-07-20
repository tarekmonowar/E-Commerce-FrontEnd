import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signinData, setSigninData] = useState({ email: "", password: "" });

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  //signUp handler
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    if (!name || !email || !password) {
      console.warn("Please fill all signup fields");
      return;
    }
    console.log("Sign Up Data:", signupData);
  };

  //signIn handler
  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = signinData;
    if (!email || !password) {
      console.warn("Please fill all signin fields");
      return;
    }
    console.log("Sign In Data:", signinData);
  };

  return (
    <div className="min-h-[90vh] xl:min-h-[85vh] bg-gray-50 flex items-center justify-center font-montserrat p-5 pt-[113px] md:pt-0">
      <div
        className={`bg-white rounded-xl border border-[#51b12b] shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[480px] transition-all duration-700 ease-in-out ${
          isSignUp ? "right-panel-active" : ""
        }`}
      >
        {/* Sign Up Form Container */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-10"
              : "translate-x-0 opacity-0 z-0"
          }`}
        >
          <form
            onSubmit={handleSignUpSubmit}
            className="bg-white flex flex-col justify-between px-1 md:px-12 h-full text-center py-8"
          >
            <div>
              <h1 className="font-bold text-2xl mb-6">Create Account</h1>
              <div className="flex space-x-3 mb-6 justify-center">
                <button className="border border-gray-300 rounded-full bg-[#EA4335] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#ea3535ab] transition-colors cursor-pointer hover:scale-105">
                  <FaGoogle size={24} />
                </button>
                <button className="border border-gray-300 bg-gray-300 rounded-full w-10 h-10 xl:w-12 xl:h-12 cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors hover:scale-105">
                  <FaGithub size={24} />
                </button>

                <button className="border border-gray-300 rounded-full cursor-pointer bg-[#4267B2] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#4267b2e7] transition-colors hover:scale-105">
                  <FaFacebook size={24} />
                </button>
              </div>
              <span className="mb-4 text-base text-gray-800 block">
                or use Email
              </span>
              <input
                type="name"
                placeholder="name"
                value={signupData.name}
                required
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className="bg-gray-50 border border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B7A0B]"
              />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                required
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="bg-gray-50 border border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B7A0B]"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  placeholder="Password"
                  required
                  className="bg-gray-50 border border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B7A0B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md border border-[#2B7A0B] bg-[#2B7A0B] text-white text-xs xl:text-base font-bold py-3 px-11 mt-2 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form Container */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out z-20 ${
            isSignUp
              ? "translate-x-0 opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          }`}
        >
          <form
            onSubmit={handleSignInSubmit}
            className="bg-white flex flex-col justify-between px-1 md:px-12 h-full text-center py-8"
          >
            <div>
              <h1 className="font-bold text-2xl mb-6">Sign In</h1>
              <div className="flex space-x-3 mb-6 justify-center">
                <button className="border border-gray-300 rounded-full bg-[#EA4335] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#ea3535ab] transition-colors cursor-pointer hover:scale-105">
                  <FaGoogle size={24} />
                </button>
                <button className="border border-gray-300 bg-gray-300 rounded-full w-10 h-10 xl:w-12 xl:h-12 cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors hover:scale-105">
                  <FaGithub size={24} />
                </button>

                <button className="border border-gray-300 rounded-full cursor-pointer bg-[#4267B2] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#4267b2e7] transition-colors hover:scale-105">
                  <FaFacebook size={24} />
                </button>
              </div>
              <span className="mb-4 text-base text-gray-800 block">
                or use Email
              </span>
              <input
                type="email"
                value={signinData.email}
                onChange={(e) =>
                  setSigninData({ ...signinData, email: e.target.value })
                }
                placeholder="Email"
                required
                className="bg-gray-50 border border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B7A0B]"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={signinData.password}
                  onChange={(e) =>
                    setSigninData({ ...signinData, password: e.target.value })
                  }
                  placeholder="Password"
                  required
                  className="bg-gray-50 border border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B7A0B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <a
                href="#"
                className="text-gray-700 text-sm my-4 hover:text-[#2B7A0B] transition-colors block hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className="rounded-md border border-[#2B7A0B] bg-[#2B7A0B] text-white text-xs xl:text-base font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-[40] ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div
            className={`bg-gradient-to-r from-[#24640a] to-[#44a347] text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-0" : "-translate-x-1/5"
              }`}
            >
              <h1 className="font-bold text-2xl mb-4">
                Thanks for choosing us!
              </h1>
              <p className="text-sm font-light leading-5 tracking-wide mb-8">
                Join us today and start your shopping journey
              </p>
              <button
                onClick={toggleMode}
                className="rounded-full border border-white bg-transparent text-black text-xs md:text-base font-bold py-2 px-9 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-1/5" : "translate-x-0"
              }`}
            >
              <h1 className="font-bold text-2xl mb-4">Wellcome Back !</h1>
              <p className="text-sm font-light leading-5 tracking-wide mb-8 text-[#f3b90c]">
                Sign in for a faster checkout experience
              </p>
              <button
                onClick={toggleMode}
                className="rounded-full border border-white bg-transparent text-black text-xs md:text-base font-bold py-2 px-9 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
