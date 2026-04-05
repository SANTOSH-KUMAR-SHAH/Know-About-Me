import { useCallback, useRef } from 'react';

/**
 * A tiny Web Audio API synthesizer for UI sound effects.
 * Doesn't require any MP3 file downloads, making it instant and high-performance.
 */
export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  const playHoverTick = useCallback(() => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // A short, subtle "tick"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, [initAudio]);

  const playDeepWhoosh = useCallback((duration = 1.5) => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // A low, deep cinematic bass rumble/whoosh
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + duration);

    // Fade in and out
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + duration * 0.2); // Fade in
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration); // Fade out

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [initAudio]);

  return { playHoverTick, playDeepWhoosh };
};
