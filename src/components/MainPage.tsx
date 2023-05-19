import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import useFetchAPI from '../app/useFetch_API';
import Header from "./Header";
import ConfirmationPopUp from "./WarningPopUp";

export default function MainPage() {
  const { data, loading } = useFetchAPI(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=80&APIkey=5236ed59d8bee807fe40271e4c712d271677c89bd7609a53dad5de9f5de09686`)  
  const [cartTotal, setCartTotal] = useState(0)
  const [cartStatus, setCartStatus] = useState<{ [key: string]: boolean }>({});
  const [warning, setWarning] = useState(false)
  const [userInput, setUserInput] = useState("")

  const handleCartAdd = (playerName: string, playerPrice: any) => {
    const price = parseInt(playerPrice)
    
    if (cartTotal <= 100 && cartTotal + price <= 100) {
      setCartTotal((prevTotal) => prevTotal + price);
      setCartStatus((prevStatus) => ({ ...prevStatus, [playerName]: true }));
    } else {
      setWarning(true)
    }
  };

  const handleCartRemove = (playerName: string, playerPrice: any) => {
    const price = parseInt(playerPrice)
    
    if (cartTotal > 0 && cartTotal - price >= 0) {
      setCartTotal((prevTotal) => prevTotal - price);
      setCartStatus((prevStatus) => ({ ...prevStatus, [playerName]: false }));
    } else if (cartTotal - price < 0) {
      setCartTotal(0)
    }
  };

  const handleCloseWarning = () => {
    setWarning(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("this is " + e.target.value)
    setUserInput(e.target.value)
  }

  return (
    <>
      <Header cartTotal={cartTotal} />

     { warning ? <ConfirmationPopUp handleClose={handleCloseWarning}/> : null }

      <div className="h-full w-full flex flex-col items-center">
        <div className="bg-green-800 border-y-8 border-green-950 w-full flex justify-center items-center">
          <div className="bg-green-950 border-8 border-green-700 w-60 h-70 flex flex-col justify-center items-center text-white font-semibold p-2 rounded-2xl my-4">
            <h1 className="p-2 m-2 text-lg text-xl">{data?.result[0]?.team_name}</h1>
            <img src={data?.result[0]?.team_logo}></img>
            {loading && <p>Retrieving data...</p>}
          </div>
        </div>
        {/* Grid + searchbar */}
        <div>
          {/* Search function */}
          <div className="p-2 m-2">
              <span className="p-2 font-semibold text-lg">Search:</span>
              <input className="border border-4 border-green-900 p-2" type="text" value={userInput} placeholder="Messi" onChange={handleSearch} ></input>
          </div>
        
           <div className="py-4 grid gap-4 md:grid-cols-4 grid-rows-4">
              {data?.result[0]?.players
                .filter((player: any) => {
                  if (userInput == '') {
                    return true
                  } else if (player.player_name.toLowerCase().includes(userInput.toLowerCase())) {
                    console.log(userInput)

                    return player
                  }
                  }
                )
                .map((player: any) => (
                <PlayerCard
                  key={player.player_key}
                  playerName={player.player_name}
                  playerLogo={player.player_image}
                  playerPrice={player.player_age}
                  handleCartAdd={() => handleCartAdd(player.player_name, player.player_age)}
                  handleCartRemove={() => handleCartRemove(player.player_name, player.player_age)}
                  isInCart={cartStatus[player.player_name] || false}
                />
                ))}
              </div>
        </div>
      </div>
    </>
  )
}
