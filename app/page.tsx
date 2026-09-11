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
import WellnessSanctuary from "./components/WellnessSanctuary";
import AmenitiesSection from "./components/AmenitiesSection";
import PuriDestination from "./components/PuriDestination";
import BookingDrawer from "./components/BookingDrawer";
import FloatingBookingBar from "./components/FloatingBookingBar";
import ImageLightbox, { LightboxImage } from "./components/ImageLightbox";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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
      {/* Luxury Curtain Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Trailing Spring Interactive Cursor */}
      <CustomCursor />

      {/* WebGL Interactive Ocean Caustics Shader Canvas */}
      <WebGLCanvas />

      {/* Haute Minimalist Header with discrete audio toggle & clock */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Luxury Resort Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Folio I: The Grand Arrival Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Quiet Luxury Sanctuary Philosophy */}
        <MersiStatement />

        {/* Signature Sanctuaries Collection */}
        <InteractiveFacade
          onOpenBooking={() => handleOpenBooking()}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Folio II: The Coastal Heritage */}
        <ArchitectureStory />

        {/* Folio III: GSAP Horizontal Pinned Guest Journey */}
        <SpatialJourney onOpenBooking={() => handleOpenBooking()} />

        {/* Folio IV: Chambers & Residential Collection */}
        <AccommodationsExplorer
          onSelectRoom={(roomId) => handleOpenBooking(roomId)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Folio V: The Sky Sanctuary: Rooftop Striped Lap Pool & Pergola Lounge */}
        <RooftopSanctuary
          onOpenLightbox={handleOpenLightbox}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Folio VI: The 30-Seater Restaurant & Artisanal Buffet */}
        <DiningSection
          onReserveTable={() => handleOpenBooking()}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Folio VII: Oceanfront Wellness Sanctuary & Rejuvenation Atelier */}
        <WellnessSanctuary onBookTreatment={() => handleOpenBooking()} />

        {/* Folio VIII: Curated Resident Privileges & Services */}
        <AmenitiesSection />

        {/* Folio IX: Sacred Puri Cartography & Curated Itinerary */}
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

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Private Concierge Reservation Desk */}
      <BookingDrawer
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        preselectedRoomId={selectedRoomId}
      />
    </SmoothScroll>
  );
}
