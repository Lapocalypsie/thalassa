"use client";
import React, { useState } from "react";
import { Download, Info, Play, Users, Star } from "lucide-react";

const AboutSection = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleDownload = () => {
    const fileUrl = "/awesome-dino.jar";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "awesome-dino.jar";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExecute = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center">
          <Info className="mr-4 w-10 h-10" />
          <h2 className="text-3xl font-bold">À propos du 11 d'Inazuma</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-4">
            <Users className="w-12 h-12 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Notre Équipe
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Le 11 d'Inazuma, composé de Youcef, Elias, Lilia, Daria, Mariem,
                Chanez, Nassim, Ora, Jimmy, Alex, Clément, et Oliwia, est ravi
                de vous présenter ce site web unique. Nous avons travaillé dur
                pour créer une expérience divertissante avec un jeu spécial sur
                les crédits et la rétro.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105 shadow-md"
            >
              <Download className="mr-2" /> Télécharger notre jeu
            </button>

            <button
              onClick={handleExecute}
              className="flex-1 flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
            >
              <Play className="mr-2" /> Comment exécuter
            </button>
          </div>

          {showInstructions && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                Instructions d'exécution
              </h3>
              <ol className="space-y-2 text-gray-700">
                {[
                  "Assurez-vous d'avoir Java installé sur votre ordinateur",
                  "Ouvrez un terminal ou une invite de commande",
                  "Naviguez jusqu'au dossier contenant awesome-dino.jar",
                  "Exécutez la commande :",
                ].map((step, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="mr-2 w-4 h-4 text-blue-500" />
                    {step}
                  </li>
                ))}
                <li className="flex items-center">
                  <Star className="mr-2 w-4 h-4 text-blue-500" />
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    java -jar awesome-dino.jar
                  </code>
                </li>
              </ol>
            </div>
          )}

          <div className="text-center text-gray-500 mt-4">
            <p>Version: 1.0.0 • Dernière mise à jour: Décembre 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
