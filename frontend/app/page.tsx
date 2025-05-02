"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [message, setMessage] = useState("Loading...");
  useEffect(() => {
    
    fetch('http://localhost:8000/api/home').then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMessage(data.message)
      }
    )
  }, [])

  return (
    <div className="flex flex-col justify-center items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          ChatZD
        </h1>
        <p className="text-lg text-center sm:text-left">
          {message}
        </p>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Welcome to ChatZD
        </a>
      </footer>
    </div>
  );
}
