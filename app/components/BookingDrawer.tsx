"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ArrowRight, CheckCircle2, ShieldCheck, Printer, Phone, Mail, User } from "lucide-react";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: string;
}

export default function BookingDrawer({
  isOpen,
  onClose,
  preselectedRoomId,
}: BookingDrawerProps) {
  const rooms = [
    {
      id: "deluxe",
      name: "Deluxe Ocean Chamber (Levels 1–4)",
      spec: "King Bed • Ocean Vista • Ensuite Rain Shower & Study Bar",
      price: 3500,
      image: "/images/hotel/room-typical-render.jpg",
    },
    {
      id: "super-deluxe",
      name: "Super Deluxe Sanctuary (Levels 3–5)",
      spec: "Private Cantilevered Balcony • Deep Soaking Bath • Sea Vista",
      price: 5000,
      image: "/images/hotel/hero-penthouse-clean.jpg",
    },
    {
      id: "presidential",
      name: "Presidential Penthouse (Level 5)",
      spec: "Formal Oceanfront Salon • Freestanding Spa Bath & Dedicated Butler",
      price: 8000,
      image: "/images/hotel/suite-504-living.jpg",
    },
  ];

  const [selectedRoom, setSelectedRoom] = useState(preselectedRoomId || rooms[0].id);
  const [prevRoomProp, setPrevRoomProp] = useState(preselectedRoomId);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [addons, setAddons] = useState<string[]>(["breakfast"]);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (preselectedRoomId && preselectedRoomId !== prevRoomProp) {
    setPrevRoomProp(preselectedRoomId);
    const match = rooms.find(
      (r) =>
        r.id === preselectedRoomId ||
        r.id === preselectedRoomId.split("-")[0] ||
        (preselectedRoomId.includes("deluxe") && r.id === "deluxe") ||
        (preselectedRoomId.includes("presidential") && r.id === "presidential")
    );
    if (match) setSelectedRoom(match.id);
  }

  const addonOptions = [
    { id: "breakfast", name: "Artisanal Champagne & Coastal Odia Breakfast Buffet", price: 650 },
    { id: "transfer", name: "Bhubaneswar (BBI) Airport Luxury Chauffeur Transfer", price: 2500 },
    { id: "darshan", name: "VIP Shree Jagannath Temple Guided Darshan Assistance", price: 1500 },
    { id: "rooftop-dinner", name: "Private Rooftop Poolside Candlelit Degustation", price: 3500 },
  ];

  const currentRoomObj = rooms.find((r) => r.id === selectedRoom) || rooms[0];
  const baseTotal = currentRoomObj.price * nights;
  const addonsTotal = addons.reduce((acc, currId) => {
    const opt = addonOptions.find((a) => a.id === currId);
    return acc + (opt ? opt.price : 0);
  }, 0);
  const subtotal = baseTotal + addonsTotal;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SER-PURI-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Reservation Panel */}
      <div className="relative z-10 w-full max-w-xl h-full bg-[#f7f4ee] border-l border-[rgba(20,22,27,0.12)] shadow-2xl flex flex-col justify-between overflow-y-auto text-[#14161b]">
        {/* Header */}
        <div className="sticky top-0 bg-[#f7f4ee]/95 backdrop-blur-md p-6 border-b border-[rgba(20,22,27,0.08)] flex items-center justify-between z-20">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-8 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/logo/logo-cropped.png"
                alt="Hotel Serene Logo"
                width={48}
                height={36}
                className="w-full h-auto object-contain"
              />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#b58d5b] block mb-0.5 font-semibold">
                Direct Sanctuary Reservations
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#14161b] font-light flex items-center gap-2">
                Reserve Your Stay{" "}
                <span
                  className="font-script text-2xl sm:text-3xl text-[#b58d5b] font-normal leading-none"
                  style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                >
                  & Stillness
                </span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-black/5 text-[#5a5750] hover:text-[#14161b] transition-colors cursor-pointer"
            aria-label="Close booking drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {isBooked ? (
            /* Confirmation Voucher Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b58d5b] block mb-1.5 font-semibold">
                  Reservation Voucher Archived
                </span>
                <h4 className="font-serif text-3xl sm:text-4xl text-[#14161b] mb-2 font-light">
                  Welcome to{" "}
                  <span
                    className="font-script text-4xl sm:text-5xl text-[#b58d5b] font-normal block mt-1"
                    style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                  >
                    Hotel Serene
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5a5750] font-mono max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#14161b]">{name}</strong>. Your luxury stay has been registered under voucher{" "}
                  <strong className="text-[#14161b] bg-white px-2 py-0.5 rounded border border-gray-200">{bookingRef}</strong>.
                  Our private concierge will contact you at <span className="underline">{email}</span> to coordinate your arrival.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="p-6 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] text-left font-mono text-xs space-y-3 max-w-md mx-auto shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="w-20 h-auto">
                    <Image
                      src="/images/logo/logo-cropped.png"
                      alt="Hotel Serene"
                      width={80}
                      height={60}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-[#827e74] uppercase tracking-widest">Official Voucher</span>
                </div>
                <div className="flex justify-between text-[#827e74] pb-2 border-b border-gray-100">
                  <span>Voucher Reference:</span>
                  <span className="text-[#14161b] font-bold">{bookingRef}</span>
                </div>
                <div className="flex justify-between text-[#827e74]">
                  <span>Reserved Suite:</span>
                  <span className="text-[#b58d5b] font-semibold text-right max-w-[60%]">{currentRoomObj.name}</span>
                </div>
                <div className="flex justify-between text-[#827e74]">
                  <span>Length of Stay:</span>
                  <span className="text-[#14161b]">{nights} Nights ({guests} Guests)</span>
                </div>
                {addons.length > 0 && (
                  <div className="flex justify-between text-[#827e74]">
                    <span>Inclusions:</span>
                    <span className="text-[#14161b]">{addons.length} Curated Experiences</span>
                  </div>
                )}
                <div className="flex justify-between text-[#827e74] pt-2 border-t border-gray-100 text-sm">
                  <span className="text-[#14161b] font-semibold">Total Amount:</span>
                  <span className="text-[#14161b] font-bold">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-[#14161b] text-xs font-mono uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={() => {
                    setIsBooked(false);
                    onClose();
                  }}
                  className="px-8 py-3 bg-[#14161b] text-white text-xs uppercase font-mono font-semibold tracking-widest rounded-xl hover:bg-[#252830] transition-colors cursor-pointer shadow-md"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Step 1: Select Residence */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#827e74] font-semibold block mb-2">
                  1. Select Residence / Suite
                </label>
                <div className="space-y-2.5">
                  {rooms.map((room) => {
                    const isSelected = selectedRoom === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#14161b] border-[#14161b] text-[#f7f4ee] shadow-md ring-2 ring-[#c5a880]/40"
                            : "bg-white hover:bg-[#f2ece1] border-[rgba(20,22,27,0.08)] text-[#5a5750]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image
                              src={room.image}
                              alt={room.name}
                              fill
                              sizes="50px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className={`font-serif text-sm font-medium block ${isSelected ? "text-white" : "text-[#14161b]"}`}>
                              {room.name}
                            </span>
                            <span className={`text-[10px] font-mono block ${isSelected ? "text-white/70" : "text-[#827e74]"}`}>
                              {room.spec}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs font-mono font-semibold flex-shrink-0 ml-2 ${isSelected ? "text-[#c5a880]" : "text-[#b58d5b]"}`}>
                          ₹{room.price.toLocaleString("en-IN")}/nt
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Duration & Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#827e74] font-semibold block mb-2">
                    Duration (Nights)
                  </label>
                  <div className="relative">
                    <select
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full p-3 rounded-xl bg-white border border-[rgba(20,22,27,0.12)] text-xs text-[#14161b] font-mono focus:border-[#14161b] outline-none cursor-pointer shadow-xs"
                    >
                      {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Night" : "Nights"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#827e74] font-semibold block mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-3 rounded-xl bg-white border border-[rgba(20,22,27,0.12)] text-xs text-[#14161b] font-mono focus:border-[#14161b] outline-none cursor-pointer shadow-xs"
                    >
                      {[1, 2, 3, 4].map((g) => (
                        <option key={g} value={g}>
                          {g} {g === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Bespoke Inclusions */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#827e74] font-semibold block mb-2">
                  2. Curated Experiences & Add-Ons
                </label>
                <div className="space-y-2">
                  {addonOptions.map((opt) => {
                    const isChecked = addons.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleAddon(opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-[#14161b] border-[#14161b] text-white shadow-xs"
                            : "bg-white hover:bg-[#f2ece1] border-[rgba(20,22,27,0.08)] text-[#5a5750]"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span
                            className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] font-bold ${
                              isChecked
                                ? "bg-[#c5a880] border-[#c5a880] text-[#14161b]"
                                : "border-gray-300 bg-transparent"
                            }`}
                          >
                            {isChecked ? "✓" : ""}
                          </span>
                          <span className="font-light">{opt.name}</span>
                        </div>
                        <span className={`font-mono text-xs ${isChecked ? "text-[#c5a880]" : "text-[#b58d5b]"}`}>
                          +₹{opt.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Information */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#827e74] font-semibold block mb-2">
                  3. Primary Guest Contact
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Full Name (e.g. Radhika Sharma)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 pl-9 rounded-xl bg-white border border-[rgba(20,22,27,0.12)] text-xs text-[#14161b] placeholder:text-gray-400 font-mono focus:border-[#14161b] outline-none shadow-xs"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 pl-9 rounded-xl bg-white border border-[rgba(20,22,27,0.12)] text-xs text-[#14161b] placeholder:text-gray-400 font-mono focus:border-[#14161b] outline-none shadow-xs"
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="Phone (+91 ...)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 pl-9 rounded-xl bg-white border border-[rgba(20,22,27,0.12)] text-xs text-[#14161b] placeholder:text-gray-400 font-mono focus:border-[#14161b] outline-none shadow-xs"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      placeholder="Special concierge requests, dietary preferences, or arrival notes..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={2}
                      className="w-full p-3 rounded-xl bg-white border border-[rgba(20,22,27,0.12)] text-xs text-[#14161b] placeholder:text-gray-400 font-mono focus:border-[#14161b] outline-none shadow-xs resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] font-mono text-xs space-y-2.5 shadow-md">
                <div className="flex justify-between text-[#827e74]">
                  <span>Room Tariff ({nights} Nights)</span>
                  <span className="text-[#14161b] font-medium">₹{baseTotal.toLocaleString("en-IN")}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-[#827e74]">
                    <span>Curated Experiences</span>
                    <span className="text-[#14161b] font-medium">₹{addonsTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#827e74]">
                  <span>Hospitality GST (18%)</span>
                  <span className="text-[#14161b] font-medium">₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base pt-2.5 border-t border-[rgba(20,22,27,0.08)] text-[#14161b] font-bold">
                  <span>Grand Total:</span>
                  <span className="text-[#b58d5b]">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white font-mono font-semibold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Confirm & Archive Reservation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-[#827e74] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero cancellation penalty up to 48 hours before check-in</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
