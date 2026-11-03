import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const submitting = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
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
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send("service_ia2hlis", "template_2bqei6g", values, {
        publicKey: "7AoPx5yHyJm_X2h59",
      });
      form.reset();
      setStatus({
        state: "success",
        message: "Thanks for reaching out. Your message has been sent!",
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "Your message could not be sent. Please try again or use the email link.",
      });
    } finally {
      submitting.current = false;
    }
  }
  return (
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
  );
}
