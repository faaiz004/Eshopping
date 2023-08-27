import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import underConstruction from "../images/under-construction.jpg";
export default function Shoppingcart(props) {
    function handleCheckout(){
        let price = 0 
        props.shoppingCart.map(item =>{
            price += item.price*(parseInt(item.selected))
        })
        alert(`Your total bill is ${price}`)
    }
    useEffect(()=>{
        props.setShoppingCart(prevCart =>{
            return(
                prevCart.map(item =>{
                    return(
                        {...item,selected:1}
                    )
                })
            )
        })
    },[])
    function handleAdd(id){
        props.setShoppingCart(prevCart =>{
            return(
                prevCart.map(item =>{
                    if(item._id === id){
                        const temp = item.selected + 1
                        return {...item,selected:temp}
                    }else{
                        return item
                    }
                })
            )
        })
    }
    function handleSub(id){
        props.setShoppingCart(prevCart =>{
            return(
                prevCart.map(item =>{
                    if(item._id === id && item.selected > 0){
                        const temp = item.selected - 1
                        return {...item,selected:temp}
                    }else{
                        return item
                    }
                })
            )
        })
    }
  console.log(props.shoppingCart);
  const items = props.shoppingCart.map((item, index) => {
    return (
      <div
        className={
          index % 2 == 0
            ? "flex justify-between items-center shadow-md"
            : "flex justify-between items-center shadow-md bg-gray-100 "
        }
      >
        <div className="w-36 flex flex-col items-start font-semibold justify-start ml-4">
          <span>{item.name}</span>
          <span>{item.rating}</span>
          <span>${item.price}</span>
        </div>
        <div className="mr-8">
          <span className="border-2 border-black px-2 text-xl pb-1 cursor-pointer" onClick={() => handleAdd(item._id)}>+</span>
          <span className="px-1 font-semibold">{item.selected? item.selected:0}</span>
          <span className="border-2 border-black px-2.5 text-xl pb-1 cursor-pointer" onClick={() => handleSub(item._id)}>-</span>
        </div>
      </div>
    );
  });
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return props.shoppingCart.length == 0 ? (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-64 h-64 nav-text"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <span className="text-6xl font-semibold nav-text">Is Empty</span>
      <button
        className="mt-12 text-xl font-semibold nav-text px-2 py-1 bg-gray-200 rounded-md hover:scale-110 transition ease-linear"
        onClick={handleClick}
      >
        Continue Shopping
      </button>
    </div>
  ) : (
    <div className="min-h-screen w-min-screen flex justify-center bg-gray-200 items-center">
      <div className=" h-96 w-3/5 bg-white lg:w-2/6 h rouned-lg shadow-lg relative">
        <div className="font-semibold shadow-md ">Order Summary</div>
        {items ? items : ""}
        <div className="flex justify-center w-full mr-2">
          <button className="bg-black px-12 py-2 absolute bottom-2  text-white font-semibold text-xl rounded-md hover:text-gray-300 transition ease-in" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
