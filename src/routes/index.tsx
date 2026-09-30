import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { Music, VolumeX } from "lucide-react";

import themeSong from "@/assets/birthday-song.mp3.asset.json";

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
    const audio = new Audio(themeSong.url);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const startOnAnyPress = () => {
      const a = audioRef.current;
      if (!a || a.paused) {
        fadeIn();
        setPlaying(true);
      }
    };
    document.addEventListener("pointerdown", startOnAnyPress);

    return () => {
      document.removeEventListener("pointerdown", startOnAnyPress);
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
              <motion.img
                src={card.image}
                alt={`Memory ${index + 1} of Ayomikun`}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                className="aspect-[4/5] w-full object-cover object-center sepia-[.3] contrast-[1.1] saturate-[.95]"
              />
              <span className="vignette" aria-hidden="true" />
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
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 rounded-full border border-ink/25 px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:bg-ink/5"
          aria-label={playing ? "Mute music" : "Play music"}
        >
          {playing ? <Music className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          {playing ? "Music on" : "Play music"}
        </button>
        <a
          href={`https://wa.me/2348121146922?text=${encodeURIComponent(
            "Hi! I just went through the birthday card you made for Ayomikun — it's beautiful 💛 Please recreate one like this for my loved ones!",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-ink/25 px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:bg-ink/5"
          aria-label="Recreate this for your loved ones — message on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.92 9.92 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.09c-.25.7-1.45 1.33-2 1.38-.51.05-1.16.07-1.87-.12-.43-.14-.99-.32-1.7-.63-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.28-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.07.92 2.22.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.37 1.47.3.15.47.13.65-.08.17-.2.75-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" />
          </svg>
          Recreate this for a loved one
        </a>
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ink/40">
          @ladoblow
        </p>
      </div>
    </main>
  );
}
