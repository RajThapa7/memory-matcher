"use client";
import Image, { StaticImageData } from "next/image";
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
  image: StaticImageData;
  playGameEndSound: any;
  isCardFlipped: boolean;
}

const delay = (timeInMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

export default function SingleCard({
  activeCard,
  image,
  setActiveCard,
  cardId,
  playGameEndSound,
  label,
  matchedValue,
  setMatchedValue,
  setMoves,
  stopTimer,
  totalLength,
  isCardFlipped,
}: ISingleCardProps) {
  const [isFlipped, setIsFlipped] = useState(isCardFlipped);

  const [play] = useSound("/music/card_flip.ogg");
  const [playSuccess] = useSound("/music/success_sound.wav");

  useEffect(() => {
    if (matchedValue.length === totalLength / 2) {
      playGameEndSound();
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
    playGameEndSound,
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
          className="bg-gray-600 w-32 h-32 rounded-md bg-[#262f70]/20 p-7 backdrop-blur-2xl after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-br after:from-white/60 after:via-white/40 after:to-white/60"
          onClick={() => handleClick(label)}
        ></div>
        <div
          className={`${
            matchedValue.includes(label)
              ? "from-green-100 via-green-300 to-green-100"
              : " from-white/90 via-white to-white/90 "
          } w-32 h-32 text-center p-0 relative rounded-md bg-gradient-to-br backdrop-blur-2xl`}
        >
          <Image src={image} alt="image" fill className="w-full h-full" />
          <span className="hidden">{label}</span>
        </div>
      </ReactCardFlip>
    </>
  );
}
