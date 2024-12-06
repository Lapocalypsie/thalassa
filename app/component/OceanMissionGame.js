"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, ChevronRight } from "lucide-react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

const VideoModal = ({ videoId, isOpen, onClose }) => {
  useEffect(() => {
    // Start audio when component mounts
    const audio = new Audio("quizz.mp3");
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
    <ModalVideo
      channel="youtube"
      isOpen={isOpen}
      videoId={videoId}
      onClose={onClose}
    />
  );
};

const OceanMissionGame = () => {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [showConsequencePopup, setShowConsequencePopup] = useState(false);
  const [consequenceDetails, setConsequenceDetails] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    health: 100,
    oceanHealth: 100,
    resources: 100,
  });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const scenes = [
    {
      missionNumber: 1,
      type: "Mission",
      hasVideo: true,
      idVideo: "sRQ3kMSiNI8",
      preQuestion: "L'île de plastique (Océan Pacifique)",
      text: "Thalassa entame sa mission en se rendant dans le plus grand océan du monde, l’océan Pacifique. Une vaste accumulation de plastique flotte entre la Californie et Hawaï, empoisonnant les courants et la faune marine. Thalassa ressent comme une lourdeur dans son corps, elle a du mal à se mouvoir, comme si ses veines étaient obstruées.",
      choices: [
        {
          label: "Lancer une campagne de nettoyage massive",
          consequence: {
            text: "Vous rassemblez des bénévoles et installez des collecteurs flottants. L'océan commence à respirer, mais l'effort demande beaucoup d'énergie.",
            impact: { health: -20, oceanHealth: 25, resources: -10 },
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
            text: "La pollution continue de s'accumuler. Thalassa souffre et s'affaiblit. Par ailleurs,  l’île de plastique continue de s’étendre, affaiblissant Thalassa encore plus.",
            impact: { health: -10, oceanHealth: -20, resources: 0 },
          },
        },
      ],
      nextMission: 2,
    },
    {
      missionNumber: 2,
      type: "Mission",
      hasVideo: true,
      idVideo: "6DG_7cJHtMM",
      preQuestion: "La surpêche (Océan Atlantique)",
      text: "Thalassa arrive dans l’océan Atlantique où les populations de poissons s’effondrent en raison de la surpêche, perturbant les écosystèmes.Notre jeune héroïne est pâle et se sent fatiguée, comme si son sang manquait d’oxygène.",
      choices: [
        {
          label: "Ne rien faire",
          consequence: {
            text: "Éviter les conflits immédiats, mais l’effondrement des stocks de poissons affaiblit davantage Thalassa.",
            impact: { health: -25, oceanHealth: -15, resources: +10 },
          },
        },
        {
          label: "Instaurer un moratoire de pêche de 5 ans",
          consequence: {
            text: "Interdire totalement la pêche dans la région pour permettre aux stocks de se régénérer.",
            impact: { health: 5, oceanHealth: 10, resources: 0 },
          },
        },
        {
          label: "Introduire des quotas de pêche durable",
          consequence: {
            text: "Limiter la pêche pour préserver les espèces tout en soutenant les pêcheurs.",
            impact: { health: 10, oceanHealth: 20, resources: 0 },
          },
        },
      ],
      nextMission: 3,
    },
    {
      missionNumber: 3,
      type: "Mission",
      hasVideo: false,
      idVideo: "",
      preQuestion: "Le blanchiment des coraux",
      text: "Notre chère héroïne se trouve à présent dans la grande bleue ou réchauffement de l’eau provoque la mort des récifs coralliens, essentiels à la biodiversité. Thalassa ressent une douleur dans ses muscles, symbolisant la destruction de son tissu conjonctif.",
      choices: [
        {
          label: "Planter des coraux résistants à la chaleur",
          consequence: {
            text: "Repeupler les récifs avec des espèces adaptées au réchauffement climatique.",
            impact: { health: -20, oceanHealth: 25, resources: -10 },
          },
        },
        {
          label:
            " Sensibiliser et agir pour réduire les émissions de CO₂ dans la région",
          consequence: {
            text: "Investir dans des solutions à long terme pour ralentir le réchauffement global.",
            impact: { health: 5, oceanHealth: 10, resources: 0 },
          },
        },
        {
          label:
            "Ne rien faire, Laisser les récifs mourir pour économiser des ressources.",
          consequence: {
            text: "L’écosystème s’effondre, et Thalassa perd encore plus de vitalité.",
            impact: { health: -10, oceanHealth: -20, resources: 0 },
          },
        },
      ],
      nextMission: 4,
    },
    {
      missionNumber: 4,
      type: "Mission",
      hasVideo: true,
      idVideo: "790WlppWsXU",
      preQuestion: "Les zones mortes (Mer d’Arabie)",
      text: "Thalassa arrive dans les zones mortes de la mer d’Arabie. La pollution agricole y provoque l’eutrophisation, créant une zone morte sans oxygène. Thalassa se sent constamment essoufflée, elle a des difficultés à respirer.",
      choices: [
        {
          label: "Restaurer les écosystèmes côtiers (mangroves, herbiers)",
          consequence: {
            text: "Planter des végétaux pour filtrer les polluants et absorber les nutriments",
            impact: { health: +20, oceanHealth: +20, resources: -10 },
          },
        },
        {
          label:
            " Ignorer la zone morte, Préserver les ressources pour d’autres missions.",
          consequence: {
            text: "L’écosystème s’effondre, et Thalassa perd encore plus de vitalité.",
            impact: { health: -20, oceanHealth: -25, resources: +10 },
          },
        },
        {
          label: "Imposer des restrictions sur l’agriculture",
          consequence: {
            text: "Limiter l’utilisation d’engrais dans les régions voisines.",
            impact: { health: 5, oceanHealth: 10, resources: 0 },
          },
        },
      ],
      nextMission: 5,
    },
    {
      missionNumber: 5,
      type: "Mission",
      hasVideo: true,
      idVideo: "C48EHs6A66A",
      preQuestion: " L’AMOC en danger (Océan)",
      text: "Il fait un froid glacial, Thalassa est dans l’Océan Atlantique Nord La fonte des glaces perturbe la salinité et ralentit l’AMOC, menaçant le climat mondial. Les battements de cœur de Thalassa sont irréguliers, elle ressent comme un déséquilibre global.",
      choices: [
        {
          label: "Ne rien faire et laisser l’AMOC ralentir davantage.",
          consequence: {
            text: "Effondrement climatique global, Thalassa devient gravement malade.",
            impact: { health: -25, oceanHealth: -10, resources: 0 },
          },
        },
        {
          label: "Réduire la fonte des glaces",
          consequence: {
            text: "Mettre en œuvre des politiques mondiales pour réduire les émissions de gaz à effet de serre",
            impact: { health: 5, oceanHealth: -10, resources: -10 },
          },
        },
        {
          label:
            " Restaurer un équilibre local, en utilisant des barrages ou des technologies pour ralentir la fonte dans une zone ciblée",
          consequence: {
            text: "Impact limité, mais permet de stabiliser temporairement l’AMOC",
            impact: { health: 5, oceanHealth: 10, resources: -10 },
          },
        },
      ],
      nextMission: 6,
    },
    {
      missionNumber: 6,
      type: "Mission",
      hasVideo: true,
      idVideo: "KHT7HcuNFig",
      preQuestion: "Les eaux montantes",
      text: "La montée des eaux submerge les zones côtières et menace les habitats marins et humains.Thalassa ressent une pression constante sur sa poitrine, comme si elle étouffait.",
      choices: [
        {
          label: "Ignorer le problème",
          consequence: {
            text: "Passer à une autre mission plus urgente.",
            impact: { health: -15, oceanHealth: -20, resources: 5 },
          },
        },
        {
          label:
            "Protéger une ville côtière vulnérable. Construire des digues et des protections pour empêcher l’inondation.",
          consequence: {
            text: " Les humains sont sauvés, mais les mangroves disparaissent, aggravant le problème à long terme.",
            impact: { health: 5, oceanHealth: -10, resources: -15 },
          },
        },
        {
          label:
            "Replanter des mangroves, Utiliser la nature pour ralentir l’érosion et absorber les eaux montantes",
          consequence: {
            text: "Solution durable pour l’écosystème, mais sacrifier une partie des habitations humaines.",
            impact: { health: 10, oceanHealth: 10, resources: -20 },
          },
        },
      ],
      nextMission: 7,
    },
  ];

  const currentScene = scenes[currentMissionIndex];

  const handleChoice = (choice) => {
    setConsequenceDetails(choice.consequence);
    setShowConsequencePopup(true);

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
      if (nextMissionIndex !== -1) {
        setCurrentMissionIndex(nextMissionIndex);
      } else {
        setGameCompleted(true);
      }
    } else {
      setGameCompleted(true);
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
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-white text-red-800 px-6 py-2 rounded-full hover:bg-red-100 transition-all duration-300 flex items-center justify-center mx-auto font-semibold"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-600 text-white flex items-center justify-center p-4">
        <div className="max-w-2xl bg-green-950/70 p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-4xl font-bold mb-6">Félicitations!</h2>
          <p className="mb-4">
            Vous avez terminé toutes les missions et sauvé les océans et
            Thalassa!
          </p>
          <div className="space-y-4">
            <div>🫀 Santé finale : {playerStats.health}</div>
            <div>🌊 Santé de l'océan : {playerStats.oceanHealth}</div>
            <div>💧 Ressources restantes : {playerStats.resources}</div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-white text-green-800 px-6 py-2 rounded-full hover:bg-green-100 transition-all duration-300 flex items-center justify-center mx-auto font-semibold"
          >
            Rejouer
          </button>
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
            {currentScene.hasVideo ? (
              <img
                src="/play-circle-o.svg"
                alt="Play Icon"
                className="w-6 h-6 inline-block hover:opacity-80 cursor-pointer"
                onClick={() => setIsVideoModalOpen(true)}
              />
            ) : (
              <img
                src="/play-circle-o.svg"
                alt="Play Icon"
                className="w-6 h-6 inline-block opacity-50 cursor-not-allowed"
              />
            )}
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

      <VideoModal
        videoId={currentScene.idVideo}
        autoplay={true}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};

export default OceanMissionGame;
