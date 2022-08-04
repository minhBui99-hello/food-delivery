import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import Icecream from "../img/i1.png";
import { heroData } from "./utils/data";

function HomeContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full " id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center  gap-4">
        <div className="flex items-center justify-center px-2 py-1 gap-2 bg-orange-100 rounded-3xl   ">
          <p className=" text-base text-orange-500 font-bold ">Bike Delivery</p>
          <div className="w-8 h-8 rounded-full overflow-hidden ">
            <img
              alt="delivery"
              src={Delivery}
              className="w-full h-full bg-slate-50"
            />
          </div>
        </div>

        <p className=" text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wider">
          The Fastest Delivery in{" "}
          <span className="text-orange-500 text-[3rem] lg:text-[5rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center  md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo commodi
          tenetur repudiandae minima cum atque sapiente repellendus, ab
          praesentium mollitia molestiae natus alias reprehenderit maxime autem
          recusandae dignissimos enim? Dolor?
        </p>
        <button
          className=" bg-gradient-to-br from-orange-300 to bg-orange-500  md:w-auto w-full px-4 py-2  rounded-3xl
               hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="flex flex-1 py-2 items-center relative ">
        <img
          className="h-650 md:h-420 w-full lg:w-auto lg:h-685 ml-auto"
          src={HeroBg}
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((name, index) => (
              <div
                key={index}
                className=" lg:w-190 p-4 bg-cardOverlay shadow-xl backdrop-blur-md rounded-md flex flex-col items-center justify-center"
              >
                <img
                  className="w-20 -mt-10 lg:w-40 lg:-mt-20"
                  src={name.imageSrc}
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {name.name}
                </p>
                <p className="text-[12px] lg:text-base  ">{name.decp}</p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {name.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
