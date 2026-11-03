import { useEffect, useState } from "react";
import { AudioLines, ArrowRight } from "lucide-react";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const fade = setTimeout(() => setLeaving(true), 1850);
    const done = setTimeout(() => setVisible(false), 2250);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);
  if (!visible) return null;
  return (
    <div
      className={`intro ${leaving ? "intro-leaving" : ""}`}
      role="status"
      aria-label="Welcome to Sakib Patwary’s portfolio"
    >
      <AudioLines className="intro-icon" size={38} />
      <div className="typing-name">
        <span>SAKIB PATWARY</span>
      </div>
      <p>GOOD DESIGN. CLEAN CODE. ON REPEAT.</p>
      <button onClick={() => setVisible(false)}>
        Skip intro <ArrowRight size={14} />
      </button>
    </div>
  );
}
