import React, { useState } from "react";
import EmptyCart from "../img/emptyCart.svg";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartItems from "./CartItems";
import { useEffect } from "react";

function CartContainer() {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [tot, setTot] = useState();
  const [flag, setFlag] = useState(1);


  useEffect(() => {
    let sumWithInitial = cartItems.reduce(
      (previousValue, item) => previousValue + item.price * item.qty,
      0
    );
    setTot(sumWithInitial)
    console.log(tot)
  },[tot, flag]);

  const handleUnshowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
    setTot(0)

    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="flex items-center justify-between py-6 px-4">
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          onClick={handleUnshowCart}
        >
          <MdKeyboardBackspace className="text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-xl text-textColor font-semibold">Cart</p>
        <div 
        onClick={clearCart}
        className="flex items-center gap-2 bg-slate-200 px-2 cursor-pointer">
          <p className="text-base text-textColor">Clear</p>
          <RiRefreshFill />
        </div>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full rounded-t-3xl bg-cartBg flex flex-col">
          <div className="w-full h-56 md:h-420 px-4 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cartItem */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => 
              <CartItems 
              key={item.id} 
              item={item}
              flag = {flag}
              setFlag = {setFlag}
              />)}
          </div>
          {/* cartBottom */}
          <div className="w-full  flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col justify-evenly items-center px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;
