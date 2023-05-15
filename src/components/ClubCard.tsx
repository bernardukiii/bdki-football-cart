import React from "react";

export default function ClubCard() {

    return (
        <>
            <div className="flex flex-col items-center items-center m-2 p-2 bg-red-400 w-60 h-60">
                <h3 className="p-2">CLUB NAME</h3>
                <img src="" alt="clublogo" className="bg-blue-400 m-2 h-full w-full"></img>
                <div className="w-full h-full flex justify-around items-center">
                    <span>$0</span>
                    <button className="border border-black p-2">Add to cart</button>
                </div>    
            </div>        
        
        </>
    )
}