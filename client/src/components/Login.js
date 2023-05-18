// import { lazy, Suspense } from 'react';
import foodBg from '../assests/foodBg.jpg'
import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";



// const LazyComponet = React.lazy(() => import('./Main'));


const Login = () => {

    return (
        <section className='w-screen h-screen relative overflow-hidden flex border-2'>
            <LazyLoadImage src={foodBg} alt='error' className='w-full h-full  absolute border-2 top-0 left-0 border-black' />

        </section>
    );
}

export default Login;
// /<img src={LazyImage} alt="Food Background" className='w-full h-full  absolute border-2 top-0 left-0 border-black' / > 
