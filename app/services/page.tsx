import Link from "next/link";
import Service from "@/components/sections/Service";
import AllServices from "@/components/sections/AllServices";
import HowItWorks from "@/components/sections/HowItWorks";
import HomeServicesAndProfessionals from "@/components/sections/HomeServicesAndProfessionals";
import CTA from "@/components/sections/CTA";
import Cube3D from "@/components/motion/Cube3D";

export const metadata = { title: "Services | Abhiyantri Setu" };

export default function ServicesPage() {
  return (
    <>
      <section data-no-reveal className="relative overflow-hidden bg-[#1A2332] px-4 py-16 text-center">
        <Cube3D size={60} className="float-3d absolute left-[10%] top-8 hidden md:block" />
        <Cube3D size={34} className="float-3d absolute bottom-8 right-[12%] hidden md:block [animation-delay:-4s]" />
        <h1 className="text-3xl font-bold text-white sm:text-5xl">All Services</h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Build, renovate, repair and maintain — everything for your home and project in one trusted platform.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/jobs/post" className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 hover:bg-yellow-500">
            Post a Job
          </Link>
          <Link href="/providers" className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
            Browse Professionals
          </Link>
        </div>
      </section>
      <Service />
      <AllServices />
      <HomeServicesAndProfessionals />
      <HowItWorks />
      <CTA />
    </>
  );
}
