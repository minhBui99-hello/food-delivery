import React from 'react'
import HomeContainer from './HomeContainer'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { motion } from "framer-motion"
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
import { useEffect } from 'react'
import { useState } from 'react'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'






function MainContainer() {
   const [{ foodItems, cartShow }, dispatch] = useStateValue()

   const [scrollvalue, setscrollValue] = useState(0)

   const slide = (value) => {
      setscrollValue(value)
   }

   useEffect(() => {
   }, [scrollvalue, cartShow])


   return (
      <div className=" w-full h-auto flex flex-col justify-center items-center">
         <HomeContainer />
         <section className='w-full my-12'>

            <div className="w-full flex justify-between">
               <p className="text-2xl relative font-semibold before:absolute before:content before:w-32 before:h-1 before:left-0 
               before:-bottom-0 before:bg-gradient-to-tr from-orange-400 to-orange-600">
                  Our fresh & healthy fruits
               </p>
               <div className="hidden md:flex items-center gap-2">
                  <motion.div
                     onClick={() => setscrollValue(-800)}
                     whileTap={{ scale: 0.9 }}
                     className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer flex items-center justify-center">
                     <FiChevronLeft />
                  </motion.div>
                  <motion.div
                     onClick={() => setscrollValue(800)}
                     whileTap={{ scale: 0.9 }}
                     className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer flex items-center justify-center">
                     <FiChevronRight />
                  </motion.div>
               </div>
            </div>

            <RowContainer
               scrollvalue={scrollvalue}
               flag={true}
               data={foodItems?.filter(item => item.category === "fruits")}
            />

         </section>
         <MenuContainer />
         {cartShow && (<CartContainer />)}


      </div>

   )
}

export default MainContainer