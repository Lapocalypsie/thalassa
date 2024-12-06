"use client";
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const OceanMissionGame = ({ missionNumber }) => {
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
      preQuestion: "L’île de plastique (Océan Pacifique)",
      character: "Florent",
      text: "Une vaste accumulation de plastique flotte entre la Californie et Hawaï, empoisonnant les courants et la faune marine. Thalassa ressent comme une lourdeur dans son corps, elle a du mal à se mouvoir, comme si ses veines étaient obstruées.",
      choices: [
        {
          label: "Lancer une campagne de nettoyage massive",
          consequence: {
            text: "Rassembler des bénévoles et installer des collecteurs flottants.",
            impact: { health: 5, oceanHealth: 5, resources: 0 },
          },
        },
        {
          label: "Réduire la source du problème",
          consequence: {
            text: "Travailler avec les communautés locales pour limiter l’entrée de plastiques dans l’océan.",
            impact: { health: -5, oceanHealth: 0, resources: 0 },
          },
        },
        {
          label: "Ignorer le problème",
          consequence: {
            text: "Conserver les forces de Thalassa et passer à une autre région.",
            impact: { health: -5, oceanHealth: 0, resources: 0 },
          },
        },
      ],
    },
    // Autres missions à ajouter si nécessaire
  ];

  // On filtre la scène actuelle selon le missionNumber reçu en prop
  const currentScene = scenes.find(
    (scene) => scene.missionNumber === missionNumber
  );

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
  };

  if (!currentScene) {
    return <div>Mission non trouvée</div>; // Si la mission n'existe pas, on affiche ce message
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl bg-blue-950/70 p-8 rounded-xl shadow-xl">
        {currentScene.type === "Mission" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              {currentScene.preQuestion}
            </h2>
            <p className="mb-6">{currentScene.text}</p>
          </div>
        )}

        <div className="space-y-4">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300"
            >
              {choice.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-sm font-medium">
          <div>🫀 Santé : {playerStats.health}</div>
          <div>🌊 Océan : {playerStats.oceanHealth}</div>
          <div>💧 Ressources : {playerStats.resources}</div>
        </div>
      </div>

      {showConsequencePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-lg">
            <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-4">Conséquences</h2>
            <p className="mb-4">{consequenceDetails.text}</p>
            <div className="mt-4 text-xs">
              <span>🫀 Santé : {playerStats.health}</span>
              <span> 🌊 Océan : {playerStats.oceanHealth}</span>
              <span> 💧 Ressources : {playerStats.resources}</span>
            </div>
            <button
              onClick={continueStory}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              Continuer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OceanMissionGame;
