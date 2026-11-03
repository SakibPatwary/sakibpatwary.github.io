import { useCallback, useEffect, useRef, useState } from "react";
import { TOUR_DURATION } from "../content";
import { nextProjectIndex } from "../player-utils";

// Playback is a guided project tour. Audio is optional, synthesized locally,
// and only enabled by a visitor gesture. No external audio is fetched.
export default function usePlayer(projects) {
  const [index, setIndex] = useState(-1);
  const [queue, setQueue] = useState(() =>
    projects.map((project) => project.id),
  );
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0);
  const [audioError, setAudioError] = useState("");
  const audio = useRef(null);
  const previousVolume = useRef(25);
  const current = index >= 0 ? projects[index] : null;

  const select = useCallback(
    (project, start = true) => {
      setQueue(projects.map((item) => item.id));
      setIndex(project.id);
      setProgress(0);
      setPlaying(start);
    },
    [projects],
  );
  const playCollection = (collection, random = false) => {
    if (!collection.length) return;
    setQueue(collection.map((project) => project.id));
    setIndex(
      collection[random ? Math.floor(Math.random() * collection.length) : 0].id,
    );
    setShuffle(random);
    setProgress(0);
    setPlaying(true);
  };
  const advance = useCallback(
    (direction = 1) => {
      setIndex(
        (previous) =>
          queue[
            nextProjectIndex(
              queue.indexOf(previous),
              queue.length,
              direction,
              shuffle,
            )
          ],
      );
      setProgress(0);
    },
    [queue, shuffle],
  );
  const pause = useCallback(() => setPlaying(false), []);
  const toggle = () => {
    if (index < 0) setIndex(0);
    setPlaying((value) => !value);
  };

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(
      () => setProgress((value) => Math.min(TOUR_DURATION, value + 1)),
      1000,
    );
    return () => clearInterval(interval);
  }, [playing]);
  useEffect(() => {
    if (progress < TOUR_DURATION || !playing) return;
    if (repeat) setProgress(0);
    else if (index === queue[queue.length - 1] && !shuffle) {
      setPlaying(false);
      setProgress(0);
    } else advance();
  }, [progress, playing, repeat, index, queue, shuffle, advance]);

  async function changeVolume(value) {
    const next = Number(value);
    if (next > 0 && !audio.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        const gain = context.createGain();
        gain.gain.value = 0;
        gain.connect(context.destination);
        const oscillators = [130.81, 164.81, 196].map((frequency) => {
          const oscillator = context.createOscillator();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          oscillator.connect(gain);
          oscillator.start();
          return oscillator;
        });
        audio.current = { context, gain, oscillators };
        await context.resume();
      } catch {
        setAudioError(
          "Ambient audio is unavailable in this browser. The project tour still works.",
        );
        return;
      }
    }
    if (audio.current) await audio.current.context.resume().catch(() => {});
    setVolume(next);
    if (next > 0) previousVolume.current = next;
  }
  useEffect(() => {
    if (audio.current) {
      const { gain, context } = audio.current;
      gain.gain.setTargetAtTime(
        playing ? (volume / 100) * 0.035 : 0,
        context.currentTime,
        0.12,
      );
    }
  }, [volume, playing]);
  useEffect(
    () => () => {
      if (audio.current) {
        audio.current.oscillators.forEach((oscillator) => oscillator.stop());
        audio.current.context.close();
      }
    },
    [],
  );
  return {
    current,
    playing,
    progress,
    shuffle,
    repeat,
    volume,
    audioError,
    select,
    playCollection,
    advance,
    toggle,
    pause,
    setProgress,
    setShuffle,
    setRepeat,
    changeVolume,
    toggleMute: () => changeVolume(volume ? 0 : previousVolume.current),
    startShuffle: () => playCollection(projects, true),
  };
}
