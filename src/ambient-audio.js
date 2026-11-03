// Original, locally generated piano-like notes over a slow Cmaj7 / Am7 / Fmaj7 / G6 progression.
// No downloads, third-party recordings, or autoplay.
export function createAmbientAudio(context) {
  const gain = context.createGain();
  gain.gain.value = 0;
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  const delay = context.createDelay(2);
  delay.delayTime.value = 0.54;
  const feedback = context.createGain();
  feedback.gain.value = 0.25;
  const wet = context.createGain();
  wet.gain.value = 0.22;
  filter.connect(gain);
  filter.connect(delay);
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(gain);
  gain.connect(context.destination);
  const voices = new Set();
  const chords = [
    [48, 55, 59, 64],
    [45, 52, 55, 60],
    [41, 48, 52, 57],
    [43, 50, 55, 59],
  ];
  const frequency = (note) => 440 * 2 ** ((note - 69) / 12);
  function note(midi, when, duration, level, pad = false) {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency(midi);
    envelope.gain.setValueAtTime(0, when);
    envelope.gain.linearRampToValueAtTime(level, when + (pad ? 1.8 : 0.025));
    envelope.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    oscillator.connect(envelope).connect(filter);
    voices.add(oscillator);
    oscillator.onended = () => {
      voices.delete(oscillator);
      oscillator.disconnect();
      envelope.disconnect();
    };
    oscillator.start(when);
    oscillator.stop(when + duration + 0.1);
  }
  let next = context.currentTime + 0.05;
  let bar = 0;
  function schedule() {
    while (next < context.currentTime + 1) {
      const chord = chords[bar % chords.length];
      chord.forEach((pitch) => note(pitch, next, 8, 0.13, true));
      [0, 2, 1, 3, 2, 1].forEach((position, step) => {
        note(
          chord[position] + 12,
          next + step * 1.1,
          3.5,
          step % 2 ? 0.2 : 0.28,
        );
      });
      next += 8;
      bar++;
    }
  }
  schedule();
  const timer = setInterval(schedule, 300);
  return {
    context,
    gain,
    dispose() {
      clearInterval(timer);
      voices.forEach((voice) => voice.stop());
      context.close();
    },
  };
}
