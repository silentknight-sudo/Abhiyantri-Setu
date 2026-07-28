import HomeServices from "./HomeServices";
import FeaturedProfessionals from "./FeaturedProfessionals"

export default function HomeServicesAndProfessionals() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-10 lg:py-14 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HomeServices />
        <FeaturedProfessionals />
      </div>
    </section>
  );
}