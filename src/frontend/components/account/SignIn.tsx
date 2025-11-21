/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginMutation } from "@/redux/api/authApi";
import { useRegisterMutation } from "@/redux/api/userApi";
import { setUser } from "@/redux/reducer/userReducer";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const AuthForm = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signinData, setSigninData] = useState({ email: "", password: "" });

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(decodeURIComponent(error));
    }
  }, [searchParams]);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  //register/signUp handler
  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    if (!name || !email || !password) {
      console.warn("Please fill all signup fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await register({ name, email, password });
      if (res.data?.success) {
        toast.success("Register Successful, Please Login");
        setIsSignUp(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const errorData = (res.error as any)?.data;
        let message = "Registration failed.";
        if (errorData?.errorSource?.length > 0) {
          const seen = new Set();
          message = errorData.errorSource
            .filter((e: any) => {
              if (seen.has(e.path)) return false;
              seen.add(e.path);
              return true;
            })
            .map((e: any) => `${e.path}: ${e.message}`)
            .join(", ");
        } else if (errorData?.message) {
          message = errorData.message;
        } else if ((res.error as any)?.message) {
          message = (res.error as any).message;
        }
        toast.error(message);
      }
    } catch (error: any) {
      setIsLoading(false);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  //Login/signIn handler
  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = signinData;
    if (!email || !password) {
      console.warn("Please fill all signin fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await login({ email, password });

      if (res.data?.success) {
        toast.success(res.data.message);
        Dispatch(setUser(res.data.data));
        navigate("/");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const message =
          (res.error as any)?.data?.message ||
          (res.error as any)?.message ||
          "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Sign in failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  //Password validation
  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return {
      minLength: minLength.test(password),
      uppercase: uppercase.test(password),
      lowercase: lowercase.test(password),
      specialChar: specialChar.test(password),
      isValid:
        minLength.test(password) &&
        uppercase.test(password) &&
        lowercase.test(password) &&
        specialChar.test(password),
    };
  };

  const passwordValidation = validatePassword(signupData.password);

  //Google
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER}/api/v1/auth/google`;
  };
  //Github
  const handleGithubLogin = () => {
    toast.info("Github login coming soon...");
  };
  //facebook
  const handlefacebookLogin = () => {
    toast.info("Facebook login coming soon...");
  };

  //logIn demo account

  const fillDemoAccount = (email: string, password: string) => {
    setSigninData({ email, password });
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
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="border border-gray-300 rounded-full bg-[#EA4335] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#ea3535ab] transition-colors cursor-pointer hover:scale-105"
                >
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
                type="text"
                placeholder="name"
                autoComplete="name"
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
                autoComplete="email"
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
                  onBlur={() => setTouched(true)}
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
              {" "}
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Signing up...
                </div>
              ) : (
                "Sign Up"
              )}
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
            <div className="px-1  md:px-0">
              <h1 className="font-bold text-2xl mb-6">Sign In</h1>
              <div className="flex space-x-3 mb-6 justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="border border-gray-300 rounded-full bg-[#EA4335] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#ea3535ab] transition-colors cursor-pointer hover:scale-105"
                >
                  <FaGoogle size={24} />
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="border border-gray-300 bg-gray-300 rounded-full w-10 h-10 xl:w-12 xl:h-12 cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors hover:scale-105"
                >
                  <FaGithub size={24} />
                </button>

                <button
                  onClick={handlefacebookLogin}
                  className="border border-gray-300 rounded-full cursor-pointer bg-[#4267B2] text-white w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center hover:bg-[#4267b2e7] transition-colors hover:scale-105"
                >
                  <FaFacebook size={24} />
                </button>
              </div>
              <span className="mb-4 text-base text-gray-800 block">
                or use Email
              </span>
              <input
                type="email"
                value={signinData.email}
                autoComplete="email"
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
              <Link
                to={"/reset-password"}
                className="text-gray-700 text-sm my-4 hover:text-[#2B7A0B] transition-colors block hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md border border-[#2B7A0B] bg-[#2B7A0B] text-white text-xs xl:text-base font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
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
              <div className="flex flex-col items-center justify-center">
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

              {touched && !passwordValidation.isValid && (
                <div className="absolute bottom-6 text-sm space-y-1 p-2 w-full text-left pl-10 text-black">
                  {!passwordValidation.minLength && <span>8 char &</span>}
                  {!passwordValidation.uppercase && <span> 1 uppercase &</span>}
                  {!passwordValidation.lowercase && <span> 1 lowercase &</span>}
                  {!passwordValidation.specialChar && (
                    <span> 1 special char</span>
                  )}
                </div>
              )}
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute right-0 flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-1/5" : "translate-x-0"
              }`}
            >
              <h1 className="font-bold text-2xl mb-4">Wellcome Back !</h1>
              <p className="text-sm font-light leading-5 tracking-wide mb-8 text-white/80">
                Don't have an account? Register here
              </p>
              <button
                onClick={toggleMode}
                className="rounded-full border border-white bg-transparent text-black text-xs md:text-base font-bold py-2 px-9 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
              >
                Register
              </button>
              <div className="absolute bottom-6 text-sm space-y-1 p-2 w-full text-left pl-10 text-black">
                <p className="text-center">
                  Try the platform with demo accounts
                </p>
                <div className="flex gap-3 justify-center mt-2">
                  <button
                    onClick={() =>
                      fillDemoAccount("tarekmonowar353@gmail.com", "12345Tm@")
                    }
                    className="rounded border border-white bg-transparent text-black text-xs md:text-base font-semibold py-1 px-4 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() =>
                      fillDemoAccount("tarekmonowar2332@gmail.com", "123456Ph@")
                    }
                    className="rounded border border-white bg-transparent text-black text-xs md:text-base font-semibold py-1 px-4 tracking-wider uppercase transition-transform duration-75 hover:scale-95 focus:outline-none cursor-pointer"
                  >
                    User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
