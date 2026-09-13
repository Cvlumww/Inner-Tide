import Image from "next/image";
import Link from "next/link";
import { sanitizeWordPressHtml, stripHtml } from "@/lib/wordpress";

export default function ServiceCard({ service }) {
  return (
    <article className="content-card content-card--service">
      {service.image && (
        <Link
          href={`/services/${service.slug}`}
          className="content-card__image"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={service.image.url}
            alt={service.image.alt}
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        </Link>
      )}
      <div className="content-card__body">
        <h2 className="content-card__title">
          <Link href={`/services/${service.slug}`}>
            {stripHtml(service.title)}
          </Link>
        </h2>
        {service.summary && (
          <div
            className="content-card__excerpt"
            dangerouslySetInnerHTML={{
              __html: sanitizeWordPressHtml(service.summary),
            }}
          />
        )}
        <div className="content-card__facts">
          {service.duration && <span>{service.duration}</span>}
          {service.price && <span>{service.price}</span>}
        </div>
        <Link href={`/services/${service.slug}`} className="text-link">
          Explore service
        </Link>
      </div>
    </article>
  );
}

