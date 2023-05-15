import MainPage from '@/components/MainPage';
import Header from '../components/Header';
import useFetchAPI from "@/app/useFetch_API";
import { useClient } from 'next/data-client';

export default function Home() {
  useClient()
  const { Data } = useFetchAPI('https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=207&APIkey=5236ed59d8bee807fe40271e4c712d271677c89bd7609a53dad5de9f5de09686')
  
  return (
    <main className="bg-white min-h-screen w-screen flex-col items-center justify-between">
        <Header />

        <MainPage />
    </main>
  )
}
