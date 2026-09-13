import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import RichContent from "../../components/RichContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { contentMetadata } from "@/lib/seo";
import {
  getServiceBySlug,
  getServices,
  stripHtml,
} from "@/lib/wordpress";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return contentMetadata(service, `/services/${slug}`, "website");
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="page">
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          {
            name: stripHtml(service.title),
            path: `/services/${service.slug}`,
          },
        ])}
      />
      <SiteHeader />
      <main className="main-content content-detail">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: stripHtml(service.title) },
          ]}
        />
        <article>
          <header className="content-detail__header">
            <p className="content-hero__eyebrow">Inner Tide service</p>
            <h1>{stripHtml(service.title)}</h1>
            <RichContent
              html={service.summary}
              className="content-detail__summary"
            />
            {(service.duration || service.price) && (
              <dl className="service-facts">
                {service.duration && (
                  <div>
                    <dt>Duration</dt>
                    <dd>{service.duration}</dd>
                  </div>
                )}
                {service.price && (
                  <div>
                    <dt>Price</dt>
                    <dd>{service.price}</dd>
                  </div>
                )}
              </dl>
            )}
          </header>
          {service.image && (
            <div className="content-detail__image">
              <Image
                src={service.image.url}
                alt={service.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                priority
              />
            </div>
          )}
          <RichContent html={service.content} />
          {service.benefits.length > 0 && (
            <section className="service-section">
              <h2>Benefits</h2>
              <ul>
                {service.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </section>
          )}
          {service.suitability && (
            <section className="service-section">
              <h2>Who it is for</h2>
              <RichContent html={service.suitability} />
            </section>
          )}
          {service.gallery.length > 0 && (
            <section className="service-section">
              <h2>Gallery</h2>
              <div className="service-gallery">
                {service.gallery.map((image) => (
                  <div className="service-gallery__image" key={image.id || image.url}>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className="content-detail__cta">
            <Link href={service.bookingUrl} className="hero__button">
              {service.bookingLabel}
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

