import React from "react";
import HeroImage from "../assets/homepage.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="grow flex flex-col md:flex-row-reverse items-center justify-center w-5/6 mx-auto">
      <img
        className="w-full md:w-7/12"
        src={HeroImage}
        alt="girl looking at her phone"
      />
      <div className="text-2xl flex flex-col items-center md:items-start">
        <h1 className="text-8xl text-paragraphLight font-semibold ">Tether</h1>
        <p className="text-paragraphLight px-3 text-center">
          Start tethering with your dear ones
        </p>
        <Link to="/explore">
          <button className="w-full bg-paragraphLight text-primary px-3 py-2 my-2 mx-3 rounded hover:font-bold hover:shadow hover:shadow-indigo-500/80">
            Explore
          </button>
        </Link>
      </div>
    </main>
  );
}

export { Home };
