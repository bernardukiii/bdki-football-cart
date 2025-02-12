import React from "react";
// 'Props' need to be declared with an interface to use them in functional components
interface HeaderProps {
    cartTotal: number
}

const Header:React.FC<HeaderProps> = ({cartTotal}) => {
    return (
        <>
            <div className="bg-green-900 border-b-8 border-green-950 text-white font-bold text-lg sticky top-0 p-4 mb-4 w-full flex justify-around items-center">
                <h3 className="flex-grow-1">bdki&apos;s</h3>
                <h1 className="flex-grow-2">FOOTBALL</h1>
                <div className="flex-grow-1 flex justify-between items-center">
                    <img src="icons8-cart-64.png" alt="cart" width={40} height={40}></img>
                    <span className="p-2 w-1">${cartTotal}</span>
                </div>
            </div>
        </>
    )
}

export default Header;