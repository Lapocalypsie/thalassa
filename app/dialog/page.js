"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ThalassaVoyage = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [playerStats, setPlayerStats] = useState({
    health: 100,
    oceanHealth: 100,
    connection: 50,
    knowledge: 0,
  });

  const scenes = [
    {
      dialogue: [
        {
          speaker: "Thalassa",
          text: "Salut Florent ! Je viens à toi en quête des réponses. Mon corps me trahit. Mes poumons brûlent, mon cœur s'emballe, mes muscles me lâchent… Je sens que quelque chose ne va pas. Mais ce n'est pas juste moi. C'est… l'océan, n'est-ce pas ?",
        },
        {
          speaker: "Florent",
          text: "Tu as raison, Thalassa. Toi et l'océan êtes liés par un fil invisible. Chaque douleur que tu ressens est un écho des souffrances des mers. Les courants ralentissent, les récifs s'effacent, et la vie sous-marine s'étouffe sous le poids des actions humaines.",
        },
        {
          speaker: "Thalassa",
          text: "Alors que dois-je faire ? Comment puis-je apaiser ces douleurs ?",
        },
        {
          speaker: "Florent",
          text: "Les océans t'ont choisie comme leur gardienne, Thalassa. Ton corps reflète leur état. Si tu les sauves, tu te sauveras toi-même. Mais le chemin sera long et parsemé d'épreuves. Es-tu prête à entendre ce que je vais te dire ?",
        },
        {
          speaker: "Thalassa",
          text: "Je n'ai pas le choix, n'est-ce pas ? Oui, je suis prête.",
        },
      ],
    },
  ];

  useEffect(() => {
    // Start audio when component mounts
    const audio = new Audio("stress.mp3");
    audio.loop = true;
    audio.volume = 1;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((error) => {
          console.log("Audio play failed:", error);
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl bg-blue-950/70 p-8 rounded-xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dialogue Scene */}
            {scenes[currentScene] && (
              <div>
                {scenes[currentScene].dialogue.map((line, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold text-blue-300">{line.speaker} :</p>
                    <p>{line.text}</p>
                  </div>
                ))}
                {/* "Allons-y" Button */}
                <div className="mt-6 flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition">
                    <Link href="/game">Allons-y</Link>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThalassaVoyage;
