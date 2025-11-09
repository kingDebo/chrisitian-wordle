import React from 'react';
import Guess from './Guess';

export default function Board({
  chances,
  wordAttempts,
  targetWord,
  currentAttempts,
  hasWon,
}) {
  return (
    <div
      className={`grid grid-rows-[${chances}] w-full max-w-[300px] min-w-64 gap-1 sm:w-full sm:max-w-xs md:gap-2`}
    >
      {Array.from({ length: chances }).map((_, level) => {
        return (
          <Guess
            key={level}
            guess={wordAttempts[level]}
            targetWord={targetWord.name}
            isSubmitted={currentAttempts > level}
          />
        );
      })}
      <div className="text-xs font-bold text-amber-900 capitalize">
        {hasWon || currentAttempts >= chances
          ? `Answer: ${targetWord.name}`
          : `Category: ${targetWord.category}`}
      </div>
    </div>
  );
}
