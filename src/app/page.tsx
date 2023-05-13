import MainPage from '@/components/MainPage';
import Header from '../components/Header';

export default function Home() {
  return (
    <main className="bg-white min-h-screen w-screen flex-col items-center justify-between">
        <Header />

        <MainPage />
    </main>
  )
}
