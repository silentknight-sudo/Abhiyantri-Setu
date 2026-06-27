import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChoose from "@/components/sections/WhyChoose";
import Professionals from "@/components/sections/Professionals";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/footer/Footer";
import Service from "@/components/sections/Service"
import ConstructionService from "@/components/sections/ConstructionService"



export default async function Home() {
   

  return (
    <>
      <Hero />
      <Service/>
      <HowItWorks />
      <ConstructionService/>
      <WhyChoose />
      <Professionals />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}