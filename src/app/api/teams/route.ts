import axios from "axios"
import { NextResponse } from "next/server"
import randomizeTeam from "@/app/utils/randomTeam"
import { data } from "autoprefixer"
  
const randomTeam = randomizeTeam(80, 90)

export async function GET() {
    console.log('sarting backend GET')
    const response = await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${randomTeam}&APIkey=${process.env.API_KEY}`)
    try {
        if (response.status === 200) {
            console.log(response.data)
            return NextResponse.json({ status: response.status, message: 'The request was SUCCESSFULL in the backend!', data: response.data})
        } else {
            return NextResponse.json({ status: response.status, message: 'The request FAILED in the backend :('})
        }
    } 
    catch {
        return NextResponse.json({ message: `There was an error when making the request. Failed with ${response.status}`})
    }
}