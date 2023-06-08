import React from 'react';

const Overlay = ({ children, onClick }) => (
    <>
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black opacity-80  w-screen h-screen " onClick={onClick}></div>

        {children}
    </>

);
export default Overlay;
