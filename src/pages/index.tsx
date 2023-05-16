import MainPage from '@/components/MainPage';
import "../app/globals.css";
import React, { useState } from 'react';

export default function Home() {
  return (
    <main className="bg-white min-h-screen w-screen flex-col items-center justify-between">
        <MainPage />
    </main>
  )
}
