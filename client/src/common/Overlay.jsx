import React, { useEffect } from "react";

const Overlay = ({ children, onClick }) => {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 bg-black opacity-80  w-screen h-screen "
        onClick={onClick}
      ></div>

      {children}
    </>
  );
};
export default Overlay;

export const CartOverlay = ({ children, onClick }) => {
  useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";

    return () => {
      document.querySelector("html").style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 bg-black opacity-40  w-screen h-screen "
        onClick={onClick}
      ></div>

      {children}
    </>
  );
};

export const NavBarOverlay = ({ children, onClick }) => {
  useEffect(() => {
    document.querySelector("html").style.overflow = "hidden";

    return () => {
      document.querySelector("html").style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 top-20 -left-[1px]  flex items-center justify-center z-40 bg-black opacity-70  w-screen h-screen "
        onClick={onClick}
      ></div>

      {children}
    </>
  );
};
