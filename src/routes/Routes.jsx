import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Explore, Profile, Login, Signup, Notfound } from "../pages";
import Mockman from "mockman-js";

function EndPoints() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export { EndPoints as Routes };
