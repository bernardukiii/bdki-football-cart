import React from "react";

interface PlayerCardProps {
    playerName: string,
    playerPrice: number,
    playerLogo: string
}

const PlayerCard: React.FC<PlayerCardProps> = ({playerName, playerPrice, playerLogo}) => {
    // Add to cart function must be added here
    return (
        <>
            <div className="flex flex-col items-center items-center m-2 p-2 bg-red-400 mw-80 mh-80">
                <h3 className="p-2">{playerName}</h3>
                <img src={playerLogo} alt="clublogo" className="bg-blue-400 m-2 mh-full mw-full radius-50"></img>
                <div className="w-full h-full flex justify-around items-center">
                    <span className="p-4">${playerPrice}</span>
                    <button className="border border-black p-2">Add to cart</button>
                </div>    
            </div>        
        </>
    )
}

export default PlayerCard;