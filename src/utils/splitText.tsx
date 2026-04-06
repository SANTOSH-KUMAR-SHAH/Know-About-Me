import React from 'react';

/**
 * Split text into individually animated characters.
 * Each character is wrapped in a mask (overflow:hidden) containing a movable inner span.
 * GSAP targets the inner `.char` spans for y-translate reveals.
 */
export const splitText = (text: string) => {
  return text.split(' ').map((word, wordIndex, array) => (
    <React.Fragment key={wordIndex}>
      <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} style={{ display: 'inline-block', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block' }} className="char">
              {char}
            </span>
          </span>
        ))}
      </span>
      {wordIndex !== array.length - 1 && ' '}
    </React.Fragment>
  ));
};

/**
 * Split text into individually animated words.
 * Each word is wrapped in a mask (overflow:hidden) containing a movable inner span.
 * GSAP targets the inner `.word` spans for y-translate reveals.
 */
export const splitWords = (text: string) => {
  return text.split(' ').map((word, index, array) => (
    <React.Fragment key={index}>
      <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
        <span style={{ display: 'inline-block' }} className="word">
          {word}
        </span>
      </span>
      {index !== array.length - 1 && ' '}
    </React.Fragment>
  ));
};
