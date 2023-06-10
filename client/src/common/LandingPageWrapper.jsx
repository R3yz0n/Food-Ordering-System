import React from 'react'

const LandingPageWrapper = ({ children }) => {
    return (
        <main className='w-ful flex flex-col items-start justify-center pt-32 px-6 md:px-24 2xl:px-96 gap-12 pb-16 '>

            {children}

        </main>


    )
}

export default LandingPageWrapper