import ContentEmptyState from "../components/ContentEmptyState";
import ServiceCard from "../components/ServiceCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { archiveMetadata } from "@/lib/seo";
import { getServices } from "@/lib/wordpress";

export const metadata = archiveMetadata({
  title: "Reformer Pilates Services",
  description:
    "Explore small-group and private reformer Pilates services at Inner Tide Studios in Finnieston, Glasgow.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="page">
      <SiteHeader />
      <main className="main-content content-archive">
        <header className="content-hero">
          <p className="content-hero__eyebrow">Move with purpose</p>
          <h1>Our services</h1>
          <p>
            Reformer Pilates experiences designed to meet you where you are and
            help you move with strength, control, and confidence.
          </p>
        </header>
        {services.length ? (
          <div className="content-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <ContentEmptyState type="services" />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

