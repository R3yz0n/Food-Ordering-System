
export const fadeInOut = {
    initial: { opacity: 0, x: 40, transition: { duration: 0.5 } },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }

}

export const btnClick = {
    // whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }

}

export const slideTop = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
}

export const pop = {
    initial: { opacity: 0, y: 30, transition: { duration: 0.5 } },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.5 } },
};
