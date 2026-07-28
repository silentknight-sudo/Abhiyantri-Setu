import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChoose from "@/components/sections/WhyChoose";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/footer/Footer";
import Service from "@/components/sections/Service"
import ConstructionService from "@/components/sections/ConstructionService"
import AllServices from "@/components/sections/AllServices";
import HomeServicesAndProfessionals from "@/components/sections/HomeServicesAndProfessionals";
import CtaCards from "@/components/sections/CtaCard";



export default async function Home() {
   

  return (
    <>
      <Hero />
      <Service/>
      <HowItWorks />
      <ConstructionService/>
      <AllServices/>
      <HomeServicesAndProfessionals/>
      <CtaCards/>
      <WhyChoose />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}