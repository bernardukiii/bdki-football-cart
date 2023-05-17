import React from "react";
import { useState } from "react";

interface PlayerCardProps {
    playerName: string,
    playerPrice: number,
    playerLogo: string,
    handleCartAdd: any,
    handleCartRemove: any
    isInCart: boolean
}

const PlayerCard: React.FC<PlayerCardProps> = ({
    playerName, playerPrice, playerLogo, 
    handleCartAdd, isInCart, handleCartRemove}) => {

    const [hasError, setError] = useState(false)

    const handleImageError = () => {setError(true)}

    return (
        <>
            <div className="flex flex-col items-center items-center m-2 p-2 bg-slate-100 w-80 mh-80 border-4 border-green-950 rounded-xl">
                <h3 className="p-2 font-semibold text-xl">{playerName}</h3>
                { hasError ? 
                    <img src={'anony.jpeg'} onError={handleImageError} alt="notfound" className="bg-blue-400 m-2 h-40 w-40 rounded-full"></img>
                                        : 
                    <img src={playerLogo} onError={handleImageError} alt="playerphoto" className="bg-blue-400 m-2 mh-full mw-full rounded-full"></img> }
                <div className="w-full h-full flex justify-around items-center mt-4">
                    <span className="p-2 flex-1 flex justify-center font-semibold text-lg">${playerPrice}</span>
                    { isInCart ? '' : <button className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg p-2 flex-1" onClick={handleCartAdd}>Add to cart</button> }
                    { isInCart && (<button className="p-2 flex-1 flex justify-center" onClick={handleCartRemove} ><img src="delete.png" alt="trashcan" width={30} height={30}></img></button> )}
                </div>    
            </div>        
        </>
    )
}

export default PlayerCard;