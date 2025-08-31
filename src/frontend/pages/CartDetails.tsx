/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import type { CartItem, CartReducerInitialState } from "../types/types";
import { toast } from "react-toastify";
import {
  addToCart,
  calculatePrice,
  discountApply,
  removeCartItem,
} from "@/redux/reducer/cartReducer";
import { server } from "@/redux/store";
import { FaTrash } from "react-icons/fa6";
import { transformImage } from "../components/utils/features";

const CartDetails = () => {
  const { cartItems, subtotal, total, shippingCharges, discount } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
  );

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

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

  useEffect(() => {
    if (!couponCode) {
      setIsValidCouponCode(false);
      dispatch(discountApply(0));
      dispatch(calculatePrice());
      return;
    }

    if (couponCode.length < 3) {
      setIsValidCouponCode(false);
      dispatch(discountApply(0));
      dispatch(calculatePrice());
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const res = await axios.get(
          `${server}/api/v1/coupon/apply-discount?code=${couponCode}`,
          { signal: controller.signal, withCredentials: true },
        );
        dispatch(discountApply(Number(res.data.data.amount) || 0));
        console.log(res.data.data);
        setIsValidCouponCode(true);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          dispatch(discountApply(0));
          setIsValidCouponCode(false);
        }
      } finally {
        dispatch(calculatePrice());
      }
    })();

    return () => controller.abort();
  }, [couponCode, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-slate-100 pb-10 xl:pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:mt-10">
          <main className="lg:col-span-2 rounded-sm bg-gray-50 shadow-sm">
            <header className="flex items-center justify-between  px-4 py-4 sm:px-6">
              <h1 className="text-xl font-semibold">Shopping Cart</h1>
              <span className="text-sm text-gray-900">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </span>
            </header>

            {cartItems.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto pr-2 px-4 py-3">
                <ul className="">
                  {cartItems.map((i) => (
                    <li
                      key={i.productId}
                      className="flex items-center gap-4 lg:gap-7 p-2 border-b border-gray-200"
                    >
                      <img
                        src={transformImage(i.photo)}
                        alt={i.name}
                        className="h-16 w-16 rounded-sm object-cover sm:h-15 sm:w-15 bg-muted"
                      />

                      <article className="min-w-0 flex-1">
                        <Link
                          to={`/product/${i.productId}`}
                          className="line-clamp-1 font-medium transition-colors hover:text-emerald-600"
                        >
                          {i.name}
                        </Link>
                        <span className="mt-1 block text-sm text-gray-600">
                          ${i.price}
                        </span>
                      </article>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrementHandler(i)}
                          aria-label="Decrease quantity"
                          className="h-8 w-8 rounded-sm border text-lg font-semibold hover:bg-gray-200 cursor-pointer"
                        >
                          -
                        </button>
                        <p className="w-8 text-center font-medium">
                          {i.quantity}
                        </p>
                        <button
                          onClick={() => incrementHandler(i)}
                          aria-label="Increase quantity"
                          className="h-8 w-8 rounded-sm border text-lg font-semibold hover:bg-gray-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeHandler(i.productId)}
                        aria-label="Remove item"
                        className="mr-3 text-destructive transition-colors hover:text-destructive/80 cursor-pointer"
                      >
                        <FaTrash className="h-6 w-6" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="px-6 py-16 text-center text-gray-600">
                <h2 className="text-lg font-medium">No Items Added</h2>
                <p className="mt-1 text-sm">
                  Browse products and add them to your cart.
                </p>
              </div>
            )}
          </main>

          <aside className="h-fit rounded-sm shadow-sm bg-gray-50 p-6 lg:sticky lg:top-36">
            <div className="space-y-3">
              <p className="flex items-center justify-between text-md">
                <span className="text-gray-800">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex items-center justify-between text-md">
                <span className="text-gray-800">Shipping Charges</span>
                <span className="font-medium text-yellow-800">
                  ${shippingCharges}
                </span>
              </p>
              <p className="flex items-center justify-between text-md">
                <span className="text-gray-800">Discount</span>
                <em className="font-medium not-italic text-emerald-600">
                  - ${discount}
                </em>
              </p>
              <div className="my-2 border-t" />
              <p className="flex items-center justify-between text-lg">
                <b className="font-semibold">Total</b>
                <b className="text-lg">${(Number(total) || 0).toFixed(2)}</b>
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full rounded-sm  bg-gray-200 px-4 py-3 border-none text-sm outline-none "
              />

              {couponCode &&
                (isValidCouponCode ? (
                  <span className="flex items-center gap-1 text-sm text-emerald-600 ml-2">
                    ${discount} off using the
                    <code className="rounded px-1.5 py-0.5 font-mono text-emerald-700">
                      "{couponCode}"
                    </code>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-destructive">
                    Invalid Coupon <VscError />
                  </span>
                ))}
            </div>

            {cartItems.length > 0 && (
              <Link
                to="/shipping"
                className="mt-5 block w-full rounded-sm bg-[#236027] hover:bg-[#2C742F] px-4 py-3 text-center  text-white transition-colors text-lg"
              >
                Proceed to Checkout
              </Link>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartDetails;
