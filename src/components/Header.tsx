import React from "react";
import CartLogo from "../../public/shopping-cart-svgrepo-com.svg";
 

export default function Header() {
    return (
        <>
            <div className="bg-slate-200 fixed top-0 p-4 mb-4 w-full flex justify-between items-center">
                <h3>Shop</h3>
                <h1>FOOTBALL SHOP</h1>
                <div className="flex justify-between items-center">
                    <CartLogo />
                    <span className="p-2">0</span>
                </div>
            </div>
        </>
    )
}