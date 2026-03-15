import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = "emma@inner-tide.studio";

function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return Response.json(
        { error: "Email is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const html = `
      <h2>Inner Tide Studios — Contact enquiry</h2>
      <p><strong>From:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <pre>${escapeHtml(message)}</pre>
    `;

    const { data, error } = await resend.emails.send({
      from: "Inner Tide Studios <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Enquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
