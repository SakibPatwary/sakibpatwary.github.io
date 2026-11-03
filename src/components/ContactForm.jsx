import { useRef, useState } from "react";
import { ArrowUpRight, CircleCheck } from "lucide-react";
import emailjs from "@emailjs/browser";

function sendContactMessage(values) {
  return emailjs.send("service_ia2hlis", "template_2bqei6g", values, {
    publicKey: "7AoPx5yHyJm_X2h59",
  });
}

export default function ContactForm({ sendMessage = sendContactMessage }) {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const submitting = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(
      [...new FormData(form)].map(([key, value]) => [key, value.trim()]),
    );
    if (Object.values(values).some((value) => !value.trim())) {
      setStatus({
        state: "error",
        message: "Please complete every field with a name, email, and message.",
      });
      return;
    }
    submitting.current = true;
    setStatus({ state: "sending", message: "Sending your message…" });
    try {
      await sendMessage(values);
      form.reset();
      setStatus({
        state: "success",
        message: "Thanks for reaching out. Your message has been sent!",
      });
    } catch (error) {
      // Keep provider diagnostics available without logging the visitor's message.
      console.error("Contact delivery failed", {
        status: error?.status ?? "network",
        reason: error?.text ?? error?.message ?? "Unknown delivery error",
      });
      setStatus({
        state: "error",
        message:
          "Your message could not be sent. Please try again or use the email link.",
      });
    } finally {
      submitting.current = false;
    }
  }
  if (status.state === "success") {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <span className="contact-success-icon">
          <CircleCheck size={46} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <h2>Message sent!</h2>
        <p>{status.message}</p>
      </div>
    );
  }
  return (
    <>
      <p className="eyebrow">THE NEXT TRACK STARTS HERE</p>
      <h2>Send a message</h2>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              required
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              required
              maxLength={200}
            />
          </label>
        </div>
        <label>
          What do you have in mind?
          <textarea
            name="message"
            placeholder="Tell me a little about your project…"
            rows="4"
            required
            maxLength={5000}
          />
        </label>
        <div className="form-bottom">
          <p
            className={
              status.state === "error" ? "form-status error" : "form-status"
            }
            role="status"
            aria-live="polite"
          >
            {status.message ||
              "A good conversation is where great projects begin."}
          </p>
          <button
            type="submit"
            className="button primary"
            disabled={status.state === "sending"}
          >
            {status.state === "sending" ? "Sending…" : "Send message"}
            <ArrowUpRight size={17} />
          </button>
        </div>
      </form>
    </>
  );
}
