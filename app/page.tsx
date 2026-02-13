"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Custom CSS & Fonts ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Outfit:wght@300;400;600&display=swap');

    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      background-color: #0f0612;
    }

    .font-handwriting {
      font-family: 'Dancing Script', cursive;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    @keyframes floatUp {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
    }

    @keyframes heartbeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.1); }
      28% { transform: scale(1); }
      42% { transform: scale(1.1); }
      70% { transform: scale(1); }
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes slideInUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes confettiFall {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }

    .paper-texture {
      background-color: #fffdf5;
      background-image: radial-gradient(#e0dcd3 1px, transparent 1px);
      background-size: 20px 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 0 40px rgba(0,0,0,0.05);
    }

    .text-glow {
      text-shadow: 0 0 10px rgba(255, 107, 138, 0.6);
    }

    .cursor-heart {
      cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>❤️</text></svg>") 16 0, auto;
    }
  `}</style>
);

// ---- Background Effects ----
type Star = { id: number; top: string; left: string; size: string; delay: string; duration: string };

function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 3}s`,
        duration: `${Math.random() * 3 + 2}s`,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 120%, #4a0e2e 0%, transparent 60%)"
        }}
      />
    </div>
  );
}

type Heart = { id: number; left: number; size: number; duration: number; delay: number; emoji: string };

function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const emojis = ["\u2764\uFE0F", "\u{1F496}", "\u{1F495}", "\u{1F49E}", "\u{1F339}", "\u2728"];
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 20,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute opacity-40 bottom-[-50px]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
            transform: "translateY(110vh)",
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}

// ---- Confetti ----
function ConfettiExplosion() {
  const [particles, setParticles] = useState<
    { id: number; left: number; size: number; duration: number; delay: number; emoji: string }[]
  >([]);

  useEffect(() => {
    const emojis = ["\u2764\uFE0F", "\u{1F496}", "\u{1F495}", "\u2728", "\u{1F31F}", "\u{1F49D}", "\u{1F338}", "\u{1F339}", "\u{1F389}"];
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 28,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 2,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            top: "-5%",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

// ---- 1. The Envelope ----
function EnvelopeStage({ onOpen }: { onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 z-10 relative">
      <div
        className="text-center mb-12 transition-all duration-1000"
        style={{ opacity: isOpening ? 0 : 1 }}
      >
        <p className="text-pink-200 text-lg md:text-xl font-light tracking-widest uppercase mb-2">
          Ada sesuatu yang spesial
        </p>
        <h1 className="text-4xl md:text-5xl font-handwriting text-white text-glow">
          Buat Kamu, Bii
        </h1>
      </div>

      <div
        className="relative cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ transform: isOpening ? "scale(1.5) translateY(50px)" : "scale(1)", transition: "all 1s ease" }}
      >
        <div
          className="relative w-72 h-48 md:w-96 md:h-64 shadow-2xl rounded-lg transition-transform duration-500 ease-in-out"
          style={{
            background: "linear-gradient(135deg, #c0224a 0%, #911634 100%)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            transform: isHovered && !isOpening ? "translateY(-10px)" : "none",
          }}
        >
          {/* Flap */}
          <div
            className="absolute top-0 left-0 w-full h-full z-20 origin-top transition-all duration-1000"
            style={{
              clipPath: "polygon(0 0, 50% 50%, 100% 0)",
              background: "linear-gradient(180deg, #e8315b 0%, #c0224a 100%)",
              transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-pink-900 rounded-lg z-10" />
          <div
            className="absolute left-4 right-4 bg-white transition-all duration-1000"
            style={{
              top: isOpening ? "-60px" : "10px",
              bottom: "10px",
              borderRadius: "4px",
              opacity: isOpening ? 0 : 1,
              zIndex: 15,
            }}
          />
          {/* Bottom Pocket */}
          <div
            className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none"
            style={{
              clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
              background: "linear-gradient(0deg, #a01d3f 0%, #c0224a 100%)",
            }}
          />
          {/* Wax Seal */}
          <div
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-red-800 rounded-full z-30 flex items-center justify-center shadow-lg transition-all duration-500"
            style={{
              transform: `translate(-50%, -40%) ${isOpening ? "scale(0)" : "scale(1)"}`,
              border: "2px solid #7a1329",
              opacity: isOpening ? 0 : 1,
            }}
          >
            <span className="text-3xl text-red-200 drop-shadow-md">{"\u2764"}</span>
          </div>
        </div>
      </div>

      <p
        className="mt-12 text-pink-300/60 text-sm animate-pulse"
        style={{ opacity: isOpening ? 0 : 1 }}
      >
        Ketuk untuk membuka
      </p>
    </div>
  );
}

// ---- 2. The Love Letter with Typewriter ----
function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, 40);
    return () => clearInterval(timer);
  }, [text]);

  return <p>{displayedText}</p>;
}

function LetterStage({ onContinue }: { onContinue: () => void }) {
  const [textComplete, setTextComplete] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-20 relative">
      <div
        className="paper-texture max-w-lg w-full p-8 md:p-12 rounded-lg relative"
        style={{
          animation: "slideInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-200/50 to-transparent pointer-events-none" />

        <div className="font-handwriting text-gray-800 text-xl md:text-2xl leading-relaxed">
          <p className="mb-6 text-pink-600 font-bold">Bii sayang,</p>

          <div className="min-h-[200px]">
            <TypewriterText
              text="Setiap hari bersamamu terasa kayak mimpi yang nggak pernah aku mau bangun. Kamu bikin dunia programingku lebih berwarna, hatiku lebih penuh, dan hidupku jauh lebih berarti dari yang pernah aku bayangkan. Aku bersyukur banget punya kamu."
              onComplete={() => setTextComplete(true)}
            />
          </div>

          <div className={`mt-8 text-right transition-opacity duration-1000 ${textComplete ? "opacity-100" : "opacity-0"}`}>
            <p className="text-pink-600 font-bold">Selalu milikmu,</p>
            <p className="text-2xl mt-2">{"\u2764\uFE0F"}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!textComplete}
        className={`mt-10 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold tracking-wide transition-all duration-500 hover:bg-pink-500/20 hover:scale-105 flex items-center gap-2 ${textComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <span>Lanjut</span>
        <span>{"\u2192"}</span>
      </button>
    </div>
  );
}

// ---- 3. Reasons I Love You ----
function ReasonsStage({ onContinue }: { onContinue: () => void }) {
  const reasons = [
    { icon: "\u{1F31F}", title: "Senyummu", desc: "Senyummu itu satu-satunya hal yang bisa bikin hariku langsung cerah." },
    { icon: "\u{1F60A}", title: "Tawamu", desc: "Ketawamu itu lagu favorit yang nggak pernah bosen aku dengerin." },
    { icon: "\u{1F917}", title: "Pelukanmu", desc: "Dipeluk kamu tuh rasanya kayak pulang ke rumah yang paling nyaman." },
    { icon: "\u{1F9E1}", title: "Hatimu", desc: "Kebaikan hatimu itu bikin aku jadi pengen jadi orang yang lebih baik." },
    { icon: "\u{1F4AA}", title: "Semangatmu", desc: "Kamu selalu percaya sama aku, bahkan di saat aku ragu sama diri sendiri." },
    { icon: "\u{1F60D}", title: "Semuanya", desc: "Pokoknya semua yang ada di kamu, aku suka. Titik." },
  ];

  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndex((prev) => {
        if (prev >= reasons.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [reasons.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 z-10 relative">
      <h2
        className="text-3xl md:text-4xl font-bold text-white mb-10 text-center text-glow"
        style={{ animation: "slideInUp 0.8s ease-out" }}
      >
        Kenapa Aku Sayang Kamu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {reasons.map((r, i) => (
          <div
            key={i}
            className={`glass-panel p-6 rounded-xl flex items-start gap-4 transition-all duration-700 transform hover:scale-105 hover:bg-white/10 border-l-4 border-pink-500 ${i <= visibleIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <span className="text-3xl drop-shadow-lg">{r.icon}</span>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{r.title}</h3>
              <p className="text-pink-100/80 text-sm leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-12 transition-all duration-1000 ${visibleIndex >= reasons.length ? "opacity-100" : "opacity-0"}`}>
        <button
          onClick={onContinue}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transform hover:-translate-y-1 transition-all cursor-pointer"
        >
          Satu hal lagi...
        </button>
      </div>
    </div>
  );
}

// ---- 4. The Big Question ----
function ProposalStage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnOffset, setNoBtnOffset] = useState({ x: 0, y: 0 });

  const noPhrases = [
    "Nggak",
    "Yakin nih?",
    "Beneran?",
    "Pikir lagi dong!",
    "Kesempatan terakhir!",
    "Kamu tega? \u{1F494}",
    "Pencet YES aja!",
    "Please? \u{1F97A}",
  ];

  const handleNo = useCallback(() => {
    setNoBtnOffset({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
    });
    setNoCount((prev) => (prev + 1) % noPhrases.length);
  }, [noPhrases.length]);

  if (yesPressed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 z-20 text-center">
        <ConfettiExplosion />
        <div style={{ animation: "slideInUp 0.6s ease-out" }}>
          <h1 className="text-6xl md:text-8xl mb-6 animate-bounce">{"\u{1F496}"}</h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-glow">
            YAAAY!
          </h2>
          <p className="text-xl md:text-2xl text-pink-200 font-light mb-2">
            Biiii, kamu bikin aku jadi orang
          </p>
          <p className="text-xl md:text-2xl text-pink-200 font-light mb-6">
            paling bahagia sedunia!
          </p>
          <div className="mt-4 glass-panel p-6 rounded-2xl max-w-md mx-auto">
            <p className="text-lg text-pink-100 font-handwriting text-2xl md:text-3xl leading-relaxed">
              Aku pingin kita naik level bareng-bareng {"\u{1F680}"}
            </p>
          </div>
          <p className="mt-8 text-white/60 font-handwriting text-2xl">
            Happy Valentine&apos;s Day, sayangku {"\u2764\uFE0F"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 z-20 text-center relative overflow-hidden">
      <div className="glass-panel p-10 rounded-2xl max-w-2xl w-full" style={{ animation: "slideInUp 0.8s ease-out" }}>
        <span className="text-6xl block mb-6 animate-pulse">{"\u{1F49D}"}</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight">
          will you be my <br />
          <span className="text-pink-500 font-handwriting text-5xl md:text-7xl">Valentine?</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative h-32">
          <button
            onClick={() => setYesPressed(true)}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xl font-bold shadow-lg shadow-pink-600/40 hover:shadow-pink-600/60 hover:scale-110 transition-all transform z-10 cursor-pointer"
          >
            MAU! {"\u{1F496}"}
          </button>

          <button
            onMouseEnter={handleNo}
            onClick={handleNo}
            className="px-10 py-4 rounded-full bg-gray-800/50 text-gray-300 font-semibold border border-gray-600 hover:bg-gray-800 transition-all z-0 cursor-pointer"
            style={{
              position: "relative" as const,
              transform: `translate(${noBtnOffset.x}px, ${noBtnOffset.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {noPhrases[noCount]}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main App ----
export default function ValentineApp() {
  const [stage, setStage] = useState(0);

  return (
    <div className="cursor-heart">
      <GlobalStyles />
      <StarryBackground />
      <FloatingHearts />

      <main className="relative min-h-screen w-full flex flex-col">
        {stage === 0 && <EnvelopeStage onOpen={() => setStage(1)} />}
        {stage === 1 && <LetterStage onContinue={() => setStage(2)} />}
        {stage === 2 && <ReasonsStage onContinue={() => setStage(3)} />}
        {stage === 3 && <ProposalStage />}
      </main>

      {/* Progress Dots */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2 z-50 pointer-events-none">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-500 ${stage === s ? "w-8 bg-pink-500" : "w-2 bg-white/20"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
