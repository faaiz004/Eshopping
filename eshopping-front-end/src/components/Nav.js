import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import './Menu-Transition.css'
import { Link, useNavigate } from "react-router-dom";
export default function Nav() {
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false);
  function handleMenu() {
    setMenu((prevMenu) => !prevMenu);
  }
  function handleClick(e){
    e.preventDefault()
    navigate('/cart')
  }
  console.log(menu);
  return (
    <div className="">
      <nav className={menu ?"min-h-fit p-3 bg-white flex justify-between items-center px-8 lg:shadow-lg":"min-h-fit p-3 bg-white flex justify-between items-center px-8 shadow-lg lg:shadow-lg"}
      >
        <div className="mx-2 gap-4 text-lg hidden lg:flex">
          <button className="nav-text font-semibold hover:text-slate-500 transition-colors ease-in">
            Log In
          </button>
          <button className="nav-text font-semibold transition-colors ease-in hover:text-slate-500">
            Sign Up
          </button>
          <button className="nav-text font-semibold transition-colors ease-in hover:text-slate-500">
            Rate
          </button>
        </div>
        <header className="font-semibold text-2xl nav-text mr-36">ShopNest</header>
        <div >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-12 mx-4 nav-text cursor-pointer hover:text-slate-500 transition-colors ease-in hidden lg:block"
            onClick={handleClick}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-12 mx-4 nav-text cursor-pointer hover:text-slate-500 transition-colors ease-in lg:hidden"
            onClick={handleMenu}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>
      <CSSTransition
        in={menu}
        timeout={300}
        classNames="Menu-Transition"
        unmountOnExit
      >
        <div className="flex flex-col px-12 pb-4 text-lg gap-2 items-end lg:hidden shadow-lg fixed bg-white min-w-full z-50">
          <button className="nav-text font-semibold hover:text-slate-500 transition-colors ease-in">
            Log In
          </button>
          <button className="nav-text font-semibold transition-colors ease-in hover:text-slate-500">
            Sign Up
          </button>
          <button className="nav-text font-semibold transition-colors ease-in hover:text-slate-500">
            Rate
          </button>
          <button className="nav-text font-semibold transition-colors ease-in hover:text-slate-500" onClick={handleClick}>
            Shopping Cart
          </button>
        </div>
      </CSSTransition>
    </div>
  );
}
