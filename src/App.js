import React, { useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Header, HomeContainer, MenuContainer } from "./Componets";
import MainContainer from "./Componets/MainContainer";
import CreateConainer from "./Componets/CreateConainer";
import { motion, AnimatePresence } from "framer-motion";
import { getAllFoodItems } from "./Componets/utils/firebaseFunction";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { HashLink } from "react-router-hash-link";
import {} from "react-router-dom";

const App = () => {
  const [{}, dispactch] = useStateValue();

  const FetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispactch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-52 py-6  w-full ">
          <Routes>

              <Route exact path="/*" element={<MainContainer />} />
              <Route path="/createItem" element={<CreateConainer />} />
              <Route exact path="/menu" element={<MenuContainer />} />
              <Route exact path="/home" element={<HomeContainer />} />


          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
