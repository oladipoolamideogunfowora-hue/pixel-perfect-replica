import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { Music, VolumeX } from "lucide-react";

import themeSong from "@/assets/birthday-theme.mp3";

import card1 from "@/assets/card1.jpg.asset.json";
import card2 from "@/assets/card2.jpg.asset.json";
import card3 from "@/assets/card3.jpg.asset.json";
import card4 from "@/assets/card4.jpg.asset.json";
import card5 from "@/assets/card5.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Ayomikun" },
      {
        name: "description",
        content:
          "A little flip-through birthday card for Ayomikun — five photos, five messages, one very happy new year of life.",
      },
      { property: "og:title", content: "Happy Birthday, Ayomikun" },
      {
        property: "og:description",
        content: "Five photos, five messages, one very happy new year of life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const cards = [
  {
    image: card1.url,
    script: "Happy",
    headline: "Birthday",
    message:
      "Happy Birthday, Ayomikun! I wanted to take a moment today to remind you how special you are.",
  },
  {
    image: card2.url,
    script: "Thank",
    headline: "You",
    message:
      "Thank you for the food, the love, and everything in between — your kindness means the world to me, and I'll never forget it.",
  },
  {
    image: card3.url,
    script: "That",
    headline: "Smile",
    message:
      "Your smile is so contagious, and I genuinely love the energy you bring whenever you are around.",
  },
  {
    image: card4.url,
    script: "So much",
    headline: "Greatness",
    message:
      "I see so much ambition and greatness in you. My biggest prayer for you this new year is that you realize just how capable you are...",
  },
  {
    image: card5.url,
    script: "Go",
    headline: "Shine",
    message:
      "...and step fully into the incredible potential God has placed inside you. Don't be afraid to push yourself out there! I'm always in your corner cheering you on. Have the absolute best birthday.",
  },
];

function Index() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const card = cards[index]!;
  const isLast = index === cards.length - 1;

  useEffect(() => {
    const audio = new Audio(themeSong);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play();
    let v = 0;
    const tick = setInterval(() => {
      v += 0.05;
      if (v >= 0.7) {
        v = 0.7;
        clearInterval(tick);
      }
      audio.volume = v;
    }, 100);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      fadeIn();
      setPlaying(true);
    }
  };

  const handleNext = () => {
    if (!playing) {
      fadeIn();
      setPlaying(true);
    }
    if (isLast) {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.7 },
        colors: ["#d94523", "#e8743b", "#2b2320", "#f4ece1"],
      });
      return;
    }
    setIndex((i) => i + 1);
  };

  return (
    <main className="paper relative flex min-h-screen flex-col items-center overflow-hidden px-5 py-8">
      <span className="watermark pointer-events-none absolute -left-6 top-24 select-none">
        Happy
      </span>
      <span className="edge-text pointer-events-none absolute bottom-24 left-0 select-none">
        FOR AYOMIKUN · WITH LOVE
      </span>

      <p className="relative z-10 text-center text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-ink/80">
        Wishing you the best of the best
      </p>
      <p className="relative z-10 mt-1 text-center text-[0.55rem] font-bold uppercase tracking-[0.22em] text-ink/60">
        in this new year of your life
      </p>

      <div className="relative z-10 mt-6 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-end justify-center gap-2">
              <span className="script -mb-3 text-4xl text-ink">{card.script}</span>
              <span className="stacked text-5xl">{card.headline}</span>
            </div>

            <div className="photo-frame mt-5 w-full">
              <img
                src={card.image}
                alt={`Memory ${index + 1} of Ayomikun`}
                className="aspect-[4/5] w-full object-cover object-center sepia-[.3] contrast-[1.1] saturate-[.95]"
              />
              <span className="halftone" aria-hidden="true" />
            </div>

            <p className="mt-5 max-w-[19rem] text-center text-[0.95rem] font-semibold leading-relaxed text-ink">
              {card.message}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-7 flex flex-col items-center gap-4 pb-10">
        <button onClick={handleNext} className="stamp-btn">
          {isLast ? "Finish 🎉" : "Next ➔"}
        </button>
        <div className="flex gap-2">
          {cards.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand" : "w-1.5 bg-ink/25"
              }`}
            />
          ))}
        </div>
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink/40">
          @ladoblow
        </p>
      </div>
    </main>
  );
}
