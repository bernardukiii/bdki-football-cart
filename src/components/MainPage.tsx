import React from "react";
import ClubCard from "./ClubCard";

export default function MainPage() {
    return (
        <>
            <div className="h-full w-full flex flex-col items-center">
                <h1 className="p-2 m-2">Clubs</h1>

                <div className="grid gap-4 md:grid-cols-4 grid-rows-4">
                    <ClubCard />
                </div>
            </div>
        </>
    )
}