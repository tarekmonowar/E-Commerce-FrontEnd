import { FaFacebook } from "react-icons/fa6";
import { FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F3F9F1] text-gray-800 pt-6 ">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex md:grid grid-cols-3 gap-8 ">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2B7A0B]">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-[#2B7A0B] sm:text-xl mt-1" />
                <p className="text-gray-600 text-sm mt-1">Sylhet, Bangladesh</p>
              </div>
              <div className="flex items-center gap-3">
                <FiLinkedin className="text-[#2B7A0B] sm:text-xl" />
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/tarekmonowar/"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors mt-1  hover:underline"
                >
                  @TMonowar
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-[#2B7A0B] sm:text-xl" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=tarekmonowar2332@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-[11px] sm:text-sm hover:text-red-600 transition-colors  hover:underline"
                >
                  tarekmonowar2332@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaFacebook className="text-[#2B7A0B] text-xl" />
                <a
                  href="https://www.facebook.com/tarekmonowar53"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors  hover:underline"
                >
                  tarekmonowar
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#2B7A0B]">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-sm  text-gray-600 ">
                <Link
                  to="/footerLink/about-us"
                  className="hover:text-red-600 hover:underline transition-colors inline"
                >
                  About Us
                </Link>
              </p>
              <p className="text-sm text-gray-600 ">
                <Link
                  to="/footerLink/order-tracking"
                  className="hover:text-red-600 hover:underline transition-colors inline"
                >
                  Order Tracking
                </Link>
              </p>
              <p className="text-sm  text-gray-600">
                <Link
                  to="/footerLink/faqs"
                  className="hover:text-red-600 hover:underline transition-colors inline"
                >
                  FAQs
                </Link>
              </p>
              <p className="text-sm  text-gray-600">
                <Link
                  to="/footerLink/privacy-policy"
                  className="hover:text-red-600 hover:underline transition-colors inline"
                >
                  Privacy Policy
                </Link>
              </p>
              <p className="text-sm  text-gray-600">
                <Link
                  to="/footerLink/terms-conditions"
                  className="hover:text-red-600 hover:underline transition-colors inline "
                >
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#2B7A0B]">
              Newsletter
            </h3>
            <p className="text-gray-600 text-[12px] sm:text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B7A0B] focus:border-transparent"
              />
              <button className="w-full px-6 py-2.5 bg-[#2B7A0B] text-white rounded-full font-medium hover:bg-[#236209] transition-colors cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright - Both Mobile & Desktop */}
        <div className="py-2 mt-3 border-t border-gray-200 text-cente">
          <p className="text-gray-600 text-xs text-center">
            © {new Date().getFullYear()}{" "}
            <a
              target="_blank"
              href="https://www.linkedin.com/in/tarekmonowar/"
              className="text-[#236209] font-bold text-sm hover:underline"
            >
              Tarek Monowar
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
