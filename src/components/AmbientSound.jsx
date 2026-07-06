import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Generates a soft, looping ambient pad entirely in-browser (Web Audio API) —
// no external music file needed. To use a real track instead, drop an mp3 into
// /public and replace this component with a plain <audio src="/your-track.mp3" loop />.
export default function AmbientSound() {
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const buildPad = (ctx, masterGain) => {
    // A gentle, slightly detuned chord (soft major-ish pad), each voice with its
    // own slow volume drift so it doesn't feel static.
    const notes = [130.81, 164.81, 196.0, 261.63]; // C3, E3, G3, C4

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const voiceGain = ctx.createGain();
      voiceGain.gain.value = 0.0;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;

      osc.connect(filter);
      filter.connect(voiceGain);
      voiceGain.connect(masterGain);

      osc.start();

      // Slow fade-in, then a gentle continuous breathing motion in volume.
      const now = ctx.currentTime;
      voiceGain.gain.linearRampToValueAtTime(0.05, now + 3 + i * 0.5);

      const drift = () => {
        const t = ctx.currentTime;
        const target = 0.03 + Math.random() * 0.04;
        voiceGain.gain.linearRampToValueAtTime(target, t + 4 + Math.random() * 3);
      };
      const interval = setInterval(drift, 6000 + i * 700);
      osc._driftInterval = interval;
    });
  };

  const start = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.resume();
      return;
    }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);

    buildPad(ctx, masterGain);

    audioCtxRef.current = ctx;
    masterGainRef.current = masterGain;
  };

  useEffect(() => {
    try {
      start();
      setNeedsGesture(false);
    } catch (err) {
      // Autoplay blocked — wait for a user gesture instead.
      setNeedsGesture(true);
    }

    return () => {
      audioCtxRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnableSound = () => {
    start();
    setNeedsGesture(false);
  };

  const toggleMute = () => {
    if (!masterGainRef.current) return;
    const next = !muted;
    masterGainRef.current.gain.value = next ? 0 : 0.5;
    setMuted(next);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {needsGesture && (
        <button
          onClick={handleEnableSound}
          className="rounded-full border border-white/10 bg-void-light px-4 py-2 text-xs text-parchment/70 shadow-md"
        >
          Tap for ambient sound
        </button>
      )}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background sound' : 'Mute background sound'}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-void-light text-indigo shadow-md transition-colors hover:bg-white/10"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}
