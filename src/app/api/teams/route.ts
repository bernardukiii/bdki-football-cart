import { NextResponse } from "next/server"
import randomizeTeam from "@/app/utils/randomTeam"
  
export async function GET() {
    const randomTeam = randomizeTeam(80, 90)

    const response = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${randomTeam}&APIkey=${process.env.API_KEY}`,
        { cache: "no-store" } 
    )
    const data = await response.json()
    try {
        if (response.status === 200) {
            return NextResponse.json({ status: response.status, message: 'The request was SUCCESSFULL in the backend!', data: data})
        } else {
            return NextResponse.json({ status: response.status, message: 'The request FAILED in the backend :('})
        }
    } 
    catch {
        return NextResponse.json({ message: `There was an error when making the request. Failed with ${response.status}`})
    }
}