import Link from "next/link";
import { isWordPressConfigured } from "@/lib/wordpress";

export default function ContentEmptyState({ type }) {
  return (
    <div className="content-empty">
      <h2>{isWordPressConfigured() ? `No ${type} found` : "Content coming soon"}</h2>
      <p>
        {isWordPressConfigured()
          ? `There are no published ${type} to show yet.`
          : "We are preparing this section. Please check back soon."}
      </p>
      <Link href="/" className="text-link">
        Return home
      </Link>
    </div>
  );
}

