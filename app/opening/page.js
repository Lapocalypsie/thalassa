"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const OceanCallOpening = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Contenus avec titres et textes par étape
  const steps = [
    {
      title: "Les profondeurs de l'océan chantent.",
      paragraphs: [
        "Mais ce matin, leur mélodie est lourde et discordante.",
        "Le rythme des courants est brisé, et l'eau, autrefois claire et vivante, semble peser comme un fardeau.",
        "Thalassa ouvre les yeux dans sa petite maison au bord de la mer.",
      ],
    },
    {
      title: "Une douleur sourde l'envahit.",
      paragraphs: [
        "Comme un écho lointain, résonnant de la surface jusqu'aux abysses.",
        "Elle pose une main sur sa poitrine : son cœur bat faiblement, en décalage avec les vagues.",
        "Son souffle est court, comme si ses poumons eux-mêmes luttaient pour respirer.",
        "Elle se redresse et marche jusqu'à la fenêtre. L'océan s'étend devant elle, vaste et magnifique, mais… malade.",
      ],
    },
    {
      title: "Ce n'est pas qu'un mauvais jour.",
      paragraphs: [
        "Murmure-t-elle : Quelque chose ne va pas... ",
        "L'appel est clair. L'océan a besoin d'elle, et elle sait qu'elle seule peut l'aider.",
        "Thalassa sent en elle un pouvoir unique : chaque battement de son cœur, chaque souffle de ses poumons, chaque goutte de son énergie est lié à l'équilibre des mers.",
        "Mais son pouvoir n'est pas infini. Chaque décision qu'elle prendra pourrait guérir une partie de l'océan… ou aggraver sa douleur.",
      ],
    },
    {
      title: "Un long voyage l'attend.",
      paragraphs: [
        "Les courants du monde entier l'appellent, chacun porteur d'une souffrance à soulager.",
        "Mais le temps presse, et son corps, fragile, ne tiendra que si elle fait les bons choix.",
        "Thalassa, fille de l'océan, peut-elle encore sauver ce monde ?",
      ],
    },
  ];

  useEffect(() => {
    // Start audio when component mounts
    const audio = new Audio("ocean-chant.mp3");
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

  const handleContinue = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div
      className="relative overflow-hidden h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col justify-center items-center"
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      {/* Animated Ocean Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-full h-full bg-[url('/ocean-waves.gif')] bg-cover bg-center animate-wave"></div>
      </div>

      {/* Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-2xl px-4"
        >
          {/* Title */}
          <motion.h1
            className="text-4xl font-bold mb-8 text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {steps[currentStep].title}
          </motion.h1>

          {/* Paragraphs */}
          {steps[currentStep].paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-xl mb-4 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Continue Button */}
      {currentStep < steps.length - 1 && (
        <motion.button
          onClick={handleContinue}
          className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Continuer
        </motion.button>
      )}

      {/* Final Button for Redirection */}
      {currentStep === steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/dialog">
            <button className="mt-12 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Vers le dialogue
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default OceanCallOpening;
