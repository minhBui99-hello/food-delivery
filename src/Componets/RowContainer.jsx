import React, { useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollvalue }) => {
  const [{ user, cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItems ?? [])

  // if (cartItems.length > 0) {
  //   setItems(cartItems);
  // }


  const addCartItems = () => {
    // console.log(items,cartItems);

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addCartItems();
  }, [items]);

  const rowContainer = useRef();
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollvalue;
  }, [scrollvalue]);

  return (
    <div
      ref={rowContainer}
      className={` scroll-smooth flex gap-3 w-full my-12   ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center gap-6"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay my-12 
                    rounded-lg backdrop-blur-lg shadow-md p-3 hover:shadow-2xl flex flex-col transition-all duration-100 ease-in-out"
          >
            <div className=" flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="flex justify-end flex-col items-end gap-1">
              <p className="text-base font-medium md:text-lg ">{item.title}</p>
              <p className="text-slate-500 text-sm">{item.calories} Calories</p>
              <div className="flex items-center">
                <p className="font-semibold">
                  <span className="text-red-600 text-sm">$</span> {item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
