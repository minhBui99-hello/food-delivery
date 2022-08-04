import React, { useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { categories } from './utils/data'
import {motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

function MenuContainer() {

    const [filter, setFilter] = useState('chicken')
    const [{foodItems}, dispatch] = useStateValue()

    return (
        <section className="w-full my-6" id="menu">
            <div className='flex items-center justify-center'>
                <p className="text-2xl relative font-semibold before:absolute before:content before:w-32 before:h-1 before:left-0 
                    before:-bottom-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 mr-auto">
                    Our hot dishes
                </p>
            </div>
            <div className='w-full flex items-center justify-start lg:justify-center overflow-x-scroll scrollbar-none py-6 gap-8'>
                {categories && categories.map(category => (
                    <motion.div
                        whileTap = {{scale:0.75}}
                        key={category.id}
                        className={`group flex justify-center ${filter === category.urlParamName ? 'bg-red-500' : 'bg-card'
                            } hover:bg-red-500 items-center w-24 min-w-[94px] h-28 rounded-xl gap-3 flex-col ease-in-out duration-100 transition-all drop-shadow-lg cursor-pointer `}
                        onClick={() => setFilter(category.urlParamName)}
                    >
                        <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-card' : 'bg-red-500'
                            }  group-hover:bg-card flex items-center justify-center`} >
                            <IoFastFood className={`text-xl ${filter === category.urlParamName ? 'text-gray-600' : 'text-white'} group-hover:text-gray-600`} />
                        </div>
                        <p className={`text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor'
                            } group-hover:text-card`}>{category.name}</p>

                    </motion.div>
                ))}
            </div>
            <RowContainer
               flag={false}
               data={foodItems?.filter(item => item.category === filter)}
            />
        </section>
    )
}

export default MenuContainer