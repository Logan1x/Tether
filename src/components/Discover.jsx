import React from "react";

function Discover() {
  return (
    <div className="flex-none px-2 py-2 my-2  bg-primaryDark">
      <p className="text-center py-2">Discover</p>
      <div className="flex justify-around">
        <div className="flex flex-col justify-center items-center mx-auto px-1 py-2 border-2 border-primary min-w-20 overflow-hidden max-w-24 rounded">
          <div className="w-1/8 mx-2">
            <img
              className="w-20 object-cover rounded-full"
              src="https://picsum.photos/200"
              alt=""
            />
          </div>
          <div className="flex flex-col w-7/8 ">
            <h1>Khushal Sharma</h1>
            <p className="text-xs">Engineer at netflix</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto px-1 py-2 border-2 border-primary min-w-20 overflow-hidden max-w-24 rounded">
          <div className="w-1/8 mx-2">
            <img
              className="w-20 rounded-full"
              src="https://picsum.photos/200"
              alt=""
            />
          </div>
          <div className="flex flex-col w-7/8 ">
            <h1>Vishal Sharma</h1>
            <p className="text-xs">Engineer at netflix</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto px-1 py-2 border-2 border-primary min-w-20 overflow-hidden max-w-24 rounded">
          <div className="w-1/8 mx-2">
            <img
              className="w-20 rounded-full"
              src="https://picsum.photos/200"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center w-7/8 ">
            <h1>Abhishek Sharma</h1>
            <p className="text-xs">Engineer at netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Discover };
