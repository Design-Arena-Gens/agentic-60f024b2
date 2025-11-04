"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type FurOption = {
  id: string;
  label: string;
  fur: string;
  accent: string;
  pattern: "tabby" | "cloudy" | "mask" | "plain";
  description: string;
};

type EyeOption = {
  id: string;
  label: string;
  iris: string;
  pupil: string;
  sparkle: string;
  vibe: string;
};

type AccessoryOption = {
  id: string;
  label: string;
  accent: string;
  description: string;
};

type MagicTheme = {
  id: string;
  label: string;
  gradient: string;
  aura: string;
  glow: string;
  whisper: string;
  tagline: string;
  highlight: string;
};

type ScenePreset = {
  fur: FurOption["id"];
  eyes: EyeOption["id"];
  accessory: AccessoryOption["id"];
  theme: MagicTheme["id"];
  sparkle: number;
};

type SceneCard = {
  id: string;
  title: string;
  subtitle: string;
  dialogue: string;
  vibe: string;
  preset: ScenePreset;
};

const furOptions: FurOption[] = [
  {
    id: "sunny-tabby",
    label: "Sunny Tabby",
    fur: "#f7b733",
    accent: "#ffe8b3",
    pattern: "tabby",
    description: "Dilli ki dhoop vibes, full-on warm energy.",
  },
  {
    id: "midnight-lilac",
    label: "Midnight Lilac",
    fur: "#6b46c1",
    accent: "#b794f4",
    pattern: "mask",
    description: "Raat ki party queen, soft but mysterious.",
  },
  {
    id: "cloud-soft",
    label: "Cloudy Mishti",
    fur: "#f1f5f9",
    accent: "#e2e8f0",
    pattern: "cloudy",
    description: "Dreamy soft focus, Insta reel ke liye perfect.",
  },
  {
    id: "chai-russet",
    label: "Masala Chai",
    fur: "#c2410c",
    accent: "#fbd1a2",
    pattern: "plain",
    description: "Masaledaar charisma, bazaar ki jaan.",
  },
];

const eyeOptions: EyeOption[] = [
  {
    id: "mischief",
    label: "Naughty Nazar",
    iris: "#1f2937",
    pupil: "#0b1120",
    sparkle: "#facc15",
    vibe: "Thoda shaitaan, thoda charming – crowd favourite.",
  },
  {
    id: "dreamy",
    label: "Sapno Wali",
    iris: "#2563eb",
    pupil: "#172554",
    sparkle: "#bfdbfe",
    vibe: "Soft-focus drishti, lo-fi lullaby energy.",
  },
  {
    id: "focus",
    label: "Laser Focus",
    iris: "#047857",
    pupil: "#064e3b",
    sparkle: "#34d399",
    vibe: "Mission-ready look, reel transitions ke liye crisp.",
  },
];

const accessoryOptions: AccessoryOption[] = [
  {
    id: "dholak",
    label: "Neon Dholak",
    accent: "#fb7185",
    description: "Beat drop karne ka asli jugaad – dhamaakedaar bass.",
  },
  {
    id: "ghungroo",
    label: "Stellar Ghungroo",
    accent: "#facc15",
    description: "Har step pe cham-cham sparkle, vibe set ho jaati hai.",
  },
  {
    id: "yaar-bandana",
    label: "Yaaron Ka Bandana",
    accent: "#22d3ee",
    description: "Street style + jadui swish, reels ready finish.",
  },
];

const magicThemes: MagicTheme[] = [
  {
    id: "gulabo-neon",
    label: "Gulabo Neon Bazaar",
    gradient:
      "radial-gradient(circle at 20% 20%, rgba(251, 113, 133, 0.55), transparent 60%), radial-gradient(circle at 80% 15%, rgba(190, 242, 100, 0.45), transparent 55%), linear-gradient(135deg, #1d1b4c, #111827 75%)",
    aura: "radial-gradient(circle, rgba(244, 114, 182, 0.5), transparent 70%)",
    glow: "#f472b6",
    whisper: "Arre yeh bazaar wali chamak, sabko khush karegi.",
    tagline: "Sehri se shaam tak, humare cat-star ki full-on entry.",
    highlight: "#fde68a",
  },
  {
    id: "chandni-meadow",
    label: "Chandni Meadow Chill",
    gradient:
      "radial-gradient(circle at 15% 30%, rgba(192, 38, 211, 0.4), transparent 58%), radial-gradient(circle at 70% 20%, rgba(56, 189, 248, 0.45), transparent 50%), linear-gradient(135deg, #0f172a, #1e293b 72%)",
    aura: "radial-gradient(circle, rgba(244, 114, 182, 0.4), transparent 70%)",
    glow: "#60a5fa",
    whisper: "Meadow ki hawa + chandni ka jadoo = perfect calm.",
    tagline: "Midnight kahaani, slow-mo transitions ke liye best.",
    highlight: "#bae6fd",
  },
  {
    id: "monsoon-masala",
    label: "Monsoon Masala Pop",
    gradient:
      "radial-gradient(circle at 25% 25%, rgba(45, 212, 191, 0.55), transparent 60%), radial-gradient(circle at 75% 25%, rgba(14, 165, 233, 0.42), transparent 55%), linear-gradient(140deg, #111827, #0f172a 65%)",
    aura: "radial-gradient(circle, rgba(59, 130, 246, 0.45), transparent 70%)",
    glow: "#2dd4bf",
    whisper: "Barish ke boondein, neon lights aur ek jadu bhari purr.",
    tagline: "Rain-kissed palette, transition edits ke liye addictive.",
    highlight: "#a7f3d0",
  },
];

const sceneCards: SceneCard[] = [
  {
    id: "gully-gig",
    title: "Gully Gig Premiere",
    subtitle: "Shaam ke golden hour mein setup ready.",
    dialogue:
      "“Yo doston, OP miaow energy ready? Dholak drop pe log full crowd-surf karenge!”",
    vibe: "Street pop dhamaal, beat-synced lighting.",
    preset: {
      fur: "sunny-tabby",
      eyes: "mischief",
      accessory: "dholak",
      theme: "gulabo-neon",
      sparkle: 72,
    },
  },
  {
    id: "moon-poetry",
    title: "Moonlit Shaayari",
    subtitle: "Slow lo-fi ke saath soft purr poetry.",
    dialogue:
      "“Suno ji, chaand bhi blush kar raha jab hum spotlight mein itna glow kar rahe.”",
    vibe: "Dream-pop lullaby, velvet transitions.",
    preset: {
      fur: "midnight-lilac",
      eyes: "dreamy",
      accessory: "ghungroo",
      theme: "chandni-meadow",
      sparkle: 58,
    },
  },
  {
    id: "rain-battle",
    title: "Rain Battle Remix",
    subtitle: "Monsoon drops + whistle beats = virality.",
    dialogue:
      "“Arre phir se rewind karo! Ye drip-shot Insta pe 1M tak jayega, likh lo.”",
    vibe: "Hyper groove, splash transitions full power.",
    preset: {
      fur: "chai-russet",
      eyes: "focus",
      accessory: "yaar-bandana",
      theme: "monsoon-masala",
      sparkle: 86,
    },
  },
];

export default function Home() {
  const [furChoice, setFurChoice] = useState<FurOption>(furOptions[0]);
  const [eyesChoice, setEyesChoice] = useState<EyeOption>(eyeOptions[0]);
  const [accessoryChoice, setAccessoryChoice] = useState<AccessoryOption>(
    accessoryOptions[0],
  );
  const [magicThemeChoice, setMagicThemeChoice] = useState<MagicTheme>(
    magicThemes[0],
  );
  const [sparkleIntensity, setSparkleIntensity] = useState<number>(70);
  const [activeSceneId, setActiveSceneId] = useState<string>(sceneCards[0].id);

  const activeScene = useMemo(
    () => sceneCards.find((scene) => scene.id === activeSceneId) ?? sceneCards[0],
    [activeSceneId],
  );

  const handleSceneSelect = (scene: SceneCard) => {
    setActiveSceneId(scene.id);
    const furPreset = furOptions.find((item) => item.id === scene.preset.fur);
    const eyePreset = eyeOptions.find((item) => item.id === scene.preset.eyes);
    const accessoryPreset = accessoryOptions.find(
      (item) => item.id === scene.preset.accessory,
    );
    const themePreset = magicThemes.find((item) => item.id === scene.preset.theme);

    if (furPreset) setFurChoice(furPreset);
    if (eyePreset) setEyesChoice(eyePreset);
    if (accessoryPreset) setAccessoryChoice(accessoryPreset);
    if (themePreset) setMagicThemeChoice(themePreset);
    setSparkleIntensity(scene.preset.sparkle);
  };

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 text-white sm:px-10 lg:px-16">
      <BackdropAurora />
      <header className="relative z-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white/80 shadow-lg backdrop-blur">
          Hindish Toon Lab
          <span className="h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_12px_4px_rgba(110,231,183,0.55)]" />
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          Miaow Magic Studio –{" "}
          <span className="text-emerald-200">
            Hindish{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 via-amber-200 to-sky-200 bg-clip-text text-transparent">
              cartoon cats
            </span>
          </span>{" "}
          jo screen pe seedha dil jeet lete hain.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          Crowd ko engage rakhne ke liye banaya gaya ek interactive edit board –
          fur tone se le kar magic glow tak sab customize karo aur instant
          reel-ready scenes render karo.
        </p>
      </header>

      <section className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <CatStage
          fur={furChoice}
          eyes={eyesChoice}
          accessory={accessoryChoice}
          theme={magicThemeChoice}
          sparkleIntensity={sparkleIntensity}
          scene={activeScene}
        />
        <MagicEditor
          fur={furChoice}
          eyes={eyesChoice}
          accessory={accessoryChoice}
          theme={magicThemeChoice}
          sparkleIntensity={sparkleIntensity}
          onFurChange={setFurChoice}
          onEyesChange={setEyesChoice}
          onAccessoryChange={setAccessoryChoice}
          onThemeChange={setMagicThemeChoice}
          onSparkleChange={setSparkleIntensity}
        />
      </section>

      <section className="relative z-10">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold text-white lg:text-4xl">
            Scene Switcher
          </h2>
          <span className="text-sm uppercase tracking-[0.3em] text-white/60">
            tap se instant preset
          </span>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {sceneCards.map((scene) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => handleSceneSelect(scene)}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                activeSceneId === scene.id ? "border-emerald-300/70 bg-white/15" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <div className="relative z-10 space-y-3">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-100">
                  {scene.vibe}
                </span>
                <h3 className="text-xl font-semibold text-white">{scene.title}</h3>
                <p className="text-sm text-white/80">{scene.subtitle}</p>
                <p className="text-sm italic text-white/70">&ldquo;{scene.dialogue}&rdquo;</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

type CatStageProps = {
  fur: FurOption;
  eyes: EyeOption;
  accessory: AccessoryOption;
  theme: MagicTheme;
  sparkleIntensity: number;
  scene: SceneCard;
};

const CatStage = ({
  fur,
  eyes,
  accessory,
  theme,
  sparkleIntensity,
  scene,
}: CatStageProps) => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/50 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.5)] backdrop-blur-xl"
      style={{ backgroundImage: theme.gradient }}
    >
      <div className="absolute inset-0 translate-y-10 scale-110 opacity-70 blur-3xl">
        <div
          className="glow-ring"
          style={{
            background: theme.aura,
          }}
        />
      </div>
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
        <div className="relative flex items-center justify-center">
          <div className="floating rounded-[40%_60%_55%_45%_/_50%_40%_60%_50%] bg-black/30 px-10 py-8 shadow-[0_25px_80px_rgba(15,23,42,0.65)] backdrop-blur-sm">
            <CatIllustration
              fur={fur}
              eyes={eyes}
              accessory={accessory}
              highlightColor={theme.highlight}
            />
            <SparkleField
              intensity={sparkleIntensity}
              color={theme.glow}
              auraTone={theme.highlight}
            />
          </div>
        </div>

        <aside className="space-y-6 rounded-2xl bg-black/35 p-6 backdrop-blur">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
            scene memo
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
          </span>
          <h3 className="text-2xl font-semibold text-white">{scene.title}</h3>
          <p className="text-sm text-white/80">{scene.subtitle}</p>
          <p className="rounded-xl border border-white/10 bg-white/10 p-4 text-sm italic text-white/75">
            {scene.dialogue}
          </p>
          <div className="space-y-4 text-sm text-white/70">
            <FeatureRow label="Magic Mood" value={theme.label} />
            <FeatureRow label="Fur Aura" value={fur.label} />
            <FeatureRow label="Eyes Speak" value={eyes.label} />
            <FeatureRow label="Accessory Flex" value={accessory.label} />
          </div>
          <p className="rounded-xl border border-emerald-200/30 bg-emerald-200/10 p-4 text-sm text-emerald-100">
            {theme.whisper}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            {theme.tagline}
          </p>
        </aside>
      </div>
    </div>
  );
};

const FeatureRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-white/50">{label}</span>
    <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
      {value}
    </span>
  </div>
);

type CatIllustrationProps = {
  fur: FurOption;
  eyes: EyeOption;
  accessory: AccessoryOption;
  highlightColor: string;
};

const CatIllustration = ({
  fur,
  eyes,
  accessory,
  highlightColor,
}: CatIllustrationProps) => {
  const accentTone = fur.accent;

  return (
    <div className="relative flex h-[360px] w-[300px] items-center justify-center">
      <div
        className="absolute inset-x-12 bottom-0 h-8 rounded-full bg-black/50 blur-2xl"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 320 360"
        role="img"
        aria-label={`${fur.label} cat with ${accessory.label}`}
        className="relative z-10 h-full w-full drop-shadow-[0_35px_80px_rgba(148,163,184,0.45)]"
      >
        <defs>
          <radialGradient id="bellyGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={accentTone} />
            <stop offset="100%" stopColor={fur.fur} />
          </radialGradient>
          <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="100%" stopColor={fur.fur} />
          </linearGradient>
          <filter id="soft-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#soft-glow)">
          <ellipse
            cx={160}
            cy={250}
            rx={100}
            ry={85}
            fill="url(#bellyGradient)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={3}
          />
          <path
            d="M100 140 Q160 80 220 140"
            fill={fur.fur}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx={160} cy={165} rx={75} ry={70} fill={fur.fur} />
          <path
            d="M95 142 C85 90 115 70 140 110"
            fill="url(#earGradient)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={2}
          />
          <path
            d="M225 142 C235 90 205 70 180 110"
            fill="url(#earGradient)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={2}
          />
          {fur.pattern === "tabby" && (
            <g stroke="rgba(0,0,0,0.15)" strokeWidth={6} strokeLinecap="round">
              <path d="M120 150 Q140 140 160 155" />
              <path d="M200 150 Q180 138 160 155" />
              <path d="M130 210 Q160 220 190 210" />
            </g>
          )}
          {fur.pattern === "cloudy" && (
            <g fill="rgba(255,255,255,0.5)">
              <ellipse cx={130} cy={200} rx={28} ry={18} />
              <ellipse cx={190} cy={215} rx={32} ry={20} />
            </g>
          )}
          {fur.pattern === "mask" && (
            <path
              d="M95 170 Q160 130 225 170 L225 200 Q160 170 95 200 Z"
              fill="rgba(15,23,42,0.35)"
            />
          )}
          <CatFace eyes={eyes} highlightColor={highlightColor} />
        </g>
        <AccessoryGraphic accessory={accessory} accentTone={highlightColor} />
      </svg>
    </div>
  );
};

const CatFace = ({
  eyes,
  highlightColor,
}: {
  eyes: EyeOption;
  highlightColor: string;
}) => {
  return (
    <g>
      <ellipse cx={120} cy={175} rx={24} ry={30} fill={eyes.iris} />
      <ellipse cx={200} cy={175} rx={24} ry={30} fill={eyes.iris} />
      <ellipse cx={120} cy={175} rx={10} ry={22} fill={eyes.pupil} />
      <ellipse cx={200} cy={175} rx={10} ry={22} fill={eyes.pupil} />
      <circle cx={125} cy={168} r={5} fill={eyes.sparkle} opacity={0.9} />
      <circle cx={205} cy={168} r={5} fill={eyes.sparkle} opacity={0.9} />
      <path
        d="M120 210 C150 225 170 225 200 210"
        stroke={highlightColor}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.5}
      />
      <path
        d="M150 210 Q160 220 170 210"
        stroke="#1f2937"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <ellipse cx={160} cy={205} rx={10} ry={6} fill="#ef4444" opacity={0.7} />
    </g>
  );
};

const AccessoryGraphic = ({
  accessory,
  accentTone,
}: {
  accessory: AccessoryOption;
  accentTone: string;
}) => {
  switch (accessory.id) {
    case "dholak":
      return (
        <g className="floating-delayed">
          <rect
            x={90}
            y={250}
            width={140}
            height={48}
            rx={20}
            fill="rgba(15,23,42,0.65)"
          />
          <rect
            x={95}
            y={252}
            width={130}
            height={44}
            rx={18}
            fill={accessory.accent}
          />
          <g stroke={accentTone} strokeWidth={3}>
            <line x1={110} y1={255} x2={160} y2={295} />
            <line x1={140} y1={255} x2={190} y2={295} />
            <line x1={170} y1={255} x2={220} y2={295} />
          </g>
        </g>
      );
    case "ghungroo":
      return (
        <g className="floating-delayed" fill={accessory.accent}>
          {Array.from({ length: 6 }).map((_, index) => (
            <circle
              key={`ghungroo-${index}`}
              cx={110 + index * 26}
              cy={260 + (index % 2 === 0 ? 8 : -4)}
              r={10}
              opacity={0.85}
            />
          ))}
          <path
            d="M95 240 Q160 220 225 240"
            stroke={accentTone}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      );
    case "yaar-bandana":
      return (
        <g className="floating-delayed">
          <path
            d="M70 240 Q160 210 250 240 L160 290 Z"
            fill={accessory.accent}
            opacity={0.85}
          />
          <path
            d="M130 245 L110 290"
            stroke={accentTone}
            strokeDasharray="6 4"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <path
            d="M190 245 L210 292"
            stroke={accentTone}
            strokeDasharray="6 4"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      );
    default:
      return null;
  }
};

type MagicEditorProps = {
  fur: FurOption;
  eyes: EyeOption;
  accessory: AccessoryOption;
  theme: MagicTheme;
  sparkleIntensity: number;
  onFurChange: (option: FurOption) => void;
  onEyesChange: (option: EyeOption) => void;
  onAccessoryChange: (option: AccessoryOption) => void;
  onThemeChange: (option: MagicTheme) => void;
  onSparkleChange: (intensity: number) => void;
};

const MagicEditor = ({
  fur,
  eyes,
  accessory,
  theme,
  sparkleIntensity,
  onFurChange,
  onEyesChange,
  onAccessoryChange,
  onThemeChange,
  onSparkleChange,
}: MagicEditorProps) => {
  return (
    <div className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/45 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.4)] backdrop-blur">
      <h2 className="text-2xl font-semibold text-white">
        Magical Edit Console
      </h2>
      <ControlGroup title="Fur Palette" subtitle="Texture pick karo, vibe set karo.">
        <div className="grid gap-3 sm:grid-cols-2">
          {furOptions.map((option) => (
            <PaletteButton
              key={option.id}
              selected={fur.id === option.id}
              onClick={() => onFurChange(option)}
              tone={option.fur}
              accent={option.accent}
              label={option.label}
              description={option.description}
            />
          ))}
        </div>
      </ControlGroup>

      <ControlGroup
        title="Eye Expression"
        subtitle="Expressions se storytelling upgrade karo."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {eyeOptions.map((option) => (
            <FocusChip
              key={option.id}
              selected={eyes.id === option.id}
              label={option.label}
              description={option.vibe}
              onClick={() => onEyesChange(option)}
            />
          ))}
        </div>
      </ControlGroup>

      <ControlGroup
        title="Accessory Flex"
        subtitle="Ek prop aur brand-new engagement."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {accessoryOptions.map((option) => (
            <FocusChip
              key={option.id}
              selected={accessory.id === option.id}
              label={option.label}
              description={option.description}
              onClick={() => onAccessoryChange(option)}
            />
          ))}
        </div>
      </ControlGroup>

      <ControlGroup
        title="Magic Mood"
        subtitle="Lighting aur glow wave align karo."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {magicThemes.map((option) => (
            <ColorPanel
              key={option.id}
              selected={theme.id === option.id}
              label={option.label}
              tagline={option.tagline}
              gradient={option.gradient}
              onClick={() => onThemeChange(option)}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <label
            htmlFor="sparkle-range"
            className="flex items-center justify-between text-sm text-white/70"
          >
            Sparkle Intensity
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-emerald-200">
              {sparkleIntensity}%
            </span>
          </label>
          <input
            id="sparkle-range"
            type="range"
            min={30}
            max={100}
            step={2}
            value={sparkleIntensity}
            onChange={(event) => onSparkleChange(Number(event.target.value))}
            className="h-2 w-full appearance-none rounded-full bg-white/10 accent-emerald-300"
          />
          <p className="text-xs text-white/60">
            Low intensity for subtle shimmer, ya phir 100% pe stage breaker
            glitter bomb.
          </p>
        </div>
      </ControlGroup>
    </div>
  );
};

const ControlGroup = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => (
  <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{subtitle}</p>
    </div>
    {children}
  </section>
);

const PaletteButton = ({
  selected,
  onClick,
  tone,
  accent,
  label,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  tone: string;
  accent: string;
  label: string;
  description: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-4 rounded-2xl border border-white/15 bg-black/30 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
      selected ? "border-emerald-200 bg-emerald-200/10" : ""
    }`}
  >
    <span
      className="grid h-12 w-12 place-items-center rounded-xl shadow-[0_10px_30px_rgba(15,23,42,0.45)]"
      style={{
        background: `linear-gradient(135deg, ${tone}, ${accent})`,
      }}
    />
    <div>
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-xs text-white/60">{description}</p>
    </div>
  </button>
);

const FocusChip = ({
  selected,
  label,
  description,
  onClick,
}: {
  selected: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-full flex-col justify-between gap-3 rounded-2xl border border-white/15 bg-black/30 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
      selected ? "border-emerald-200 bg-emerald-200/10" : ""
    }`}
  >
    <div>
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-xs text-white/60">{description}</p>
    </div>
  </button>
);

const ColorPanel = ({
  selected,
  label,
  tagline,
  gradient,
  onClick,
}: {
  selected: boolean;
  label: string;
  tagline: string;
  gradient: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-full flex-col justify-between gap-4 rounded-2xl border border-white/15 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
      selected ? "border-emerald-200 bg-emerald-200/10" : "bg-black/30"
    }`}
    style={{
      backgroundImage: gradient,
      backgroundBlendMode: "screen",
    }}
  >
    <div>
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-xs text-white/70">{tagline}</p>
    </div>
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
      activate
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
    </span>
  </button>
);

const SparkleField = ({
  intensity,
  color,
  auraTone,
}: {
  intensity: number;
  color: string;
  auraTone: string;
}) => {
  const [sparkles, setSparkles] = useState(() =>
    generateSparkles(intensity, color),
  );

  useEffect(() => {
    setSparkles(generateSparkles(intensity, color));
  }, [intensity, color]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-8 rounded-[45%_55%_50%_50%_/_50%_50%_55%_45%]"
        style={{
          background: `radial-gradient(circle, ${auraTone}33, transparent 70%)`,
        }}
      />
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            animationDelay: `${sparkle.delay}s`,
            transform: `scale(${sparkle.scale})`,
          }}
        />
      ))}
    </div>
  );
};

const generateSparkles = (intensity: number, color: string) => {
  const count = Math.max(6, Math.round((intensity / 100) * 26));
  return Array.from({ length: count }).map((_, index) => ({
    id: `${color}-${intensity}-${index}`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    scale: 0.6 + Math.random() * 1.4,
    delay: Math.random() * 3.5,
  }));
};

const BackdropAurora = () => (
  <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
    <div className="absolute right-[-10%] top-[-25%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
    <div className="absolute left-[-15%] top-[20%] h-[380px] w-[380px] rounded-full bg-emerald-400/20 blur-[160px]" />
    <div className="absolute left-[35%] bottom-[-30%] h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-[180px]" />
  </div>
);
