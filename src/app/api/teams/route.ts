import axios from "axios"
import { NextResponse } from "next/server"
import randomizeTeam from "@/app/utils/randomTeam"
  
const randomTeam = randomizeTeam(80, 90)

export async function GET() {
    axios.get(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${randomTeam}&APIkey=${process.env.API_KEY}`)
    .then((res) => {
        if (res.status === 200) {
            NextResponse.json({ status: res.status, message: 'The request was SUCCESSFULL in the backend!'})
        } else {
            NextResponse.json({ status: res.status, message: 'The request FAILED in the backend :('})
        }
    })
    .catch((error) => {
        NextResponse.json({ message: `There was an error when making the request. Failed with ${error}`})
    })
}