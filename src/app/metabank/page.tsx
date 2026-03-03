"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MetaverseHero } from "@/components/sections/MetaverseHero";
import { VisaSection } from "@/components/sections/VisaSection";
// import { BenefitsAccordion } from "@/components/sections/BenefitsAccordion"; // 1. Importar
import { MarketplaceTeaser } from "@/components/sections/MarketplaceTeaser";
import { SteamInventorySection } from "@/components/sections/SteamInventorySection";
import { LootEconomySection } from "@/components/sections/LootEconomySection";
import { NfcWalletSection } from "@/components/sections/NfcWalletSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { VirtualCardsHero } from "@/components/sections/VirtualCardsHero";
import { ReviewsStatsSection } from "@/components/sections/ReviewsStatsSection";
import { CommunityHero } from "@/components/sections/CommunityHero";

export default function MetaverseBankPage() {
  return (
    <main className="bg-black text-white min-h-screen w-full font-sans overflow-x-hidden selection:bg-[#E6F379] selection:text-black">
      <Header />
      
      <MetaverseHero />
      
      <VisaSection />
      
      <MarketplaceTeaser />

      <SteamInventorySection />

      <LootEconomySection />
            
      <NfcWalletSection />

      <ProofSection />
            
      <VirtualCardsHero />

      <ReviewsStatsSection />

      <CommunityHero />

      <Footer />
    </main>
  );
}