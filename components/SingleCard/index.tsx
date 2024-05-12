"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
// @ts-ignore
import useSound from "use-sound";

interface ISingleCardProps {
  activeCard: number[];
  setActiveCard: Dispatch<SetStateAction<number[]>>;
  cardId: number;
  label: number;
  matchedValue: number[];
  setMatchedValue: Dispatch<SetStateAction<number[]>>;
  setMoves: Dispatch<SetStateAction<number>>;
  stopTimer: () => void;
  totalLength: number;
}

const delay = (timeInMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

export default function SingleCard({
  activeCard,
  setActiveCard,
  cardId,
  label,
  matchedValue,
  setMatchedValue,
  setMoves,
  stopTimer,
  totalLength,
}: ISingleCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const [play] = useSound("/music/card_flip.ogg");
  const [playSuccess] = useSound("/music/success_sound.wav");
  const [playGameEnd] = useSound("/music/congrats.wav", {
    volume: 0.25,
  });

  useEffect(() => {
    if (matchedValue.length === totalLength / 2) {
      playGameEnd();
      stopTimer();
    }

    if (activeCard.length >= 2 && !matchedValue.includes(label)) {
      delay(800).then(() => {
        setIsFlipped(false);
        setActiveCard([]);
      });
    }
  }, [
    activeCard,
    activeCard.length,
    label,
    matchedValue,
    playGameEnd,
    setActiveCard,
    setMatchedValue,
    stopTimer,
    totalLength,
  ]);

  const handleClick = async (label: number) => {
    play();
    setMoves((prev) => ++prev);
    if (activeCard.length === 2) {
      // do nothing
      return;
    }
    if (activeCard[0] === label) {
      setIsFlipped(true);
      delay(300).then(() => {
        setMatchedValue((prev) => [...prev, label]);
        playSuccess();
      });
      setActiveCard([]);
      return;
    }
    setIsFlipped(true);
    setActiveCard((prev) => [...prev, cardId]);
  };

  return (
    <>
      <ReactCardFlip
        containerClassName="cursor-pointer w-fit"
        infinite
        isFlipped={isFlipped}
      >
        <div
          className="bg-gray-600 w-24 p-8"
          onClick={() => handleClick(label)}
        >
          front
        </div>
        <div
          className={`${
            matchedValue.includes(label) ? "bg-red-300" : "bg-gray-400"
          } w-24 text-center p-8`}
        >
          {label}
        </div>
      </ReactCardFlip>
    </>
  );
}
