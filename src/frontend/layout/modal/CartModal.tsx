import { cn } from "@/lib/utils";
import type { RootState } from "@/redux/store";
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { CartItem, CartReducerInitialState } from "@/frontend/types/types";
import { useEffect, useState } from "react";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
} from "@/redux/reducer/cartReducer";
import { useNavigate } from "react-router-dom";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const user = useSelector((state: RootState) => state.userReducer.user);

  const { cartItems, subtotal } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(calculatePrice());
    }
  }, [cartItems, isOpen, dispatch]);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
      toast.error(
        `Only ${cartItem.stock} item${
          cartItem.stock > 1 ? "s" : ""
        } available in stock.`,
      );
      return;
    }

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      toast.info("Minimum quantity is 1.");
      return;
    }

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
    toast.success("Item removed from your cart.");
  };

  const handleProceedToCheckout = () => {
    setLoading(true);
    if (!user) {
      toast.error("Please sign in to proceed with checkout");
      setTimeout(() => {
        navigate("/sign-in");
        onClose();
        setLoading(false);
      }, 1000);
    } else {
      toast.success("Ready for checkout");
      setTimeout(() => {
        navigate("/cart");
        onClose();
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 overflow-hidden transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={onClose}
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div
            className={cn(
              "relative w-screen max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            {/* Wrapper with flex layout */}
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="shrink-0 sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-300 bg-white">
                <h2 className="text-lg font-semibold text-gray-900">
                  Shopping Cart ({cartItems.length})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#236209] rounded-full bg-[#2B7A0B] text-white transition cursor-pointer"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items (scrollable) */}
              <div className="grow overflow-y-auto px-4 py-3">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                    <FiShoppingCart className="w-16 h-16 mb-4 text-[#2B7A0B] opacity-50" />
                    <p className="font-medium mb-2 text-base">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-gray-400 text-center">
                      Browse our products and add items to your cart
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2 bg-[#2B7A0B] text-white rounded-md hover:bg-[#236209] transition text-base cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.productId}-${item.name}`}
                        className="flex gap-4 bg-white rounded-lg p-3 border border-gray-200 hover:shadow-lg transition"
                      >
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decrementHandler(item)}
                                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                              >
                                <FiMinus className="w-5 h-5" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => incrementHandler(item)}
                                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                              >
                                <FiPlus className="w-5 h-5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeHandler(item.productId)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full cursor-pointer"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-[#2B7A0B] text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="shrink-0 sticky bottom-0 bg-white border-t border-gray-300 p-4 xl:pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-600">Total Amount:</span>
                    <span className="text-2xl font-bold text-[#2B7A0B]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {!user ? (
                    <>
                      <button
                        onClick={handleProceedToCheckout}
                        disabled={loading}
                        className="w-full bg-[#236209]  hover:bg-[#2B7A0B] text-white py-3 rounded-md transition text-lg font-medium xl:mb-4 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading && (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                        {loading ? "Navigating..." : "Sign In & Checkout"}
                      </button>
                      <p className="text-center text-sm text-gray-500 mt-2 xl:mb-4">
                        Sign in for a faster checkout and to save your order
                        history
                      </p>
                    </>
                  ) : (
                    <button
                      onClick={handleProceedToCheckout}
                      disabled={loading}
                      className="w-full bg-[#236209]  hover:bg-[#2B7A0B] text-white py-3 rounded-md transition text-lg font-medium xl:mb-4 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading && (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
