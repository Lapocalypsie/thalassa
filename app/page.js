import Image from "next/image";
import OceanGate from "./component/OceanGate";
import OceanMissionGame from "./component/OceanMissionGame";

export default function Home() {
  return (
    <div>
      <OceanGate />
      <OceanMissionGame missionNumber={1} />

      <footer></footer>
    </div>
  );
}
