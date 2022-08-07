import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { BsBasket2Fill } from "react-icons/bs";
import { MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { async } from "@firebase/util";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  // console.log(cartItems)

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const handleShowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // console.log(user.email)
  return (
    <header className="fixed z-50 w-screen p-4 px-4 md:p-6 md:px-52 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-contain" alt="logo" />
          <p className="text-textColor text-xl font-semibold">City</p>
        </Link>

        <div className="flex items-center justify-around gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            
            <li
            
              className="text-textColor text-lg hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              <HashLink smooth to={'#home'}>Home</HashLink>
            </li>
            
            <li
              className="text-textColor text-lg hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
              href = "#menu"
            >
              <HashLink smooth to={'#menu'}>Menu</HashLink>
              
            </li>


            <li
              className="text-textColor text-lg hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              About us
            </li>
            <li
              className="text-textColor text-lg hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <div
            onClick={handleShowCart}
            className=" flex items-center justify-center relative"
          >
            <BsBasket2Fill className="text-textColor text-2xl  cursor-pointer" />
            {cartItems &&
              cartItems.length > 0 &&
                (
                  <div className=" absolute -top-2 -right-2  w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">{cartItems.length}</span>
                  </div>
                )}
          </div>

          <div>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-md object-contain cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />

            {isMenu && (
              <div className="w-44 absolute top-18 right-16 bg-slate-50 flex flex-col rounded-md shadow-xl  ">
                {user && user.email === "minhhereno2@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center justify-between text-base text-textColor cursor-pointer hover:bg-slate-200 rounded-md
                                        "
                      onClick={() => setIsMenu(false)}
                    >
                      New item <MdAdd className="inline" />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center justify-between text-base text-textColor cursor-pointer hover:bg-slate-200 rounded-md"
                  onClick={logout}
                >
                  Logout <MdLogout className="inline" />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*  mobile */}
      <div className="flex md:hidden w-full h-full justify-between items-center">
        <div
          className=" flex items-center justify-center relative"
          onClick={handleShowCart}
        >
          <BsBasket2Fill className="text-textColor text-2xl  cursor-pointer" />
          {cartItems &&
              cartItems.length > 0 &&
                (
                  <div className=" absolute -top-2 -right-2  w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">{cartItems.length}</span>
                  </div>
                )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-contain" alt="logo" />
          <p className="text-textColor text-xl font-semibold">City</p>
        </Link>

        <div>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] min-h-[40px] drop-shadow-md object-contain cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />

          {isMenu && (
            <div className="w-44 absolute top-20 right-0 bg-slate-50 flex flex-col rounded-md shadow-xl  ">
              {user && user.email === "minhhereno2@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center justify-between text-base text-textColor cursor-pointer hover:bg-slate-200 rounded-md">
                    New item <MdAdd className="inline" />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li
                  className="text-textColor text-base px-4 py-2 hover:text-slate-600 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-textColor text-base px-4 py-2 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-textColor text-base px-4 py-2 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => setIsMenu(false)}
                >
                  About us
                </li>
                <li
                  className="text-textColor text-base px-4 py-2 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="p-2 m-2 flex items-center justify-between text-base bg-gray-200 text-textColor cursor-pointer hover:bg-slate-300 rounded-md"
                onClick={logout}
              >
                Logout <MdLogout className="inline" />
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
