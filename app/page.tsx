"use client";
import { SingleCard } from "@/components";
import cardDataGenerator from "@/utils/cardDataGenerator";
import { formatMinAndSec } from "@/utils/formatTime";
import { useMemo, useState } from "react";
import { useStopwatch } from "react-timer-hook";
// @ts-ignore
import useSound from "use-sound";

const cardData = [
  { id: 1, value: 5 },
  { id: 2, value: 3 },
  { id: 3, value: 6 },
  { id: 4, value: 2 },
  { id: 5, value: 1 },
  { id: 6, value: 3 },
  { id: 7, value: 4 },
  { id: 8, value: 1 },
  { id: 9, value: 2 },
  { id: 10, value: 5 },
  { id: 11, value: 6 },
  { id: 12, value: 4 },
];
export default function Home() {
  const [activeCard, setActiveCard] = useState<number[]>([]);
  const [matchedValue, setMatchedValue] = useState<number[]>([]);

  const [moves, setMoves] = useState(0);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });

  const [playGameEndSound] = useSound("/music/congrats.wav", {
    volume: 0.2,
  });

  const data = useMemo(() => cardDataGenerator(6), []);
  console.log(data, "data combined array");

  return (
    <>
      <p>Moves: {Math.floor(moves / 2)}</p>
      <p>
        Time: {formatMinAndSec(minutes)}:{formatMinAndSec(seconds)}
      </p>
      <div className="grid grid-cols-4 gap-2 place-items-center w-fit mx-auto">
        {data.map(({ id, value }) => (
          <SingleCard
            key={id}
            label={value}
            {...{
              activeCard,
              setMoves,
              setActiveCard,
              matchedValue,
              setMatchedValue,
            }}
            stopTimer={pause}
            totalLength={cardData.length}
            cardId={value}
            playGameEndSound={playGameEndSound}
          />
        ))}
      </div>
    </>
  );
}
