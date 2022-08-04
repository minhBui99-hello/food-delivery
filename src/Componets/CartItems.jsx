import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons//bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
let items = [];

const CartItems = ({ item, flag, setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const [qty, setQty] = useState(1);

  // console.log(cartItems, items);
  const dispatchItems = (item) => {
    localStorage.setItem("cartItems", JSON.stringify(items));

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const handleCartItems = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag+1)
        }
      });
      dispatchItems()
    }
    if(action === "remove") {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag+1) 
        dispatchItems();
      } 
      else{
      setQty(qty - 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty -= 1;
          setFlag(flag+1)
        }
      });
      dispatchItems()
      }
    }
  };
  useEffect(() => {
    items = cartItems
  
  }, [qty, items])
  

  return (
    <div className="flex items-center justify-between my-2 px-3 p-2 bg-cartItem">
      <div className="w-full rounded-lg bg-cartItem flex items-center gap-2">
        <img className="w-20" src={item.imageURL} />

        <div>
          <p className=" text-white">{item.title}</p>
          <p className=" text-white"> $ {item.price * item.qty} </p>
          <p className=" text-white">total: {item.qty}</p>          
        </div>
      </div>
      <div className="flex items-center justify-between text-white gap-3">
        <motion.button
          whileTap={{ scale: 0.8 }}
          className=" cursor-pointer text-xl"
          onClick={() => handleCartItems("remove", item.id)}
        >
          <BiMinus />{" "}
        </motion.button>
        <p></p>
        <motion.button
          whileTap={{ scale: 0.8 }}
          className=" cursor-pointer text-xl"
          onClick={() => handleCartItems("add", item.id)}
        >
          <BiPlus />
        </motion.button>
      </div>
    </div>
  );
};

export default CartItems;
