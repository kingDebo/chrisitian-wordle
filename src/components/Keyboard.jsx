import { motion } from 'motion/react';
import { memo, useState, useRef } from 'react';

import cn from '../utils';
import Delete from '../assets/delete.svg?react';
import { Fragment } from 'react';

export default function Keyboard({ activeKey, wordAttempts, targetWord }) {
  const keyboardKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    [' ', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ' '],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ];

  const [highlights, setHighlights] = useState({});
  const prevWordAttempts = useRef(wordAttempts.length);

  if (prevWordAttempts.current !== wordAttempts.length) {
    prevWordAttempts.current = wordAttempts.length;
    generateHighlights();
  }

  function generateHighlights() {
    if (wordAttempts.length <= 1) return;

    setHighlights((currentHighlights) => {
      const tempHighlights = { ...currentHighlights };
      const wordAttempt = wordAttempts[wordAttempts.length - 2];
      for (let x = 0; x < targetWord.length; x++) {
        const correctChar = targetWord.charAt(x);
        const guessedChar = wordAttempt.charAt(x);

        if (guessedChar === correctChar) {
          // ✅ Mark green for correct letters in the correct position
          tempHighlights[guessedChar] = 'bg-green-500 text-green-900';
        } else if (
          targetWord.includes(guessedChar) &&
          tempHighlights[guessedChar] !== 'bg-green-500 text-green-900'
        ) {
          // 🟡 Mark yellow if in the word but in the wrong position
          tempHighlights[guessedChar] = 'bg-amber-500 text-amber-900';
        } else if (
          !targetWord.includes(guessedChar) &&
          !tempHighlights[guessedChar]
        ) {
          // 🔳 Mark gray only if the letter isn't already green or yellow
          tempHighlights[guessedChar] = 'bg-neutral-500 text-amber-50';
        }
      }

      return { ...tempHighlights };
    });
  }

  return (
    <div className="flex h-1/4 w-full max-w-xl min-w-0 flex-col items-center gap-1">
      {keyboardKeys.map((keyRow, row) => (
        <div key={row} className={cn(`flex h-full w-full gap-0.5 sm:gap-1`)}>
          {keyRow.map((key, index) => (
            <KeyboardKey
              row={row}
              key={key}
              offset={Math.ceil((12 - keyRow.length) / 2) + index}
              letter={key}
              isActive={activeKey.toUpperCase() === key.toUpperCase()}
              highlight={highlights[key]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const KeyboardKey = memo(function KeyboardKey({
  letter,
  isActive,
  offset,
  highlight,
  row,
}) {
  function handleMouseDown(key) {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: key,
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  function handleMouseUp(key) {
    window.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: key,
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  return (
    <>
      <motion.button
        animate={{ scale: isActive ? 0.75 : 1 }}
        whileTap={{ scale: 0.92 }}
        onMouseDown={() => handleMouseDown(letter)}
        onMouseUp={() => handleMouseUp(letter)}
        style={{
          gridColumnStart: offset,
        }}
        className={cn(
          `grid h-full min-w-fit flex-1 cursor-pointer place-content-center rounded-sm bg-amber-900 text-base leading-12 text-amber-50`,
          (letter === 'Enter' || letter === 'Backspace') && 'flex-[1.5]',
          letter === ' ' && 'flex-[.5] bg-transparent',
          highlight,
          isActive && 'bg-amber-500',
        )}
      >
        {letter !== 'Backspace' ? (
          letter
        ) : (
          <Fragment>
            <Delete className="stroke-1 text-[2px] text-amber-50" />
          </Fragment>
        )}
      </motion.button>
    </>
  );
});
