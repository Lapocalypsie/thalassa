"use client";
import React, { useState, useEffect } from "react";
import { AlertCircle, ChevronRight } from "lucide-react";

const OceanMissionGame = () => {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [showConsequencePopup, setShowConsequencePopup] = useState(false);
  const [consequenceDetails, setConsequenceDetails] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    health: 100,
    oceanHealth: 100,
    resources: 100,
  });

  const scenes = [
    {
      missionNumber: 1,
      type: "Mission",
      preQuestion: "L'île de plastique (Océan Pacifique)",
      character: "Florent",
      text: "Une vaste accumulation de plastique flotte entre la Californie et Hawaï, empoisonnant les courants et la faune marine. Thalassa ressent comme une lourdeur dans son corps, elle a du mal à se mouvoir, comme si ses veines étaient obstruées.",
      choices: [
        {
          label: "Lancer une campagne de nettoyage massive",
          consequence: {
            text: "Rassembler des bénévoles et installer des collecteurs flottants. L'océan commence à respirer, mais l'effort demande beaucoup d'énergie.",
            impact: { health: -10, oceanHealth: 15, resources: -5 },
          },
        },
        {
          label: "Réduire la source du problème",
          consequence: {
            text: "En travaillant avec les communautés locales, vous limitez l'entrée de nouveaux plastiques. Un changement lent mais prometteur.",
            impact: { health: 5, oceanHealth: 10, resources: 0 },
          },
        },
        {
          label: "Ignorer le problème",
          consequence: {
            text: "La pollution continue de s'accumuler. Thalassa souffre et s'affaiblit.",
            impact: { health: -15, oceanHealth: -10, resources: 0 },
          },
        },
      ],
      nextMission: 2,
    },
    {
      missionNumber: 2,
      type: "Mission",
      preQuestion: "Acidification des océans (Océan Atlantique)",
      text: "L'acidification menace les écosystèmes marins. Les coraux blanchissent, les coquillages s'affaiblissent. Thalassa sent une douleur lancinante, comme une brûlure intérieure.",
      choices: [
        {
          label: "Réduire les émissions de CO2",
          consequence: {
            text: "Promotion de l'énergie renouvelable et des transports verts. Un pas difficile mais crucial.",
            impact: { health: -5, oceanHealth: 10, resources: -10 },
          },
        },
        {
          label: "Restaurer les écosystèmes",
          consequence: {
            text: "Plantation de mangroves et protection des récifs. La nature commence à cicatriser.",
            impact: { health: 5, oceanHealth: 15, resources: 0 },
          },
        },
        {
          label: "Attendre une solution miraculeuse",
          consequence: {
            text: "L'inaction aggrave la situation. Les écosystèmes continuent de se détériorer.",
            impact: { health: -15, oceanHealth: -15, resources: 0 },
          },
        },
      ],
      nextMission: 3,
    },
    {
      missionNumber: 3,
      type: "Mission",
      preQuestion: "Surpêche (Mer Méditerranée)",
      text: "Les populations de poissons s'effondrent. Les filets industriels vident les océans de leur vie. Thalassa sent sa force diminuer, comme un océan vidé de son essence.",
      choices: [
        {
          label: "Établir des zones marines protégées",
          consequence: {
            text: "Création de réserves où la vie marine peut se reconstituer. Un espoir renaît.",
            impact: { health: 10, oceanHealth: 20, resources: -5 },
          },
        },
        {
          label: "Promouvoir la pêche durable",
          consequence: {
            text: "Sensibilisation et nouveaux quotas. Un changement progressif mais prometteur.",
            impact: { health: 5, oceanHealth: 10, resources: 5 },
          },
        },
        {
          label: "Continuer comme si de rien n'était",
          consequence: {
            text: "La surpêche continue. Thalassa s'affaiblit, les océans perdent leur biodiversité.",
            impact: { health: -20, oceanHealth: -20, resources: 0 },
          },
        },
      ],
      nextMission: null, // Last mission
    },
  ];

  const currentScene = scenes[currentMissionIndex];

  const handleChoice = (choice) => {
    setConsequenceDetails(choice.consequence);
    setShowConsequencePopup(true);

    // Met à jour les stats
    setPlayerStats((prev) => ({
      health: Math.max(
        0,
        Math.min(100, prev.health + choice.consequence.impact.health)
      ),
      oceanHealth: Math.max(
        0,
        Math.min(100, prev.oceanHealth + choice.consequence.impact.oceanHealth)
      ),
      resources: Math.max(
        0,
        Math.min(100, prev.resources + choice.consequence.impact.resources)
      ),
    }));
  };

  const continueStory = () => {
    setShowConsequencePopup(false);

    if (currentScene.nextMission) {
      const nextMissionIndex = scenes.findIndex(
        (scene) => scene.missionNumber === currentScene.nextMission
      );
      setCurrentMissionIndex(nextMissionIndex);
    }
  };

  const checkGameOver = () => {
    return (
      playerStats.health <= 0 ||
      playerStats.oceanHealth <= 0 ||
      playerStats.resources <= 0
    );
  };

  if (checkGameOver()) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-600 text-white flex items-center justify-center p-4">
        <div className="max-w-2xl bg-red-950/70 p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-4xl font-bold mb-6">Game Over</h2>
          <p className="mb-4">Thalassa n'a pas pu sauver les océans...</p>
          <div className="space-y-4">
            <div>🫀 Santé : {playerStats.health}</div>
            <div>🌊 Océan : {playerStats.oceanHealth}</div>
            <div>💧 Ressources : {playerStats.resources}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-blue-950/70 p-6 md:p-8 rounded-xl shadow-xl">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {currentScene.preQuestion}
          </h2>
          <div className="text-sm md:text-base bg-blue-700 px-3 py-1 rounded-full">
            Mission {currentScene.missionNumber}
          </div>
        </div>

        <p className="mb-6 text-base md:text-lg leading-relaxed">
          {currentScene.text}
        </p>

        <div className="space-y-4">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 text-base md:text-lg"
            >
              {choice.label}
              <ChevronRight className="inline-block ml-2" size={20} />
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-sm font-medium bg-blue-900/50 p-3 rounded-lg">
          <div>🫀 Santé : {playerStats.health}</div>
          <div>🌊 Océan : {playerStats.oceanHealth}</div>
          <div>💧 Ressources : {playerStats.resources}</div>
        </div>
      </div>

      {showConsequencePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-6 md:p-8 rounded-xl max-w-md text-center shadow-2xl border-4 border-white/20">
            <AlertCircle className="mx-auto text-yellow-300 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-4 text-white">Conséquences</h2>
            <p className="mb-4 text-base md:text-lg text-white/90 italic">
              {consequenceDetails.text}
            </p>
            <div className="mt-4 text-sm space-x-4 bg-blue-900/50 p-3 rounded-lg">
              <span className="text-red-300">
                🫀 Santé : {playerStats.health}
              </span>
              <span className="text-green-300">
                🌊 Océan : {playerStats.oceanHealth}
              </span>
              <span className="text-blue-300">
                💧 Ressources : {playerStats.resources}
              </span>
            </div>
            <button
              onClick={continueStory}
              className="mt-6 bg-white text-blue-800 px-6 py-2 rounded-full hover:bg-blue-100 transition-all duration-300 flex items-center justify-center mx-auto font-semibold"
            >
              Continuer
              <ChevronRight className="inline-block ml-2" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OceanMissionGame;
