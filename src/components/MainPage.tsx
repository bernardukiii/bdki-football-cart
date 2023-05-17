import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import useFetchAPI from '../app/useFetch_API';
import Header from "./Header";
import ConfirmationPopUp from "./WarningPopUp";

export default function MainPage() {
  const { data, loading } = useFetchAPI(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=80&APIkey=5236ed59d8bee807fe40271e4c712d271677c89bd7609a53dad5de9f5de09686`)  
  const [cartTotal, setCartTotal] = useState(0);
  const [cartStatus, setCartStatus] = useState<{ [key: string]: boolean }>({});
  const [warning, setWarning] = useState(false)

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
    
    if (cartTotal <= 100 && cartTotal + price <= 100) {
      setCartTotal((prevTotal) => prevTotal - price);
      setCartStatus((prevStatus) => ({ ...prevStatus, [playerName]: false }));
    } else {
      return
    }
  };

  const handleCloseWarning = () => {
    setWarning(false)
  }

  return (
    <>
      <Header cartTotal={cartTotal} />

     { warning ? <ConfirmationPopUp handleClose={handleCloseWarning}/> : null }

      <div className="h-full w-full flex flex-col items-center">
        <h1 className="p-2 m-2 text-lg">{data?.result[0]?.team_name || 'Oops, an error occurred!'}</h1>

        {loading && <p>Loading...</p>}

        <div className="grid gap-4 md:grid-cols-4 grid-rows-4">
          {data?.result[0]?.players.map((player: any) => (
            <PlayerCard
              key={player.player_key}
              playerName={player.player_name}
              playerLogo={player.player_image}
              playerPrice={player.player_number}
              handleCartAdd={() => handleCartAdd(player.player_name, player.player_number)}
              handleCartRemove={() => handleCartRemove(player.player_name, player.player_number)}
              isInCart={cartStatus[player.player_name] || false}
            />
          ))}
        </div>
      </div>
    </>
  )
}
