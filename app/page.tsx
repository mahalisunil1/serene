"use client";

import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import WebGLCanvas from "./components/WebGLCanvas";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MersiStatement from "./components/MersiStatement";
import InteractiveFacade from "./components/InteractiveFacade";
import ArchitectureStory from "./components/ArchitectureStory";
import SpatialJourney from "./components/SpatialJourney";
import AccommodationsExplorer from "./components/AccommodationsExplorer";
import RooftopSanctuary from "./components/RooftopSanctuary";
import DiningSection from "./components/DiningSection";
import FloorNavigator from "./components/FloorNavigator";
import AmenitiesSection from "./components/AmenitiesSection";
import PuriDestination from "./components/PuriDestination";
import BookingDrawer from "./components/BookingDrawer";
import FloatingBookingBar from "./components/FloatingBookingBar";
import ImageLightbox, { LightboxImage } from "./components/ImageLightbox";
import Footer from "./components/Footer";

export default function Home() {
  const [, setIsLoaded] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);

  // Universal Lightbox State
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenBooking = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };

  const handleOpenLightbox = (images: LightboxImage[], index: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <SmoothScroll>
      {/* Luxury Awwwards Curtain Preloader with non-linear counter */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Trailing Spring Interactive Cursor */}
      <CustomCursor />

      {/* WebGL Interactive Ocean Caustics Shader Canvas */}
      <WebGLCanvas />

      {/* Haute Minimalist Header with discrete audio toggle & clock */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Archival Monograph Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Folio I: Filmic Archival Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Quiet Luxury Architectural Manifesto */}
        <MersiStatement />

        {/* Signature Interactive Neoclassical Facade Elevation Scanner */}
        <InteractiveFacade
          onOpenBooking={() => handleOpenBooking()}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Folio II: Neoclassical Genesis & Symmetry */}
        <ArchitectureStory />

        {/* Folio III: GSAP Horizontal Pinned Spatial Journey */}
        <SpatialJourney onOpenBooking={() => handleOpenBooking()} />

        {/* Folio IV: Chambers & Residential Collection with Live CAD Blueprint Switcher */}
        <AccommodationsExplorer
          onSelectRoom={(roomId) => handleOpenBooking(roomId)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Folio V: The Sky Sanctuary: Rooftop Striped Lap Pool & Pergola Lounge */}
        <RooftopSanctuary
          onOpenLightbox={handleOpenLightbox}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Folio VI: The 30-Seater Restaurant & Monochrome Plate Art Wall */}
        <DiningSection
          onReserveTable={() => handleOpenBooking()}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Folio VII: Interactive Multi-Floor Blueprint Dossier */}
        <FloorNavigator />

        {/* Folio VIII: Architectural Appointments Schedule & Curated Services */}
        <AmenitiesSection />

        {/* Folio IX: Sacred Cartography & Puri Coastal Curated Itinerary */}
        <PuriDestination onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Floating Luxury Quick-Booking Bar */}
      <FloatingBookingBar onOpenBooking={() => handleOpenBooking()} />

      {/* Universal Fullscreen High-Resolution Lightbox Modal */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onIndexChange={setLightboxIndex}
      />

      {/* Editorial Footer with Architectural Credits & Provenance */}
      <Footer />

      {/* Private Concierge Reservation Desk */}
      <BookingDrawer
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        preselectedRoomId={selectedRoomId}
      />
    </SmoothScroll>
  );
}
