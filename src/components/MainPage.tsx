import React from "react";
import PlayerCard from "./PlayerCard";
import useFetchAPI from '../app/useFetch_API';

function getRandomTeam() {
    return Math.floor(Math.random() * 100)
}

const randomTeam = getRandomTeam()

export default function MainSection() {
    const { data, loading } = useFetchAPI(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${randomTeam}&APIkey=5236ed59d8bee807fe40271e4c712d271677c89bd7609a53dad5de9f5de09686`)
    return (
        <>
            <div className="h-full w-full flex flex-col items-center">
                <h1 className="p-2 m-2 text-lg">{ data?.result[0]?.team_name || 'No players found, the market maybe closed' }</h1>

                { loading && <p>Loading...</p>}

                <div className="grid gap-4 md:grid-cols-4 grid-rows-4">
                    { data?.result[0]?.players.map((player: any) => (                         
                        <PlayerCard playerName={player.player_name} playerLogo={player.player_image} playerPrice={player.player_number} />
                        || 'There were no players found in this particular team'
                    ))}
                </div>
            </div>
        </>
    )
}