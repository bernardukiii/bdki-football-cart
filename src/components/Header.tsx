import React from "react";

interface HeaderProps {
    cartTotal: number
}

const Header:React.FC<HeaderProps> = ({cartTotal}) => {
    return (
        <>
            <div className="bg-slate-200 font-bold text-lg sticky top-0 p-4 mb-4 w-full flex justify-between items-center">
                <h3>bdki's</h3>
                <h1>FOOTBALL SHOP</h1>
                <div className="flex justify-between items-center">
                    <img src="cart-g92a6a8563_640.png" alt="cart" height={40} width={40}></img>
                    <span className="p-2">{cartTotal}</span>
                </div>
            </div>
        </>
    )
}

export default Header;