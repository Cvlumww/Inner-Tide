"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get("name")?.toString()?.trim() ?? "";
    const email = data.get("email")?.toString()?.trim() ?? "";
    const body = data.get("message")?.toString()?.trim() ?? "";

    if (!name || !email || !body) {
      setStatus("error");
      setMessage("Please fill in name, email, and message.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: body }),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("Thank you. Your message has been sent.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Failed to send. Please try again.");
    }
  }

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-heading">Contact</h2>
      <p className="contact-subheading">
        Send your enquiry and we&apos;ll get back to you.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            required
            disabled={status === "sending"}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            required
            disabled={status === "sending"}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            required
            rows={4}
            disabled={status === "sending"}
          />
        </label>
        {message && (
          <p
            className={
              status === "error"
                ? "contact-feedback-error"
                : "contact-feedback-success"
            }
          >
            {message}
          </p>
        )}
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </section>
  );
}
