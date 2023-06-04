import React from 'react';

const Overlay = ({ children }) => (
    <>
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black opacity-75 w-screen h-screen  backdrop-blur-[1px]"></div>

        {children}
    </>

);
export default Overlay;
