import ChooseChallenge from "@/components/homepage/ChooseChallenge";
import ChooseChallengeSection from "@/components/homepage/ChooseChallengeSection";
import CTASection from "@/components/homepage/CTASection";
import GlobalTradersStats from "@/components/homepage/GlobalTradersStats";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import NewsletterModal from "@/components/homepage/NewsletterModal";
import PlatformsPartners from "@/components/homepage/PlatformsPartners";
import RewardSimulator from "@/components/homepage/RewardSimulator";
import Testimonials from "@/components/homepage/Testimonials";
import Turbo from "@/components/homepage/Turbo";
import WhatSection from "@/components/homepage/WhatSection";
import Why from "@/components/homepage/Why";
import AnnouncementBanner from "@/components/ui/AnnouncementBanner";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const Home = () => {
  return (
    <main>
      <AnnouncementBanner />
      <Navbar />
      <Hero />

      <div className="relative">
        {/* GLOBAL BACKGROUND */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/homepage/images/background-challenge-1.png')",
          }}
        />

        {/* FINAL OVERLAY */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/70 to-green-950/70 mix-blend-multiply" />

        <WhatSection />
        <Turbo />
        <ChooseChallengeSection />
        <RewardSimulator />
        <PlatformsPartners />
        <GlobalTradersStats />
        <Why />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </div>
      <Footer />
      <NewsletterModal />
    </main>
  );
};

export default Home;
