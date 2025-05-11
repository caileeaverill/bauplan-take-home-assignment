'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

function Loading() {
    const [currentMessage, setCurrentMessage] = useState(0);
    const messages = ['The Matrix is loading...', 'Please Wait...', 'Beep boop...', 'Almost There...'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <main
            className="flex flex-col items-center justify-center w-full h-full animate-fade-in"
            aria-busy="true"
            aria-live="polite"
        >
            <Image
                src="/bauplan-logo.svg"
                alt="Loading logo"
                className="w-16 h-16 mb-4 animate-bounce"
                width={64}
                height={64}
            />
            <p className="text-slate-400 text-sm animate-fade-delayed mb-4">
                {messages[currentMessage]}
            </p>
        </main>
    );
}

export default Loading;