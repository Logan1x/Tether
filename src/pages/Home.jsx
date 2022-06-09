import React from "react";
import HeroImage from "../assets/homepage1.png";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Home() {
  return (
    <main className="grow flex flex-col md:flex-row-reverse items-center justify-center w-5/6 mx-auto">
      <img
        className="w-full md:w-7/12"
        src={HeroImage}
        alt="girl looking at her book"
      />
      <div className="text-2xl flex flex-col items-center md:items-start">
        <h1 className="text-8xl text-paragraphLight font-semibold ">Tether</h1>
        <p className="text-paragraphLight px-3 text-center">
          Start tethering with your dear ones
        </p>
        <Link to="/explore">
          <button className="w-full flex items-center justify-center border-2 border-paragraphLight hover:bg-paragraphLight text-secondary hover:text-primary px-3 py-2 my-2 mx-3 rounded hover:shadow hover:shadow-indigo-500/80">
            Explore <MdOutlineKeyboardArrowRight />
          </button>
        </Link>
      </div>
    </main>
  );
}

export { Home };
