import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FoodZone from "../assests/FoodZone.png";
import { isActiveStyles, isNotActiveStyles } from "../utils/nav";
import { motion } from "framer-motion";
import { btnClick, slideLeft, slideTop } from "../animations";
import { MdContactPage, MdLogout, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../assests/Avatar.png";
import { logout, toggleBurgerMenu } from "../store/user/authSlice";
import { clearUserData } from "../store/user/currUserSlice";
import { clearCartData, showCart } from "../store/cart/cartSlice";
import { APIURL } from "../utils/constants";
import { clearOrderData } from "../store/order/orderSlice";
import { FaHamburger } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { AiFillCloseCircle, AiTwotoneHome } from "react-icons/ai";
import { BsInfoSquareFill } from "react-icons/bs";
import { NavBarOverlay } from "../common/Overlay";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.currUser);
  const { toShowBurgerMenu } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(clearUserData());
    dispatch(clearCartData());
    dispatch(clearOrderData());

    navigate("/");
  };
  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <header className="fixed backdrop-blur-sm bg-gray-100 bg-opacity-80 z-40 inset-x-0 top-0 flex items-center justify-between px-6 xs:px-8 sm:px-12 md:px-20  pt-2 w-full border-[1px] border-b-gray-300 ">
      <NavLink to="/" className="flex items justify-center gap-4 ">
        <img src={FoodZone} className="w-[70px] h-[70px]" alt="FoodZone" />
        <p className="font-semibold text-xl hidden xs:block">Foodie.</p>
      </NavLink>

      {toShowBurgerMenu && <MobileNavBar />}
      <nav className="flex items-center  justify-center gap-6 lg:gap-8 ">
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-16 font-sans ">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/contact"}
          >
            Contact
          </NavLink>
        </nav>

        {userData?.role && localStorage.getItem("userToken") && (
          <motion.div
            {...btnClick}
            className="relative cursor-pointer "
            onClick={() => dispatch(showCart())}
          >
            <p>
              {" "}
              <MdShoppingCart className="text-[32px] text-textColor" />
            </p>
            <div className="w-[25px] h-[25px] rounded-full bg-red-500 flex items-center justify-center absolute -top-[18px] -right-2 ">
              <p className="text-primary text-base font-sans font-semibold ">
                {totalQuantity}
              </p>
            </div>
          </motion.div>
        )}

        {userData?.userName && localStorage.getItem("userToken") ? (
          <div
            className="relative cursor-pointer "
            // onMouseEnter={() => setIsMenu(true)}
            // onMouseLeave={() => setIsMenu(false)}
            onClick={toggleMenu}
          >
            <div className="w-14 h-14 rounded-full shadow-md cursor-pointer overflow-hidden bg-green-200 flex items-center justify-center border-[1px] border-orange-700">
              <motion.img
                className="w-full h-full object-cover"
                src={
                  userData?.image ? `${APIURL}/file/${userData.image}` : Avatar
                }
                whileHover={{ scale: 1.1 }}
                referrerPolicy="no-referrers"
              />
            </div>

            {isMenu && (
              <motion.div
                className="px-6 py-4 bg-gray-200 backdrop-blur-md rounded-md absolute top-13 -right-24 sm:right-0 flex flex-col gap-4 w-48  "
                {...slideTop}
              >
                {userData.role === "admin" && (
                  <Link
                    onClick={toggleMenu}
                    className="hover:text-red-500 text-xl text-textColor  "
                    to="/dashboard/home"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  onClick={toggleMenu}
                  className="hover:text-red-500 text-xl text-textColor "
                  to="/profile"
                >
                  My profile
                </Link>

                <Link
                  onClick={toggleMenu}
                  className="hover:text-red-500 text-xl text-textColor "
                  to="/order"
                >
                  Orders
                </Link>
                <hr className="border-green-500" />

                <motion.div
                  {...btnClick}
                  className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                  onClick={handleLogout}
                >
                  <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />

                  <p className="text-textColor text-xl group-hover:text-headingColor">
                    Logout
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <motion.button
              {...btnClick}
              className="px-6  font-semibold text-white tracking-wide py-[6px] rounded-md shadow-sm shadow-red-400 hover:bg-red-600 bg-red-500 active:bg-orange-500  border-red-300 cursor-pointer"
            >
              Login
            </motion.button>
          </NavLink>
        )}
        {!toShowBurgerMenu ? (
          <FaHamburger
            className="text-[40px] md:hidden text-orange-700 cursor-pointer sm:hover:text-orange-600 duration-200 "
            onClick={() => dispatch(toggleBurgerMenu())}
          />
        ) : (
          <AiFillCloseCircle
            className="text-[40px] md:hidden text-red-600 cursor-pointer sm:hover:text-orange-500 duration-200"
            onClick={() => dispatch(toggleBurgerMenu())}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;

export const MobileNavBar = () => {
  const dispatch = useDispatch();
  return (
    <NavBarOverlay>
      <motion.nav
        {...slideLeft}
        name="mobile-nav-bar"
        className=" flex-col flex  gap-8 lg:gap-16 font-sans  z-50 bg-white   py-8 h-fit w-[160px] rounded-bl-lg border border-gray-300 fixed top-20 right-0   "
      >
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={"/"}
        >
          <div
            onClick={() => dispatch(toggleBurgerMenu())}
            className="flex cursor-pointer gap-3 items-center"
          >
            <AiTwotoneHome className="text-3xl" />
            Home
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={"/menu"}
        >
          <div
            onClick={() => dispatch(toggleBurgerMenu())}
            className=" flex gap-2 items-center cursor-pointer"
          >
            <MdFoodBank className="text-[32px]" />
            Menu
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={"/contact"}
        >
          <div
            onClick={() => dispatch(toggleBurgerMenu())}
            className="flex gap-2 items-center cursor-pointer "
          >
            <MdContactPage className="text-3xl" />
            Contact
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={"/about"}
        >
          <div
            onClick={() => dispatch(toggleBurgerMenu())}
            className="flex items-center gap-2 cursor-pointer ml-[3px]"
          >
            <BsInfoSquareFill className="text-[22px]" />
            About
          </div>
        </NavLink>
      </motion.nav>
    </NavBarOverlay>
  );
};
