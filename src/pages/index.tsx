import MainSection from '@/components/MainPage';
import Header from '../components/Header';
import "../app/globals.css";

export default function Home() {
  return (
    <main className="bg-white min-h-screen w-screen flex-col items-center justify-between">
        <Header />

        <MainSection />
    </main>
  )
}
