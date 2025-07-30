/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [searchParams] = useSearchParams();
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState({ email: "" });
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  useEffect(() => {
    if (token) {
      setIsSignUp(true);
    }
  }, [token]);

  const [ForgotPassword] = useForgotPasswordMutation();
  const [ResetPassword] = useResetPasswordMutation();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  //Reset Password
  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword } = resetPassword;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 char,1 uppercase,1 number,1 special character.",
      );
      return;
    }

    setError("");
    if (!token || !userId) {
      return toast.error("Invalid Token");
    }

    try {
      setIsLoading(true);
      await ResetPassword({
        password: resetPassword.confirmPassword,
        userId,
        token,
      }).unwrap();
      toast.success("Password reset successfully. Please Login");
      navigate("/sign-in");
      setIsLoading(false);
      setResetPassword({
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      setIsLoading(false);
      setResetPassword({
        password: "",
        confirmPassword: "",
      });
      console.error("Forgot-password:", error);
      const message =
        error?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      setIsSignUp(false);
      navigate("/reset-password");
    }
  };

  //Forgot password
  const handleForgotInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = forgotEmail;
    if (!email) {
      console.warn("Please fill all signin fields");
      return;
    }

    try {
      setIsLoading(true);
      await ForgotPassword(email).unwrap();
      toast.success("Please check your Inbox to reset password");
      setIsLoading(false);
      setForgotEmail({ email: "" });
    } catch (error: any) {
      setIsLoading(false);
      console.error("Forgot-password:", error);
      const message =
        error?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  //Password validation
  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return {
      minLength: minLength.test(password),
      uppercase: uppercase.test(password),
      number: number.test(password),
      specialChar: specialChar.test(password),
      isValid:
        minLength.test(password) &&
        uppercase.test(password) &&
        number.test(password) &&
        specialChar.test(password),
    };
  };

  const passwordValidation = validatePassword(resetPassword.password);

  return (
    <div className="min-h-[90vh] xl:min-h-[85vh] bg-gray-50 flex items-center justify-center font-montserrat p-5 pt-[113px] md:pt-0">
      <div
        className={`bg-white rounded-xl border border-[#51b12b] shadow-2xl relative overflow-hidden w-full max-w-5xl h-[350px] transition-all duration-700 ease-in-out ${
          isSignUp ? "right-panel-active" : ""
        }`}
      >
        {/*Reset password */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-10"
              : "translate-x-0 opacity-0 z-0"
          }`}
        >
          <form
            onSubmit={handleResetSubmit}
            className="bg-white flex flex-col justify-between px-1 md:px-12 h-full text-center py-8"
          >
            <div>
              <h1 className="font-bold text-2xl mb-5">
                Enter Your New Password
              </h1>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={resetPassword.password}
                  onBlur={() => setTouched(true)}
                  onChange={(e) =>
                    setResetPassword({
                      ...resetPassword,
                      password: e.target.value,
                    })
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={resetPassword.confirmPassword}
                  onChange={(e) =>
                    setResetPassword({
                      ...resetPassword,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
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
              {error && (
                <p className="text-red-700 bg-red-100 text-sm font-medium my-1 py-2 rounded-md">
                  {error}
                </p>
              )}
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
                  Reset Password...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>

        {/* Forgot password */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out z-20 ${
            isSignUp
              ? "translate-x-0 opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          }`}
        >
          <form
            onSubmit={handleForgotInSubmit}
            className="bg-white flex flex-col justify-center gap-5 px-1 md:px-12 h-full text-center py-8"
          >
            <div>
              <h1 className="font-bold text-2xl mb-6">Enter Your Email</h1>

              <input
                type="email"
                value={forgotEmail.email}
                autoComplete="email"
                onChange={(e) =>
                  setForgotEmail({ ...forgotEmail, email: e.target.value })
                }
                placeholder="Email"
                required
                className="bg-gray-50 border border-gray-500 px-4 py-3 my-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B7A0B]"
              />
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
                  Sending Link...
                </div>
              ) : (
                "Forgot Password"
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
              </div>

              {touched && !passwordValidation.isValid && (
                <div className="absolute bottom-6 text-sm space-y-1 p-2 w-full text-left pl-10 text-black">
                  {!passwordValidation.minLength && <span>8 char &</span>}
                  {!passwordValidation.uppercase && <span> 1 uppercase &</span>}
                  {!passwordValidation.number && <span> 1 number &</span>}
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

              <p className="text-md  leading-5 tracking-wide mb-8 text-white/90">
                Please enter your email address, and check your inbox to reset
                your password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
