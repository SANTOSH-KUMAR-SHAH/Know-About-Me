import React from 'react';

// Split Devanagari into grapheme clusters for per-character animation.
// Using Intl.Segmenter if available (modern browsers), fallback to codepoints.
function splitGraphemes(str: string): string[] {
  if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
    const segmenter = new (Intl as any).Segmenter('hi', { granularity: 'grapheme' });
    return [...segmenter.segment(str)].map((s: any) => s.segment);
  }
  return [...str];
}

const PHILOSOPHY = 'अनुगच्छतु प्रवाहं';
const chars = splitGraphemes(PHILOSOPHY);

const Navbar: React.FC = () => {
  return (
    <nav className="site-navbar">
      <div className="navbar-logo">SANTOSH</div>

      <div className="navbar-philosophy-block">
        {/* The wave shimmer — each grapheme cluster gets a staggered animation */}
        <div className="navbar-devanagari" aria-label={PHILOSOPHY}>
          {chars.map((ch, i) =>
            ch === ' ' ? (
              <span key={i} className="devanagari-space"> </span>
            ) : (
              <span
                key={i}
                className="devanagari-char"
                style={{ animationDelay: `${i * 0.11}s` }}
              >
                {ch}
              </span>
            )
          )}
        </div>

        {/* Whispered translation — sits quietly below */}
        <span className="navbar-translation">Follow the Flow</span>
      </div>
    </nav>
  );
};

export default Navbar;
