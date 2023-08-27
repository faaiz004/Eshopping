import React, { useEffect, useState } from "react";
import img from "../images/hangers.jpg";
import underConstruct from "../images/under-construction.jpg";
import star from "../images/star.png";
import empty from "../images/empty.jpg";
import Nav from "./Nav";
import Footer from "./Footer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./sort-drop-down.css";
import "./filter.css";

export default function Main(props) {
  const [items, setItems] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [sort, setSort] = useState(false);
  function handleSort() {
    setSort((prevSort) => !prevSort);
  }
  const [appliedFilters, setAppliedFilters] = useState({
    company: "",
    name: "",
    limit: 10,
    featured: false,
    selectedFruits: "",
  });
  const [filterOnClick, setFilterOnClick] = useState(false);

  function handleSetFilters() {
    setFilterOnClick((prevfilter) => !prevfilter);
  }
  function handleChange(event) {
    setSort(false);
    setAppliedFilters((prevAppliedFilters) => {
      const { name, value, checked, type } = event.target;
      console.log(type);
      return {
        ...prevAppliedFilters,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function handleKeyDown(e) {
    if (e.key == "Enter") {
      let query = "";
      if (appliedFilters.name) {
        query += "name=" + appliedFilters.name;
      }
      let link = `http://localhost:3000/api/v1/products?${query}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          setItems(data.products);
          // Set data to your state or do whatever you need
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }
  function handleSubmit() {
    let query = "";
    if (appliedFilters.company) {
      query += "company=" + appliedFilters.company;
    }
    if (appliedFilters.name) {
      if (query) {
        query += "&name=" + encodeURIComponent(appliedFilters.name);
      } else {
        query += "name=" + encodeURIComponent(appliedFilters.name);
      }
    }
    if (appliedFilters.featured == true) {
      if (query) {
        query += "&featured=" + encodeURIComponent(appliedFilters.featured);
      } else {
        query += "featured=" + encodeURIComponent(appliedFilters.featured);
      }
    }
    if (appliedFilters.limit) {
      if (query) {
        query += "&limit=" + appliedFilters.limit;
      } else {
        query += "&limit=" + appliedFilters.limit;
      }
    }
    if (appliedFilters.selectedFruits) {
      console.log(appliedFilters.selectedFruits);
      if (query) {
        query += "&sort=" + appliedFilters.selectedFruits;
      } else {
        query += "sort=" + appliedFilters.selectedFruits;
      }
    }
    let link = `http://localhost:3000/api/v1/products?${query}`;
    console.log(link);
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.products);
        // Set data to your state or do whatever you need
      })
      .catch((error) => console.error("Error fetching products:", error));
    setFilterOnClick(false);
  }
  console.log(appliedFilters);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data.products);
        // Set data to your state or do whatever you need
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  function handleShoppingCart(item){
    props.setShoppingCart(prevCart =>{
      return [...prevCart,item]
    })
    alert(`Shopping Cart has ${props.shoppingCart.length + 1} item or items`)
  }
  let cards;
  if (items) {
    cards = items.map((item) => {
      console.log(item.imageUrl);
      return (
        <div>
          
          <div className="flex flex-col items-start text-sm mb-4 lg:text-lg gap-4  nav-text lg:mb-8 font-semibold">
            <div className="flex flex-col bg-gray-100 rounded-md pb-4 w-40 lg:w-48 xl:w-56 relative items-start">
              <img
                src={item.imageUrl ? item.imageUrl : underConstruct}
                className="w-full h-32 lg:h-48 rounded-t-md mb-2 relative"
              />
              <span className="ml-2">name: {item.name}</span>
              <span className="ml-2">company: {item.company}</span>
              <span className="ml-2">price: ${item.price}</span>
              <span className="ml-2">rating: {item.rating}</span>
              {item.featured ? (
                <img src={star} className="w-6 h-6 top-2 left-2 absolute" />
              ) : (
                ""
              )}
              <button className=" px-2 bg-white rounded-sm absolute z-10 bottom-4 right-4 hover:bg-gray-300 transition ease-linear" onClick={()=>handleShoppingCart(item)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <main className="relative">
      <Nav/>
      <div className="mt-16 flex items-center gap-8 justify-evenly shadow-md pb-16">
        <img
          src={img}
          alt="this is a img"
          className="rounded-lg shadow-lg ml-16  w-5/12 lg:w-4/12"
        />
        <h1 className="font-semibold nav-text text-2xl mr-16 lg:text-3xl">
          Shop from the Comfort of Your Nest
        </h1>
      </div>
      <div className="bg-gray-100 shadow-lg pb-16">
        <div className=" flex mx-16 justify-between lg:mx-32 xl:mx-64 pt-8 mt-1">
          <div>
            <button
              className="font-semibold text-2xl nav-text
            bg-gray-200 rounded-lg px-6 py-2 cursor-pointer hover:bg-white transition ease-linear"
              onClick={handleSetFilters}
            >
              Filters
            </button>
          </div>
          <div className="flex flex-row mx-16 items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-12 h-8 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="enter name of product..."
              className="w-72 lg:w-96 h-10 pl-4 lg:h-10 border rounded-md font-semibold py-2 shadow-sm focus:outline-none focus:ring-2 transition ease-in focus:ring-gray-300 focus:border-transparent text-gray-800"
              value={appliedFilters.name}
              name="name"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {items.length > 0 ? (
          <div
            className={
              items.length < 3
                ? "flex justify-center items-start mx-16 lg:mx-60 mt-16 gap-16 shadow-md p-4 sh-t rounded-md g-white"
                : "grid grid-cols-3 gap-8 mx-16 lg:mx-60 mt-16 2xl:grid-cols-4 shadow-md p-4 sh-t rounded-md bg-white pl-4"
            }
          >
            {cards}
          </div>
        ) : (
          <div className="flex justify-center items-start mx-16 lg:mx-60 mt-16 mb-16">
            <img src={empty} />
          </div>
        )}
      </div>
      <CSSTransition
        in={filterOnClick}
        timeout={300}
        classNames="filter"
        unmountOnExit
      >
        <div className="bg-white absolute top-48 text-black flex flex-col items-center justify-around w-3/5  lg:w-2/5  rounded-xl shadow-lg left-pos lg:left-1/3 gap-2 pt-2 font-semibold">
          <span className="text-2xl text-light mb-2">Filters</span>
          <div className="w-3/5 lg:w-4/5 mb-2">
            <span className="text-light  mr-8">Name: </span>
            <input
              type="text"
              className="border rounded-md px-2 shadow-md focus:outline-none focus:ring-2 transition ease-in focus:ring-gray-300 text-gray-700 w-4/5 lg:w-3/5"
              name="name"
              onChange={handleChange}
              value={appliedFilters.name}
            />
          </div>
          <div className="w-3/5 lg:w-4/5 mb-2">
            <span className="text-light  mr-2">Company: </span>
            <input
              type="text"
              className="border rounded-md px-2 shadow-md focus:outline-none focus:ring-2 transition ease-in focus:ring-gray-300 text-gray-700 w-4/5 lg:w-3/5"
              name="company"
              value={appliedFilters.company}
              onChange={handleChange}
            />
          </div>
          <div className="w-3/5 lg:w-4/5 mb-2 flex items-center justify-evenly">
            <span className="text-light mr-8">
              limit:{appliedFilters.limit}
            </span>
            <input
              type="range"
              className="w-32 lg:w-64"
              name="limit"
              value={appliedFilters.limit}
              onChange={handleChange}
              min="1"
              max="50"
            />
          </div>
          <div className="w-3/5 lg:w-4/5 mb-2 flex flex-col items-center justify-center">
            <span className="text-md  mr-8 flex items-center gap-1">
              Sort
              {!sort ? (
                <CSSTransition
                  in={!sort}
                  timeout={300}
                  classNames="filter"
                  unmountOnExit
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-700 cursor-pointer"
                    onClick={handleSort}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </CSSTransition>
              ) : (
                <CSSTransition
                  in={sort}
                  timeout={300}
                  classNames="filter"
                  unmountOnExit
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-700 cursor-pointer"
                    onClick={handleSort}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </CSSTransition>
              )}
            </span>
            <CSSTransition
              in={sort}
              timeout={300}
              classNames="sort-drop-down"
              unmountOnExit
            >
              <select
                multiple
                value={appliedFilters.selectedFruits}
                onChange={handleChange}
                name="selectedFruits"
                className="mr-4 rounded-lg  focus:border-blue-800 shadow-lg overflow-hidden cursor-pointer focus:outline-none border-2 transition ease-in "
              >
                <option
                  value="price"
                  className="font-semibold text-center hover:bg-gray-200 transition ease-linear"
                >
                  price ascending
                </option>
                <option
                  value="name"
                  className="font-semibold text-center hover:bg-gray-200 transition ease-linear"
                >
                  name ascending
                </option>
                <option
                  value="-price"
                  className="font-semibold text-center hover:bg-gray-200 transition ease-linear"
                >
                  price descending
                </option>
                <option
                  value="-name"
                  className="font-semibold text-center  hover:bg-gray-200 transition ease-linear"
                >
                  name descending
                </option>
              </select>
            </CSSTransition>
          </div>
          <div className="w-3/5 lg:w-4/5 mb-2 flex items-center justify-evenly">
            <span className="text-light mr-2">Featured: </span>
            <input
              type="checkbox"
              className="w-16"
              name="featured"
              onChange={handleChange}
              checked={appliedFilters.featured}
            />
          </div>
          <button
            className="mb-4 px-2 py-1 rounded-sm font-semibold hover:bg-gray-400 bg-gray-300 transition ease-linear"
            onClick={handleSubmit}
          >
            Apply
          </button>
        </div>
      </CSSTransition>
      <Footer/>
    </main>
  );
}
