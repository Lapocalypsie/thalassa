"use client";
import React, { useState } from "react";
import OceanMissionGame from "../component/OceanMissionGame";

const OceanCallOpening = () => {
  const [currentStep, setCurrentStep] = useState(0); // Étape actuelle (0 = début)

  // Contenus avec titres et textes par étape
  const steps = [
    {
      title: "Les profondeurs de l’océan chantent.",
      paragraphs: [
        "Mais ce matin, leur mélodie est lourde et discordante.",
        "Le rythme des courants est brisé, et l’eau, autrefois claire et vivante, semble peser comme un fardeau.",
        "Thalassa ouvre les yeux dans sa petite maison au bord de la mer.",
      ],
    },
    {
      title: "Une douleur sourde l’envahit.",
      paragraphs: [
        "Comme un écho lointain, résonnant de la surface jusqu’aux abysses.",
        "Elle pose une main sur sa poitrine : son cœur bat faiblement, en décalage avec les vagues.",
        "Son souffle est court, comme si ses poumons eux-mêmes luttaient pour respirer.",
        "Elle se redresse et marche jusqu’à la fenêtre. L’océan s’étend devant elle, vaste et magnifique, mais… malade.",
      ],
    },
    {
      title: "Ce n’est pas qu’un mauvais jour.",
      paragraphs: [
        "Murmure-t-elle : Quelque chose ne va pas... ",
        "L’appel est clair. L’océan a besoin d’elle, et elle sait qu’elle seule peut l’aider.",
        "Thalassa sent en elle un pouvoir unique : chaque battement de son cœur, chaque souffle de ses poumons, chaque goutte de son énergie est lié à l’équilibre des mers.",
        "Mais son pouvoir n’est pas infini. Chaque décision qu’elle prendra pourrait guérir une partie de l’océan… ou aggraver sa douleur.",
      ],
    },
    {
      title: "Un long voyage l’attend.",
      paragraphs: [
        "Les courants du monde entier l’appellent, chacun porteur d’une souffrance à soulager.",
        "Mais le temps presse, et son corps, fragile, ne tiendra que si elle fait les bons choix.",
        "Thalassa, fille de l’océan, peut-elle encore sauver ce monde ?",
      ],
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
        fontFamily: "'Cinzel', serif",
        padding: "20px",
      }}
    >
      {/* Ocean Chant (Background Audio) */}
      <audio autoPlay loop>
        <source src="ocean-chant.mp3" type="audio/mpeg" />
      </audio>

      {/* Titre avec apparition progressive */}
      <div
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          opacity: 1,
          animation: "fadeIn 2s ease-in",
        }}
      >
        {steps[currentStep].title}
      </div>

      {/* Paragraphes apparaissant progressivement */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "1.5rem",
          animation: "fadeIn 2s ease-in",
        }}
      >
        {steps[currentStep].paragraphs.map((paragraph, index) => (
          <p key={index} style={{ margin: "10px 0", opacity: 1 }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Bouton "Continuer" */}
      {currentStep < steps.length - 1 && (
        <button
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            backgroundColor: "#1b6ca8",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            animation: "fadeIn 2s ease-in",
          }}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Continuer
        </button>
      )}
    </div>
  );
};

export default OceanCallOpening;
