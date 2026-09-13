import { sanitizeWordPressHtml } from "@/lib/wordpress";

export default function RichContent({ html, className = "" }) {
  if (!html) return null;

  return (
    <div
      className={`rich-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: sanitizeWordPressHtml(html) }}
    />
  );
}

