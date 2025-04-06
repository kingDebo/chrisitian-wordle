import { memo, useEffect } from 'react';
import { motion } from 'motion/react';
import cn from './utils';
import { useState } from 'react';
import { useRef } from 'react';

export default memo(function Guess({ isSubmitted, guess, targetWord }) {
  const [highlights, setHighlights] = useState([]);
  const prevIsSubmitted = useRef(isSubmitted);

  if (isSubmitted !== prevIsSubmitted.current) {
    prevIsSubmitted.current = isSubmitted;
    isSubmitted && generateHighlights();
  }

  function generateHighlights() {
    const tempHighlights = Array(5).fill('bg-neutral-500 text-amber-50');
    const letterOccurences = {};

    //Green pass
    for (let x = 0; x < targetWord.length; x++) {
      const targetChar = targetWord.charAt(x);
      const guessChar = guess.charAt(x);

      if (targetChar === guessChar) {
        tempHighlights[x] = 'bg-green-500 text-green-900';
      } else {
        letterOccurences[targetChar] = (letterOccurences[targetChar] || 0) + 1;
      }
    }

    //Yellow pass
    for (let x = 0; x < targetWord.length; x++) {
      const guessChar = guess.charAt(x);
      if (
        guessChar === '' ||
        !guessChar ||
        tempHighlights[x] === 'bg-green-500 text-green-900'
      ) {
        continue;
      }
      if (targetWord.includes(guessChar) && letterOccurences[guessChar]) {
        tempHighlights[x] = 'bg-amber-500';
        letterOccurences[guessChar]--;
      }
    }
    console.log(tempHighlights);
    setHighlights(tempHighlights);
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <motion.div
            key={index}
            className={cn(
              'grid aspect-square place-content-center border-2 border-amber-900 text-2xl font-semibold text-amber-900',
              highlights[index],
              highlights[index] ? 'border-0' : '',
            )}
          >
            {guess?.charAt(index)}
          </motion.div>
        );
      })}
    </div>
  );
});

const letterBox = {
  backgroundColor: 'gray',
  color: 'white',
  display: 'grid',
  placeContent: 'center',
  transition: 'background-color 500ms ease-in',
};
