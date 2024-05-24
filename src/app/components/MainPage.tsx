'use client'

import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import Header from "./Header";
import ConfirmationPopUp from "./WarningPopUp";
import axios from "axios";

// MainPage component
export default function MainPage() {
  // API call
  axios.get('/api/teams')
  .then((response) => {
    console.log('REQ on frontend', response.status)
    
    if (response.status === 200) {
      console.log('DATA', response.data)
    }
  })
  // Declared state for a handful of things
  const [data, setData] = useState()
  const [cartTotal, setCartTotal] = useState<number>(0)
  const [cartStatus, setCartStatus] = useState<{ [key: string]: boolean }>({});
  const [warning, setWarning] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [playerCart, setPlayerCart] = useState<any[]>([])
  // Use effect hooks for cart handling
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTotal = localStorage.getItem('total');
      setCartTotal(storedTotal ? parseInt(storedTotal) : 0);
    }
  }, []);

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem('cart')
    const cartStatusFromLocalStorage = localStorage.getItem('cartStatus')
    const cartTotalFromLocalStorage = localStorage.getItem('cartTotal')
    
    if (cartFromLocalStorage) {
      const parsedCart = JSON.parse(cartFromLocalStorage)
      setPlayerCart(parsedCart)
    }
    
    if (cartStatusFromLocalStorage) {
      const parsedCartStatus = JSON.parse(cartStatusFromLocalStorage)
      setCartStatus(parsedCartStatus)
    }

    if (cartTotalFromLocalStorage) {
      const parsedTotal = JSON.parse(cartTotalFromLocalStorage)
      setCartTotal(parsedTotal)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(playerCart));
    localStorage.setItem('cartStatus', JSON.stringify(cartStatus));
  }, [playerCart, cartStatus]);

  useEffect(() => {
   localStorage.setItem('total', JSON.stringify(cartTotal)) 
  }, [cartTotal])
  // User handling functions
  const handleCartAdd = (playerName: string, playerPrice: any) => {
    const playerItem = {
      'player': playerName,
      'price': playerPrice
    }
    const price = parseInt(playerPrice)

    if (cartTotal <= 100 && cartTotal + price <= 100) {
      setCartTotal((prevTotal) => prevTotal + price)
      setCartStatus((prevStatus) => ({ ...prevStatus, [playerName]: true }))
      const updatedCart = [...playerCart, playerItem]
      setPlayerCart(updatedCart)
    } else {
      setWarning(true)
    }
  };

  const handleCartRemove = (playerName: string, playerPrice: any) => {
    const price = parseInt(playerPrice)

    if (cartTotal > 0 && cartTotal - price >= 0) {
      const updatedCart = playerCart.filter((player) => player.player !== playerName);
      
      setCartTotal((prevTotal) => prevTotal - price);
      setCartStatus((prevStatus) => ({ ...prevStatus, [playerName]: false }));
      setPlayerCart(updatedCart);

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.removeItem(playerName)

    } else if (cartTotal - price < 0) {
      setCartTotal(0)
    }
  };

  const handleCloseWarning = () => {
    setWarning(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  return (
    <>
      <main className="bg-white min-h-screen w-full flex-col items-center justify-between">
        <Header cartTotal={cartTotal} />
        {/* When limit exceeds $100 */}
      { warning ? <ConfirmationPopUp handleClose={handleCloseWarning}/> : null }
        {/* Intro team section header */}
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
            {/* Searchbar */}
            <div className="p-2 m-2">
                <span className="p-2 font-semibold text-lg text-black">Search:</span>
                <input className="border border-4 border-green-900 p-2" type="text" value={userInput} placeholder="SomePlayerName" onChange={handleSearch} ></input>
            </div>
            {/* Search and map */}
            <div className="py-4 grid gap-4 md:grid-cols-4 grid-rows-4">
                {data?.result[0]?.players
                  .filter((player: any) => {
                    if (userInput == '') {
                      return true
                    } else if (player.player_name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(userInput.toLowerCase())) {
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
      </main>
    </>
  )
}