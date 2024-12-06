import React from "react";
import { User, Waves } from "lucide-react";
import Link from "next/link";

const OceanGate = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white overflow-hidden">
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
            <p className="text-lg text-white/80">Progrès de la mission</p>
          </div>
          <div className="flex items-center space-x-4 text-white/70">
            <Waves className="w-8 h-8" />
            <User className="w-8 h-8" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="max-w-3xl text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              Thalassa
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-white/80">
                Aidez Thalassa à aller mieux et, sauvez l'océan.
              </span>
            </h1>

            <div className="w-32 border-t-2 border-white/30 mx-auto lg:mx-0"></div>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Les profondeurs de l’océan chantent. Mais ce matin, leur mélodie
              est lourde et discordante...
            </p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                <Link href="/game"> Commencer la Mission</Link>
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
