"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { User, Waves, Sparkles, Lock } from "lucide-react";
import Link from "next/link";

const OceanGate = () => {
  const [logoPosition, setLogoPosition] = useState({ top: "0%", left: "0%" });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);
  const containerRef = useRef(null);
  const [konamiHint, setKonamiHint] = useState("");

  // Konami Code sequence (up, up, down, down, left, right, left, right, b, a)
  const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  // Randomize logo position
  const randomizeLogoPosition = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const maxTop = container.clientHeight - 100;
      const maxLeft = container.clientWidth - 100;

      const newTop = Math.floor(Math.random() * maxTop);
      const newLeft = Math.floor(Math.random() * maxLeft);

      setLogoPosition({
        top: `${newTop}px`,
        left: `${newLeft}px`,
      });
    }
  }, []);

  // Handle Konami Code
  const handleKeyDown = useCallback(
    (event) => {
      const newSequence = [...konamiSequence, event.code].slice(-10);
      setKonamiSequence(newSequence);

      // Check if Konami Code matches
      const isKonamiCodeEntered = newSequence.every(
        (code, index) => code === KONAMI_CODE[index]
      );

      if (isKonamiCodeEntered) {
        setIsLogoVisible(true);
        randomizeLogoPosition();
        setKonamiHint("Lyreco logo revealed! 🎉");

        // Clear hint after 3 seconds
        setTimeout(() => {
          setKonamiHint("");
        }, 3000);
      }
    },
    [konamiSequence, randomizeLogoPosition]
  );

  // Attach and detach event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Periodic repositioning when logo is visible
  useEffect(() => {
    let intervalId;
    if (isLogoVisible) {
      randomizeLogoPosition();
      intervalId = setInterval(randomizeLogoPosition, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLogoVisible, randomizeLogoPosition]);

  // Handle logo click
  const handleLogoClick = () => {
    setIsAnimating(true);

    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white overflow-hidden"
    >
      {/* Konami Hint */}
      {konamiHint && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500/80 text-white px-4 py-2 rounded-full">
          {konamiHint}
        </div>
      )}

      {/* Lyreco Logo - Hidden by default */}
      {isLogoVisible && (
        <div
          className={`absolute z-50 cursor-pointer transition-all duration-1000 ease-in-out ${
            isAnimating ? "animate-pulse scale-150 rotate-360" : ""
          }`}
          style={{
            top: logoPosition.top,
            left: logoPosition.left,
          }}
          onClick={handleLogoClick}
        >
          <div className="bg-white/80 p-2 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold text-xl">Lyreco</span>
            {isAnimating && (
              <Sparkles
                className="ml-2 text-yellow-400 animate-spin"
                size={24}
              />
            )}
          </div>
        </div>
      )}

      {/* Subtle Konami Code Indicator */}
      <div className="fixed top-4 right-4 z-50 flex space-x-1">
        {konamiSequence.map((code, index) => (
          <span key={index} className="w-2 h-2 rounded-full bg-white/50"></span>
        ))}
      </div>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
        >
          <source src="/videoBackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-blue-950/70 p-8 flex flex-col items-center justify-center space-y-6 backdrop-blur-sm">
          <div className="w-48 h-48 rounded-full border-4 border-white/30 overflow-hidden shadow-xl">
            <img
              src="/pawel.png"
              alt="Thalassa"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Bonjour, Pawel!</h2>
            <div className="w-32 border-t-2 border-white/30 mx-auto"></div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="max-w-3xl text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              Thalassa <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-white/80">
                Aidez Thalassa à aller mieux et, sauvez l'océan.
              </span>
            </h1>
            <div className="w-32 border-t-2 border-white/30 mx-auto lg:mx-0"></div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Les profondeurs de l'océan chantent. Mais ce matin, leur mélodie
              est lourde et discordante...
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                <Link href="/opening">Commencer la Mission</Link>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Qui êtes vous?
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OceanGate;
