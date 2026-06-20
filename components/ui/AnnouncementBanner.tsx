// components/ui/AnnouncementBanner.tsx

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-green-500 text-black text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-center">
        <span className="font-semibold tracking-wide">
          🚀 Limited Time Offer
        </span>

        <span className="hidden sm:block opacity-40">|</span>

        <span>
          <span className="font-bold">50% OFF + LAUNCH</span>{" "}
          <span className="opacity-70">CODE:</span>{" "}
          <span className="font-bold">LAUNCH50</span>
        </span>

        <span className="hidden sm:block opacity-40">|</span>

        <span>
          <span className="font-bold">50% OFF New Customers</span>{" "}
          <span className="opacity-70">CODE:</span>{" "}
          <span className="font-bold">FIRSTEFT</span>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
