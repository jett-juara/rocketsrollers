import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import SeriesSection from "@/components/home/SeriesSection";
import PartnersSection from "@/components/home/PartnersSection";
import AthletesSection from "@/components/home/AthletesSection";
import NewsSection from "@/components/home/NewsSection";
import SubscribeSection from "@/components/home/SubscribeSection";
import GallerySection from "@/components/home/GallerySection";
import LiveResults from "@/components/home/LiveResults";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <LiveResults />
      <SeriesSection />
      <PartnersSection />
      <AthletesSection />
      <NewsSection />
      <SubscribeSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
