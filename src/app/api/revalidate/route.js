import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

function secretsMatch(received, expected) {
  if (!received || !expected) return false;

  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export async function POST(request) {
  const secret = request.headers.get("x-inner-tide-secret");
  if (!secretsMatch(secret, process.env.REVALIDATE_SECRET)) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { revalidated: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!["post", "service"].includes(body.type)) {
    return Response.json(
      { revalidated: false, error: "Unsupported content type" },
      { status: 400 },
    );
  }

  revalidateTag("wordpress", "max");
  revalidateTag(body.type === "post" ? "posts" : "services", "max");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  if (body.type === "post") {
    revalidatePath("/blog");
    revalidatePath("/news");
    if (body.slug) revalidatePath(`/blog/${body.slug}`);
  } else {
    revalidatePath("/services");
    if (body.slug) revalidatePath(`/services/${body.slug}`);
  }

  return Response.json({ revalidated: true, type: body.type });
}

