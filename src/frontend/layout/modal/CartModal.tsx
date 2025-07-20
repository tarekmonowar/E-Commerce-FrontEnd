import { cn } from "@/lib/utils";
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const cartItems = [
    {
      _id: "1",
      name: "Nike Air Max 270",
      price: 129.99,
      quantity: 2,
      imageUrl: "/images/airmax270.jpg",
    },
    {
      _id: "2",
      name: "Apple Watch Series 9",
      price: 399.0,
      quantity: 1,
      imageUrl: "/images/applewatch.jpg",
    },
    // Add more dummy items for testing scroll
    {
      _id: "3",
      name: "Sony WH-1000XM5",
      price: 349.99,
      quantity: 1,
      imageUrl: "/images/headphones.jpg",
    },
    {
      _id: "4",
      name: "Samsung Galaxy Buds",
      price: 129.99,
      quantity: 2,
      imageUrl: "/images/buds.jpg",
    },
    {
      _id: "5",
      name: "Fitbit Charge 5",
      price: 149.99,
      quantity: 1,
      imageUrl: "/images/fitbit.jpg",
    },
    {
      _id: "6",
      name: "Logitech MX Master 3",
      price: 99.99,
      quantity: 1,
      imageUrl: "/images/mouse.jpg",
    },
    {
      _id: "7",
      name: "Kindle Paperwhite",
      price: 139.99,
      quantity: 1,
      imageUrl: "/images/kindle.jpg",
    },
    {
      _id: "8",
      name: "GoPro Hero 11",
      price: 499.0,
      quantity: 1,
      imageUrl: "/images/gopro.jpg",
    },
    {
      _id: "7",
      name: "Kindle Paperwhite",
      price: 139.99,
      quantity: 1,
      imageUrl: "/images/kindle.jpg",
    },
    {
      _id: "8",
      name: "GoPro Hero 11",
      price: 499.0,
      quantity: 1,
      imageUrl: "/images/gopro.jpg",
    },
  ];

  const user = false;

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Please sign in to proceed with checkout");
    } else {
      toast.success("ready for checking");
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
                        key={`${item._id}-${item.name}`}
                        className="flex gap-4 bg-white rounded-lg p-3 border border-gray-200 hover:shadow-lg transition"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button className="p-2 hover:bg-gray-100 rounded-full">
                                <FiMinus className="w-5 h-5" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button className="p-2 hover:bg-gray-100 rounded-full">
                                <FiPlus className="w-5 h-5" />
                              </button>
                            </div>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
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
                      $ 2190
                    </span>
                  </div>
                  {!user ? (
                    <>
                      <button
                        onClick={handleProceedToCheckout}
                        className="w-full bg-[#2B7A0B] text-white py-3 rounded-md hover:bg-[#236209] transition text-lg font-medium cursor-pointer"
                      >
                        Sign In & Checkout
                      </button>
                      <p className="text-center text-sm text-gray-500 mt-2 xl:mb-4">
                        Sign in for a faster checkout and to save your order
                        history
                      </p>
                    </>
                  ) : (
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full bg-[#2B7A0B] text-white py-3 rounded-md hover:bg-[#236209] transition text-lg font-medium xl:mb-4 cursor-pointer"
                    >
                      Proceed to Checkout
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
