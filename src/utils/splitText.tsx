import React from 'react';

/**
 * Split text into individually animated characters.
 * Each character is wrapped in a mask (overflow:hidden) containing a movable inner span.
 * GSAP targets the inner `.char` spans for y-translate reveals.
 */
export const splitText = (text: string) => {
  return text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={index} style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>;
    }
    return (
      <span key={index} style={{ display: 'inline-block', overflow: 'hidden' }}>
        <span style={{ display: 'inline-block' }} className="char">
          {char}
        </span>
      </span>
    );
  });
};

/**
 * Split text into individually animated words.
 * Each word is wrapped in a mask (overflow:hidden) containing a movable inner span.
 * GSAP targets the inner `.word` spans for y-translate reveals.
 * More performant than character-level for long paragraphs.
 */
export const splitWords = (text: string) => {
  return text.split(' ').map((word, index) => (
    <span key={index} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
      <span style={{ display: 'inline-block' }} className="word">
        {word}
      </span>
    </span>
  ));
};
