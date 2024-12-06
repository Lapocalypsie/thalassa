"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Wind, Waves, Cpu } from "lucide-react";

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
      type: "dialogue",
      character: "Thalassa et Florent",
      title: "Le Diagnostic",
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
      choices: [
        {
          label: "Écouter attentivement",
          consequence: {
            text: "Votre connexion avec l'océan s'approfondit",
            impact: {
              health: 0,
              oceanHealth: 0,
              connection: 10,
              knowledge: 5,
            },
          },
        },
        {
          label: "Montrer de l'inquiétude",
          consequence: {
            text: "Votre vulnérabilité révèle votre force intérieure",
            impact: {
              health: -5,
              oceanHealth: 0,
              connection: 5,
              knowledge: 0,
            },
          },
        },
      ],
    },
    {
      type: "mission",
      title: "La Carte des Océans",
      description:
        "Florent vous présente une carte nacrée montrant les zones océaniques en détresse.",
      mission: "Choisissez votre première zone d'intervention",
      choices: [
        {
          label: "Pacifique - Île de plastique",
          icon: <Waves />,
          consequence: {
            text: "Les déchets plastiques menacent l'écosystème marin",
            impact: {
              health: -10,
              oceanHealth: -15,
              connection: 5,
              knowledge: 10,
            },
          },
        },
        {
          label: "Arctique - Fonte des glaces",
          icon: <Wind />,
          consequence: {
            text: "Le réchauffement climatique bouleverse l'équilibre polaire",
            impact: {
              health: -5,
              oceanHealth: -20,
              connection: 10,
              knowledge: 15,
            },
          },
        },
        {
          label: "Récifs coralliens - Blanchissement",
          icon: <MapPin />,
          consequence: {
            text: "Les coraux perdent leur couleur et leur vie",
            impact: {
              health: -15,
              oceanHealth: -10,
              connection: 15,
              knowledge: 20,
            },
          },
        },
      ],
    },
  ];

  const handleChoice = (choice) => {
    const { consequence } = choice;

    setPlayerStats((prev) => ({
      health: Math.max(
        0,
        Math.min(100, prev.health + consequence.impact.health)
      ),
      oceanHealth: Math.max(
        0,
        Math.min(100, prev.oceanHealth + consequence.impact.oceanHealth)
      ),
      connection: Math.max(
        0,
        Math.min(100, prev.connection + consequence.impact.connection)
      ),
      knowledge: Math.max(
        0,
        Math.min(100, prev.knowledge + consequence.impact.knowledge)
      ),
    }));

    // Move to next scene
    setCurrentScene((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl bg-blue-950/70 p-8 rounded-xl relative">
        {/* Stats Display */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <div>🫀 Santé : {playerStats.health}</div>
          <div>🌊 Océan : {playerStats.oceanHealth}</div>
          <div>🔗 Connexion : {playerStats.connection}</div>
          <div>📚 Connaissance : {playerStats.knowledge}</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dialogue Scene */}
            {scenes[currentScene].type === "dialogue" && (
              <div>
                <h2 className="text-3xl mb-6 text-center">
                  {scenes[currentScene].title}
                </h2>
                {scenes[currentScene].dialogue.map((line, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold text-blue-300">{line.speaker} :</p>
                    <p>{line.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Mission Scene */}
            {scenes[currentScene].type === "mission" && (
              <div>
                <h2 className="text-3xl mb-6 text-center">
                  {scenes[currentScene].title}
                </h2>
                <p className="mb-6 text-center">
                  {scenes[currentScene].description}
                </p>
                <h3 className="text-xl mb-4 text-center">
                  {scenes[currentScene].mission}
                </h3>
              </div>
            )}

            {/* Choices */}
            <div className="space-y-4">
              {scenes[currentScene].choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition"
                >
                  <span>{choice.label}</span>
                  {choice.icon && <span>{choice.icon}</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThalassaVoyage;
