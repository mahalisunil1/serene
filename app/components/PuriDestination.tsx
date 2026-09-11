"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Compass,
  MapPin,
  Sparkles,
  Car,
  Clock,
  Volume2,
  Check,
  BookOpen,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import PattachitraFrame from "./pattachitra/PattachitraFrame";
import TemplePattachitra from "./pattachitra/TemplePattachitra";
import SeaPattachitra from "./pattachitra/SeaPattachitra";
import KonarkPattachitra from "./pattachitra/KonarkPattachitra";

gsap.registerPlugin(ScrollTrigger);

interface PuriDestinationProps {
  onOpenBooking?: () => void;
}

export default function PuriDestination({ onOpenBooking }: PuriDestinationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Chapter section references for smooth scroll and GSAP scroll animations
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);

  // Interactive secret selections per chapter
  const [act1SecretId, setAct1SecretId] = useState<string>("dawn");
  const [act2SecretId, setAct2SecretId] = useState<string>("flag");
  const [act3SecretId, setAct3SecretId] = useState<string>("wheel");

  // Play a soft ceremonial bronze bell chime on interaction using Web Audio API
  const playSacredChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(528, now);
      osc1.frequency.exponentialRampToValueAtTime(523, now + 1.8);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1056, now);
      osc2.frequency.exponentialRampToValueAtTime(1046, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.1);
      osc2.stop(now + 2.1);
    } catch {
      // Audio policy
    }
  }, []);

  // Smooth scroll to a specific chapter
  const scrollToChapter = (ref: React.RefObject<HTMLDivElement | null>) => {
    playSacredChime();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // The Three Sacred Acts Data
  const act1Data = {
    actNumber: "ACT I",
    odiaTitle: "ମହୋଦଧି • ପ୍ରାଚୀନ ସିନ୍ଧୁ",
    englishTitle: "The Primordial Waters",
    subtitle: "Where the celestial timber floated ashore, and the holy ocean recites the ancient hymns.",
    prose: [
      "Before the great stone temple rose into the sky, there was only Mahodadhi—the primordial holy ocean of Puri. Ancient Vedic scriptures declare these waters not as mere geography, but as a living celestial deity capable of granting spiritual liberation to all who touch its foam.",
      "Mythology recounts that when King Indradyumna prayed for the divine manifestation, it was Mahodadhi that bore the miraculous Daru Brahma—a fragrant log of sacred neem timber marked with the divine conch and lotus—washing it gently onto the golden sands where Hotel Serene stands today.",
      "To this hour, fishermen set sail before dawn in traditional Sal-wood catamarans, cutting through morning sea mist beneath the watchful gaze of the twin Matsya, the celestial aquatic guardians of coastal Odisha.",
    ],
    secrets: [
      {
        id: "dawn",
        title: "The Golden Dawn of Mahodadhi",
        odia: "ସ୍ୱର୍ଣ୍ଣିମ ସୂର୍ଯ୍ୟୋଦୟ",
        mystery:
          "As the first eastern light breaks over the Bay of Bengal, the surface turns the color of molten turmeric and raw terracotta. Traditional pilgrims perform dawn Surya Arghya (water offerings), offering the sea back to the sun.",
        privilege:
          "Hotel Serene's private beach pathway opens directly onto the certified Blue Flag Golden Beach, where private sunrise meditation cushions, organic herbal infusions, and yoga mats await every morning.",
      },
      {
        id: "shankha",
        title: "The Conch of Awakening (Panchajanya)",
        odia: "ପାଞ୍ଚଜନ୍ୟ ଶଙ୍ଖ ଧ୍ୱନି",
        mystery:
          "Puri is shaped in ancient geomancy as the 'Shankha Kshetra'—a giant cosmic conch shell resting on the shore. The resounding blast of the conch at dawn is believed to cleanse the subtle atmosphere for leagues around.",
        privilege:
          "Private oceanfront sound immersion and meditative conch resonance sessions led by resident wellness practitioners on our private sea deck.",
      },
      {
        id: "matsya",
        title: "The Twin Matsya of Abundance",
        odia: "ଯୁଗ୍ମ ମତ୍ସ୍ୟ ପରମ୍ପରା",
        mystery:
          "In Odishan Pattachitra scrolls and palm-leaf manuscripts, the twin swimming fish symbolize eternal fertility, auspicious passage, and the divine Matsya avatar that recovered the lost Vedas from the ocean floor.",
        privilege:
          "Private luxury catamaran day charters to Chilika Lagoon, home to endangered Irrawaddy dolphins and rare migratory avian colonies, with executive chef picnic hampers.",
      },
      {
        id: "waves",
        title: "The Vow of Silence at the Surf",
        odia: "ସାଗରର ନୀରବତା ଶପଥ",
        mystery:
          "Legend states that when the divine siblings entered the inner sanctum, Lord Jagannath commanded Mahodadhi: 'You may roar across the shore, but not a whisper of your surf shall cross my threshold.' To this day, the ocean roar vanishes completely the instant you step through the Lion Gate.",
        privilege:
          "Secluded oceanfront candlelit dinners curated on our private sands, paired with artisanal coastal tasting menus overlooking the rolling surf.",
      },
    ],
    distance: "450 meters • 5 min Stroll",
    transport: "Private Beach Boardwalk",
  };

  const act2Data = {
    actNumber: "ACT II",
    odiaTitle: "ଶ୍ରୀମନ୍ଦିର • ବାୟୁ ଓ ଚକ୍ର",
    englishTitle: "The Sanctum of the Wind & Wheel",
    subtitle: "The 214-foot stone mountain where the flag defies the breeze and time ceases.",
    prose: [
      "From the primordial waters rises the towering mountain of stone: Shree Jagannath Mandira. Built in the 12th century by King Anantavarman Chodaganga Deva, its curvilinear Rekha Deula spire pierces the coastal sky, an architectural marvel of ancient Kalinga engineering.",
      "Here, sacred rituals unfold with the precision of clockwork unchanged across eight centuries. The temple hearth is the largest sacred kitchen on earth, where 56 varieties of Mahaprasad are prepared daily in unglazed earthen pots stacked seven high over wood fires—where the topmost pot mysteriously cooks first.",
      "At the summit rests the Neela Chakra—an eight-metal cosmic discus weighing over a ton. Below it flutters the sacred Patita Pavana banner, an enigmatic silk triangle that mystically billows opposite to the direction of the coastal trade winds.",
    ],
    secrets: [
      {
        id: "flag",
        title: "The Mystery of the Reversing Flag",
        odia: "ପତିତପାବନ ବାନା ଓ ନୀଳଚକ୍ର",
        mystery:
          "Perched 214 feet high, the sacred flag flies against the sea winds. Every evening at twilight, hereditary Chuna Sevayats scale the sheer stone spire barefoot—with no ropes or harnesses—in a breathtaking display of devotion to tie the new flag before sunset.",
        privilege:
          "Hotel Serene coordinates private twilight rooftop viewing telescopes and canapes as the evening flag-changing ceremony takes place against the dusk sky.",
      },
      {
        id: "spire",
        title: "The Shadowless Spire at High Noon",
        odia: "ଛାୟାହୀନ ରେଖା ଦେଉଳ ଶିଖର",
        mystery:
          "Due to the unique mathematical geometry of Kalinga temple architecture, at high noon the soaring 214-foot spire casts no visible shadow on the ground in any direction—an architectural enigma that has puzzled scholars for centuries.",
        privilege:
          "Private guided architectural excursions led by prominent art historians and temple chroniclers, arranged exclusively for hotel residents.",
      },
      {
        id: "sanctum",
        title: "The Boundless Eyes (Chaka Akhira)",
        odia: "ଗର୍ଭଗୃହ ଓ ଚକା ଆଖି",
        mystery:
          "Inside the deep, incense-scented Garbhagriha, the Lord of the Universe looks out with large, round, lidless eyes (Chaka Akhira)—representing non-judgmental, all-embracing compassion that never blinks or turns away from humanity.",
        privilege:
          "Priority VIP Temple Darshan with dedicated concierge chaperone, verified Sevayat guidance through the inner sanctum, and a consecrated Mahaprasad gift hamper.",
      },
      {
        id: "bell",
        title: "The Resonant Bronze Gongs of Dawn",
        odia: "କଂସା ଘଣ୍ଟ ଧ୍ୱନି",
        mystery:
          "At 05:00 AM, the first Mangala Alati aarti begins with the thunderous tolling of ancient cast-bronze bells (Ghanta) and the rhythmic beating of mridanga drums, awakening the soul of Puri.",
        privilege:
          "Pre-dawn 05:00 AM private Mercedes-Benz chauffeur departure with hot artisanal tea flasks and concierge escort for the morning aarti.",
      },
    ],
    distance: "2.4 km • 8 min Chauffeur",
    transport: "Private Mercedes-Benz Transfer",
  };

  const act3Data = {
    actNumber: "ACT III",
    odiaTitle: "କୋଣାର୍କ • ସୂର୍ଯ୍ୟ ରଥ ଚକ୍ର",
    englishTitle: "The Chariot of Dawn & Wheel of Time",
    subtitle: "Twenty-four colossal stone wheels measuring cosmic time on Chandrabhaga shore.",
    prose: [
      "Thirty-five kilometers along the casuarina-fringed marine highway lies the crowning jewel of medieval Odishan genius: the UNESCO World Heritage Sun Temple of Konark. Conceived in 1250 AD by King Narasimhadeva I, the entire temple was carved as a colossal chariot for Surya, the Sun God.",
      "Twelve hundred master sculptors worked for twelve years on the virgin shores of Chandrabhaga. Twelve colossal pairs of intricately carved stone wheels—twenty-four in all—represent the twenty-four fortnights of the solar year, pulled through the celestial heavens by seven spirited galloping steeds.",
      "Here also lives the poignant legend of Dharmapada, the twelve-year-old child prodigy who crowned the soaring Amalaka stone when all twelve hundred master sculptors had failed, then leaped into the foaming sea below to preserve their honor from the King's wrath.",
    ],
    secrets: [
      {
        id: "wheel",
        title: "The 24-Spoke Astronomical Sundial",
        odia: "୨୪ ଅର ବିଶିଷ୍ଟ ସୌର ଚକ୍ର",
        mystery:
          "Each 10-foot wheel is an astronomical chronometer of breathtaking precision. The eight major spokes denote the eight praharas (3-hour divisions) of the day; shadows cast by the central axle hub tell the exact solar minute.",
        privilege:
          "Private sunrise excursion accompanied by our expert astronomer and historian, demonstrating ancient shadow-time calculation as the first rays strike the stone.",
      },
      {
        id: "hub",
        title: "The Axle Hub & Still Axis of the Universe",
        odia: "ଚକ୍ର କେନ୍ଦ୍ର ଓ ନାଭି",
        mystery:
          "The center of each wheel depicts intricate floral rosettes and miniature dancing celestial maidens (Alasa Kanyas), embodying the still spiritual center around which the wheel of mortal time rotates.",
        privilege:
          "Exclusive access to curated evening light and classical Odissi dance performances in the historic Konark Natamandira amphitheater.",
      },
      {
        id: "horse",
        title: "The Leaping Steeds of Aruna",
        odia: "ସୂର୍ଯ୍ୟଙ୍କ ସପ୍ତ ଅଶ୍ୱ",
        mystery:
          "The seven vigorous stallions pulling the chariot symbolize the seven days of the week and the seven refracted colors of pure white sunlight (VIBGYOR), frozen in muscular Kalinga stone sculpture.",
        privilege:
          "Chauffeured scenic stop at Chandrabhaga Beach, where mythological prince Samba was cured of afflictions by the healing dawn rays of the Sun God.",
      },
      {
        id: "rays",
        title: "The Piercing Ray of the Solstice",
        odia: "ସୌର ମଣ୍ଡଳ ରଶ୍ମି",
        mystery:
          "The temple was so precisely aligned with the cosmic azimuth that on the equinoxes, the very first ray of the rising sun pierced through the dancing hall doors into the dark diamond at Surya's forehead.",
        privilege:
          "Sunrise gourmet breakfast hamper prepared by our executive chef, complete with coastal fruit, artisanal pastries, and French press coffee overlooking the monuments.",
      },
    ],
    distance: "35 km • Scenic Marine Highway",
    transport: "Chauffeured Mercedes-Benz Excursion",
  };

  // Active secret object getters
  const activeSecret1 = act1Data.secrets.find((s) => s.id === act1SecretId) || act1Data.secrets[0];
  const activeSecret2 = act2Data.secrets.find((s) => s.id === act2SecretId) || act2Data.secrets[0];
  const activeSecret3 = act3Data.secrets.find((s) => s.id === act3SecretId) || act3Data.secrets[0];

  // GSAP Smooth Scroll Parallax Animations (Hardware Accelerated, No Pinning, No State Jitter)
  useGSAP(
    () => {
      const sec = sectionRef.current;
      const wm = watermarkRef.current;
      if (!sec) return;

      // Background Watermark Drift
      if (wm) {
        gsap.to(wm, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // Act I Parallax: Sun Ascent & Timber Drift
      if (act1Ref.current) {
        gsap.fromTo(
          "#golden-dawn-horizon",
          { y: 35 },
          {
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: act1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          "#daru-brahma-timber",
          { x: -25 },
          {
            x: 25,
            ease: "none",
            scrollTrigger: {
              trigger: act1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Act II Parallax: Spire Lift & Flag Wave
      if (act2Ref.current) {
        gsap.fromTo(
          "#rekha-deula-spire",
          { y: 40 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: act2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          "#neela-chakra-and-flag",
          { rotation: -4, y: -5 },
          {
            rotation: 4,
            y: 5,
            transformOrigin: "380px 42px",
            ease: "none",
            scrollTrigger: {
              trigger: act2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // Act III Parallax: Smooth Wheel Rotation as User Scrolls
      if (act3Ref.current) {
        gsap.to("#konark-wheel-sketch", {
          rotation: 120,
          transformOrigin: "320px 260px",
          ease: "none",
          scrollTrigger: {
            trigger: act3Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.fromTo(
          "#celestial-stallion-mural",
          { x: -30, y: 15 },
          {
            x: 20,
            y: -10,
            ease: "none",
            scrollTrigger: {
              trigger: act3Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Curated Day Itinerary
  const [activeTab, setActiveTab] = useState<number>(0);
  const itinerary = [
    {
      time: "06:00 AM",
      phase: "Dawn Radiance",
      title: "Blue Flag Golden Beach Sunrise Meditation",
      distance: "450 meters • 5 min walk",
      desc: "Begin your morning on the fine sands of Puri's certified Blue Flag Golden Beach. Gentle eastern tides and sea breezes provide an incomparable atmosphere for quiet reflection.",
      highlight: "Private boardwalk path directly from the hotel lobby.",
    },
    {
      time: "09:30 AM",
      phase: "Sacred Immersion",
      title: "VIP Shree Jagannath Temple Chaperoned Darshan",
      distance: "2.4 km • 8 min chauffeur",
      desc: "Experience the timeless spiritual epicenter of the 12th-century sanctuary. Hotel Serene's temple liaison coordinates priority access, verified Sevayat escort, and consecrated Mahaprasad.",
      highlight: "Chauffeur transfer and dedicated concierge chaperone included.",
    },
    {
      time: "02:00 PM",
      phase: "Coastal Ecology",
      title: "Chilika Lagoon & Irrawaddy Dolphin Catamaran",
      distance: "36 km • Private day excursion",
      desc: "Explore Asia's largest brackish lagoon. Cruise in a private luxury catamaran across serene wetland sanctuaries to observe rare endangered Irrawaddy dolphins and migratory bird flocks.",
      highlight: "Gourmet picnic hamper prepared by our executive chef.",
    },
    {
      time: "06:30 PM",
      phase: "Evening Twilight",
      title: "Rooftop Poolside Candlelit Degustation",
      distance: "Rooftop Sky Sanctuary • At Hotel Serene",
      desc: "Conclude your day atop the hotel with 360-degree ocean views. Savor our multi-course tasting menu paired with coastal cocktails as evening temple gongs echo across the bay.",
      highlight: "Reserved exclusively for registered in-house residents.",
    },
  ];

  const landmarks = [
    {
      num: "01",
      title: "Puri Golden Beach (Blue Flag)",
      dist: "450 METERS • 5 MIN STROLL",
      desc: "Internationally certified Blue Flag beach with fine golden sands, gentle morning tide, and tranquil sunrise meditation pavilions.",
      coords: "19° 47' 42\" N • 85° 49' 58\" E",
    },
    {
      num: "02",
      title: "Shree Jagannath Temple",
      dist: "2.4 KM • 8 MIN CHAUFFEUR",
      desc: "The 12th-century monumental spiritual epicenter. Hotel Serene's concierge coordinates private darshan guidance and traditional Mahaprasad.",
      coords: "19° 48' 17\" N • 85° 49' 06\" E",
    },
    {
      num: "03",
      title: "Puri–Konark Marine Drive",
      dist: "DIRECT COASTAL ACCESS",
      desc: "One of India's most scenic coastal drives through casuarina groves and virgin beaches leading to the UNESCO World Heritage Sun Temple.",
      coords: "Marine Highway Corridor",
    },
    {
      num: "04",
      title: "Chilika Lake & Dolphin Sanctuary",
      dist: "36 KM • PRIVATE DAY EXCURSION",
      desc: "Asia's largest brackish water lagoon, home to the rare endangered Irrawaddy dolphins and thousands of migratory winter birds.",
      coords: "19° 42' 00\" N • 85° 20' 00\" E",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="destination"
      className="py-20 sm:py-28 bg-[#f9f7f2] border-t border-[#1c1a17]/10 relative text-[#1c1a17]"
    >
      {/* Background Cartography Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/4 -left-12 pointer-events-none select-none text-[#1c1a17] opacity-[0.025] font-serif text-[18vw] font-light leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        ପୁରୀ • PURI DHAM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-20 relative z-10">
        {/* 1. Prologue Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#1c1a17]/10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#b58d5b] font-semibold">
              <Compass className="w-4 h-4 text-[#b58d5b]" />
              <span>An Odyssey in Three Sacred Acts • ପୁରୀ ର ଆତ୍ମା</span>
            </div>

            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1c1a17] font-light tracking-tight leading-[1.15]">
                Puri: The Ocean of <br />
                <span className="italic font-normal text-[#b58d5b]">Eternal Grace</span>
              </h2>
            </GooeyTextReveal>

            <div className="pt-2 text-sm sm:text-base text-[#5c554b] font-serif leading-relaxed font-light space-y-2">
              <p>
                Puri is not merely a destination on the Bay of Bengal. In the ancient consciousness of Odisha, it is a living soul—an eternal triad where the sacred ocean gives birth to the divine sanctum, and the cosmic sun chariot calculates the passage of eternity.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#8a8479]">
                <ArrowDown className="w-3.5 h-3.5 text-[#b58d5b]" />
                <span>Scroll to journey through the three sacred chapters • Copperplate etchings animate with your scroll</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={playSacredChime}
              className="px-4 py-2.5 rounded-full bg-white border border-[#1c1a17]/15 hover:border-[#b58d5b] text-[#1c1a17] hover:text-[#b58d5b] text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer shadow-xs group"
              title="Resonate bronze temple chime"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#b58d5b] group-hover:scale-110 transition-transform" />
              <span className="font-medium">Resonate Temple Chime</span>
            </button>

            <div className="px-4 py-2 rounded-full bg-[#1c1a17] text-white text-[11px] font-mono tracking-wider shadow-xs flex items-center space-x-2">
              <MapPin className="w-3 h-3 text-[#c5a880]" />
              <span>19° 48&apos; 07&quot; N • 85° 50&apos; 22&quot; E</span>
            </div>
          </div>
        </div>

        {/* 2. Chapter Quick-Jump Rail */}
        <div className="p-3 bg-[#ede8dc] rounded-2xl border border-[#1c1a17]/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#8a8479] pl-2">
            <BookOpen className="w-3.5 h-3.5 text-[#b58d5b]" />
            <span className="font-semibold text-[#1c1a17]">The Story Chapters</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToChapter(act1Ref)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#1c1a17] hover:text-white font-mono text-xs text-[#1c1a17] transition-all cursor-pointer flex items-center space-x-2 shadow-xs"
            >
              <span className="text-[#b58d5b] font-semibold">01</span>
              <span>Act I: The Waters</span>
            </button>
            <button
              onClick={() => scrollToChapter(act2Ref)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#1c1a17] hover:text-white font-mono text-xs text-[#1c1a17] transition-all cursor-pointer flex items-center space-x-2 shadow-xs"
            >
              <span className="text-[#b58d5b] font-semibold">02</span>
              <span>Act II: The Sanctum</span>
            </button>
            <button
              onClick={() => scrollToChapter(act3Ref)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#1c1a17] hover:text-white font-mono text-xs text-[#1c1a17] transition-all cursor-pointer flex items-center space-x-2 shadow-xs"
            >
              <span className="text-[#b58d5b] font-semibold">03</span>
              <span>Act III: The Sun</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT I: THE PRIMORDIAL WATERS (MAHODADHI)                                  */}
        {/* ========================================================================= */}
        <div ref={act1Ref} className="space-y-8 scroll-mt-28">
          {/* Chapter Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#b58d5b] uppercase font-semibold">
                <span>{act1Data.actNumber}</span>
                <span>•</span>
                <span>{act1Data.odiaTitle}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1a17] font-normal">
                {act1Data.englishTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#716c62] font-serif font-light">
                {act1Data.subtitle}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono text-[#8a8479]">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b58d5b]" />
                <span>{act1Data.distance}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#faf8f4] border border-[#b58d5b]/30 text-[#b58d5b] text-[11px]">
                {act1Data.transport}
              </div>
            </div>
          </div>

          {/* Literary Narrative (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#4a4740] font-serif leading-relaxed font-light p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm">
            {act1Data.prose.map((paragraph, pIdx) => (
              <p key={pIdx} className="border-l border-[#b58d5b]/30 pl-4 py-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Visual Mural & Mystery Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mural Illustration with Scroll Parallax */}
            <div className="lg:col-span-7">
              <PattachitraFrame
                title={act1Data.englishTitle}
                subtitle={act1Data.subtitle}
                badge={act1Data.actNumber}
                folioNumber="PL. 01"
                className="w-full"
              >
                <div className="relative py-2">
                  <SeaPattachitra
                    activeHotspot={act1SecretId}
                    onSelectHotspot={(id) => {
                      setAct1SecretId(id);
                      playSacredChime();
                    }}
                  />
                </div>

                {/* Hotspot Pills */}
                <div className="mt-4 pt-4 border-t border-[#1c1a17]/10 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#8a8479] tracking-wider mr-1">
                    Engraved Mysteries:
                  </span>
                  {act1Data.secrets.map((secret, i) => (
                    <button
                      key={secret.id}
                      onClick={() => {
                        setAct1SecretId(secret.id);
                        playSacredChime();
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                        act1SecretId === secret.id
                          ? "bg-[#1c1a17] text-white font-medium shadow-xs"
                          : "bg-white border border-[#1c1a17]/15 text-[#5a5750] hover:border-[#b58d5b]"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-black/10 flex items-center justify-center text-[9px] font-bold">
                        0{i + 1}
                      </span>
                      <span>{secret.title.split("(")[0].trim()}</span>
                    </button>
                  ))}
                </div>
              </PattachitraFrame>
            </div>

            {/* Mystery Detail Card */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1a17]/8">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#b58d5b] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sacred Lore & Esoteric Mystery</span>
                  </span>
                  <span className="text-xs font-mono text-[#8a8479]">
                    {activeSecret1.odia}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-2xl text-[#1c1a17] font-normal leading-snug">
                    {activeSecret1.title}
                  </h4>
                  <p className="text-sm text-[#5a5750] font-serif leading-relaxed mt-2.5 font-light">
                    {activeSecret1.mystery}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#b58d5b]/30 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#b58d5b] font-semibold uppercase tracking-wider">
                    <Car className="w-3.5 h-3.5 text-[#b58d5b]" />
                    <span>Serene Resident Privilege</span>
                  </div>
                  <p className="text-xs text-[#3a3832] font-mono leading-relaxed">
                    {activeSecret1.privilege}
                  </p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-[#1c1a17] hover:bg-[#2b2722] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Car className="w-4 h-4 text-[#c5a880]" />
                  <span>Arrange This Private Excursion</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT II: THE SANCTUM OF THE WIND & WHEEL (SHREE JAGANNATH MANDIRA)          */}
        {/* ========================================================================= */}
        <div ref={act2Ref} className="space-y-8 pt-8 scroll-mt-28">
          {/* Chapter Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#b58d5b] uppercase font-semibold">
                <span>{act2Data.actNumber}</span>
                <span>•</span>
                <span>{act2Data.odiaTitle}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1a17] font-normal">
                {act2Data.englishTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#716c62] font-serif font-light">
                {act2Data.subtitle}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono text-[#8a8479]">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b58d5b]" />
                <span>{act2Data.distance}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#faf8f4] border border-[#b58d5b]/30 text-[#b58d5b] text-[11px]">
                {act2Data.transport}
              </div>
            </div>
          </div>

          {/* Literary Narrative (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#4a4740] font-serif leading-relaxed font-light p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm">
            {act2Data.prose.map((paragraph, pIdx) => (
              <p key={pIdx} className="border-l border-[#b58d5b]/30 pl-4 py-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Visual Mural & Mystery Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mural Illustration with Spire Parallax */}
            <div className="lg:col-span-7">
              <PattachitraFrame
                title={act2Data.englishTitle}
                subtitle={act2Data.subtitle}
                badge={act2Data.actNumber}
                folioNumber="PL. 02"
                className="w-full"
              >
                <div className="relative py-2">
                  <TemplePattachitra
                    activeHotspot={act2SecretId}
                    onSelectHotspot={(id) => {
                      setAct2SecretId(id);
                      playSacredChime();
                    }}
                  />
                </div>

                {/* Hotspot Pills */}
                <div className="mt-4 pt-4 border-t border-[#1c1a17]/10 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#8a8479] tracking-wider mr-1">
                    Engraved Mysteries:
                  </span>
                  {act2Data.secrets.map((secret, i) => (
                    <button
                      key={secret.id}
                      onClick={() => {
                        setAct2SecretId(secret.id);
                        playSacredChime();
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                        act2SecretId === secret.id
                          ? "bg-[#1c1a17] text-white font-medium shadow-xs"
                          : "bg-white border border-[#1c1a17]/15 text-[#5a5750] hover:border-[#b58d5b]"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-black/10 flex items-center justify-center text-[9px] font-bold">
                        0{i + 1}
                      </span>
                      <span>{secret.title.split("(")[0].trim()}</span>
                    </button>
                  ))}
                </div>
              </PattachitraFrame>
            </div>

            {/* Mystery Detail Card */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1a17]/8">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#b58d5b] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sacred Lore & Esoteric Mystery</span>
                  </span>
                  <span className="text-xs font-mono text-[#8a8479]">
                    {activeSecret2.odia}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-2xl text-[#1c1a17] font-normal leading-snug">
                    {activeSecret2.title}
                  </h4>
                  <p className="text-sm text-[#5a5750] font-serif leading-relaxed mt-2.5 font-light">
                    {activeSecret2.mystery}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#b58d5b]/30 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#b58d5b] font-semibold uppercase tracking-wider">
                    <Car className="w-3.5 h-3.5 text-[#b58d5b]" />
                    <span>Serene Resident Privilege</span>
                  </div>
                  <p className="text-xs text-[#3a3832] font-mono leading-relaxed">
                    {activeSecret2.privilege}
                  </p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-[#1c1a17] hover:bg-[#2b2722] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Car className="w-4 h-4 text-[#c5a880]" />
                  <span>Arrange This Private Excursion</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT III: THE CHARIOT OF DAWN & WHEEL OF TIME (KONARK)                     */}
        {/* ========================================================================= */}
        <div ref={act3Ref} className="space-y-8 pt-8 scroll-mt-28">
          {/* Chapter Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#b58d5b] uppercase font-semibold">
                <span>{act3Data.actNumber}</span>
                <span>•</span>
                <span>{act3Data.odiaTitle}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1c1a17] font-normal">
                {act3Data.englishTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#716c62] font-serif font-light">
                {act3Data.subtitle}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono text-[#8a8479]">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b58d5b]" />
                <span>{act3Data.distance}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#faf8f4] border border-[#b58d5b]/30 text-[#b58d5b] text-[11px]">
                {act3Data.transport}
              </div>
            </div>
          </div>

          {/* Literary Narrative (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#4a4740] font-serif leading-relaxed font-light p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm">
            {act3Data.prose.map((paragraph, pIdx) => (
              <p key={pIdx} className="border-l border-[#b58d5b]/30 pl-4 py-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Visual Mural & Mystery Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mural Illustration with Real-Time Wheel Rotation */}
            <div className="lg:col-span-7">
              <PattachitraFrame
                title={act3Data.englishTitle}
                subtitle={act3Data.subtitle}
                badge={act3Data.actNumber}
                folioNumber="PL. 03"
                className="w-full"
              >
                <div className="relative py-2">
                  <KonarkPattachitra
                    activeHotspot={act3SecretId}
                    onSelectHotspot={(id) => {
                      setAct3SecretId(id);
                      playSacredChime();
                    }}
                  />
                </div>

                {/* Hotspot Pills */}
                <div className="mt-4 pt-4 border-t border-[#1c1a17]/10 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#8a8479] tracking-wider mr-1">
                    Engraved Mysteries:
                  </span>
                  {act3Data.secrets.map((secret, i) => (
                    <button
                      key={secret.id}
                      onClick={() => {
                        setAct3SecretId(secret.id);
                        playSacredChime();
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                        act3SecretId === secret.id
                          ? "bg-[#1c1a17] text-white font-medium shadow-xs"
                          : "bg-white border border-[#1c1a17]/15 text-[#5a5750] hover:border-[#b58d5b]"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-black/10 flex items-center justify-center text-[9px] font-bold">
                        0{i + 1}
                      </span>
                      <span>{secret.title.split("(")[0].trim()}</span>
                    </button>
                  ))}
                </div>
              </PattachitraFrame>
            </div>

            {/* Mystery Detail Card */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1a17]/8">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#b58d5b] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sacred Lore & Esoteric Mystery</span>
                  </span>
                  <span className="text-xs font-mono text-[#8a8479]">
                    {activeSecret3.odia}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-2xl text-[#1c1a17] font-normal leading-snug">
                    {activeSecret3.title}
                  </h4>
                  <p className="text-sm text-[#5a5750] font-serif leading-relaxed mt-2.5 font-light">
                    {activeSecret3.mystery}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border border-[#b58d5b]/30 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#b58d5b] font-semibold uppercase tracking-wider">
                    <Car className="w-3.5 h-3.5 text-[#b58d5b]" />
                    <span>Serene Resident Privilege</span>
                  </div>
                  <p className="text-xs text-[#3a3832] font-mono leading-relaxed">
                    {activeSecret3.privilege}
                  </p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-[#1c1a17] hover:bg-[#2b2722] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Car className="w-4 h-4 text-[#c5a880]" />
                  <span>Arrange This Private Excursion</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Curated Day Itinerary & Landmarks */}
        <div className="space-y-14 pt-10 border-t border-[#1c1a17]/10">
          {/* Day Itinerary */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1c1a17]/10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1c1a17]/8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b58d5b] font-semibold block">
                  Resident Itinerary
                </span>
                <h3 className="font-serif text-2xl text-[#1c1a17] font-light">
                  A Day in Sacred Stillness
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#8a8479] uppercase tracking-wider">
                4 Curated Chapters • From Dawn Tide to Rooftop Twilight
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {itinerary.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(idx);
                    playSacredChime();
                  }}
                  className={`p-3 rounded-xl text-left font-mono transition-all cursor-pointer ${
                    activeTab === idx
                      ? "bg-[#1c1a17] text-white shadow-xs font-semibold"
                      : "bg-[#f8f6f0] hover:bg-[#f1eee4] text-[#5a5750]"
                  }`}
                >
                  <span className="block text-[9px] text-[#c5a880]">{step.time}</span>
                  <span className="text-xs truncate block">{step.phase}</span>
                </button>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#faf8f4] border border-[#1c1a17]/8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white text-[#1c1a17] text-[10px] font-mono font-semibold uppercase tracking-wider border border-[#1c1a17]/10 shadow-xs">
                  {itinerary[activeTab].time} • {itinerary[activeTab].phase}
                </span>
                <span className="text-xs font-mono text-[#b58d5b] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {itinerary[activeTab].distance}
                </span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-[#1c1a17] font-normal">
                {itinerary[activeTab].title}
              </h4>

              <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed font-mono font-light">
                {itinerary[activeTab].desc}
              </p>

              <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-[#1c1a17] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#b58d5b]" />
                <span>{itinerary[activeTab].highlight}</span>
              </div>
            </div>
          </div>

          {/* Landmarks Cartography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landmarks.map((mark) => (
              <div
                key={mark.num}
                className="p-6 rounded-2xl bg-white border border-[#1c1a17]/10 shadow-xs hover:border-[#b58d5b]/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-mono font-semibold text-[#b58d5b] block mb-1">
                    {`${mark.num} // LANDMARK`}
                  </span>
                  <h4 className="font-serif text-lg text-[#1c1a17] font-normal mb-1">
                    {mark.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#8a8479] uppercase tracking-wider block mb-2">
                    {mark.dist}
                  </span>
                  <p className="text-xs text-[#5a5750] leading-relaxed font-mono font-light">
                    {mark.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1c1a17]/8 text-[9px] font-mono text-[#8a8479]">
                  {mark.coords}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
