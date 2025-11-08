import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import categories from './words.json';
import { Toaster, toast } from 'sonner';
import { RotateCwIcon } from 'lucide-react';
import { motion } from 'motion/react';

import './App.css';
import Guess from './components/Guess';
import Keyboard from './components/Keyboard';
import {
  getRandomNumber,
  chances,
  matcher,
  getRandomCategory,
  getNamesByCategory,
} from './utils';
import Birds from './components/Birds';
import { useRef } from 'react';
import Dialog, { LossDialog } from './components/Dialog';
import Board from './components/Board';

function App() {
  const [wordAttempts, setWordAttempts] = useState(['']);
  const [hasWon, setHasWon] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeKey, setActiveKey] = useState('');
  const [shouldGenerateWord, setShouldGenerateWord] = useState(true);
  const [targetWord, setTargetWord] = useState('');
  const dialogRef = useRef(null);
  const lossDialogRef = useRef(null);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const currentAttempts = wordAttempts.length - 1;

  if (shouldGenerateWord) {
    const category = getRandomCategory();
    console.log('Category: ' + category);
    const index = getRandomNumber(0, categories[category].length);
    const word = categories[category][index];
    setTargetWord({
      ...word,
      name: word.name.toUpperCase(),
      category: category,
    });
    setTargetWord((g) => {
      console.log(g.name);
      return g;
    });
    setShouldGenerateWord(false);
  }

  function resetGame() {
    setWordAttempts(['']);
    setHasWon(null);
    setShouldGenerateWord(true);
    setShowConfetti(false);
  }

  function handleSubmit() {
    if (
      !getNamesByCategory(targetWord.category).includes(
        wordAttempts[currentAttempts],
      )
    ) {
      toast.error(
        `Sorry, ${wordAttempts[currentAttempts]} is not in our '${targetWord.category}' list`,
      );
      return;
    }
    setWordAttempts((w) => [...w, '']); //Create a new attempt
    if (wordAttempts[currentAttempts] === targetWord.name) {
      setHasWon(true);
    } else if (currentAttempts >= chances - 1) {
      lossDialogRef.current.showModal();
    }
  }

  function handleKeystroke(event) {
    if (hasWon) {
      toast("You've already won!");
      return;
    }

    const letterCount = targetWord?.name.length;
    setActiveKey(event.key);

    if (event.key === 'Enter') {
      if (wordAttempts[currentAttempts].length === letterCount) {
        handleSubmit();
        return;
      }
    }

    setWordAttempts((words) => {
      if (matcher.test(event.key)) {
        if (wordAttempts[currentAttempts].length === letterCount) {
          return words;
        }
        //add a letter
        return words.map((word, index) => {
          if (index === currentAttempts) {
            return (word += event.key.toUpperCase());
          } else {
            return word;
          }
        });
      } else if (event.key === 'Backspace') {
        return words.map((word, index) => {
          if (index === currentAttempts) {
            return word.slice(0, word.length - 1);
          } else {
            return word;
          }
        });
      } else {
        return words;
      }
    });
  }

  function handleKeyUp() {
    if (hasWon) {
      return;
    }
    setActiveKey('');
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeystroke);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeystroke);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, [handleKeystroke]);

  useEffect(() => {
    if (hasWon) {
      setShowConfetti(true);
    }
  }, [hasWon]);

  return (
    <div className="App flex h-full w-full overflow-hidden p-2 sm:p-8">
      <Dialog ref={dialogRef} targetWord={targetWord} />
      <LossDialog ref={lossDialogRef} targetWord={targetWord} />
      <div className="absolute">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor: 'oklch(96.2% 0.059 95.617)',
              color: 'oklch(27.9% 0.077 45.635)',
              border: 'transparent',
            },
          }}
        />
      </div>
      <Birds />
      <img
        className="absolute inset-0 -z-20 h-screen w-screen text-amber-900"
        src="/Background.webp"
        srcSet="Background@2x.webp 2x, 
                /Background@3x.webp 3x"
        alt="Background Image - Desert Landscape"
      />
      {showConfetti && (
        <Confetti
          numberOfPieces={300}
          recycle={false}
          height={height}
          width={width}
          initialVelocityY={{ min: 1, max: 13 }}
          tweenDuration={800}
          onConfettiComplete={() => dialogRef.current.showModal()}
        />
      )}
      <div className="relative top-1/2 flex h-[min(750px,100vh)] w-full -translate-y-1/2 transform flex-col items-center justify-around bg-amber-50 p-2">
        <h1 className="font-neuton min-h-0 w-full flex-shrink text-center text-5xl leading-[-4%] font-extrabold text-amber-900">
          Bible Wordle
        </h1>
        <Board
          chances={chances}
          wordAttempts={wordAttempts}
          targetWord={targetWord}
          currentAttempts={currentAttempts}
          hasWon={hasWon}
        />
        {currentAttempts >= chances || hasWon ? (
          <div>
            <motion.button
              onTap={resetGame}
              whileTap={{
                scale: 0.98,
              }}
              className="rounded-sm bg-amber-900 px-4 py-2 text-amber-50"
            >
              Start a new game
              <RotateCwIcon className="inline pl-1 group-active:animate-spin" />
            </motion.button>
          </div>
        ) : (
          <Keyboard
            activeKey={activeKey}
            wordAttempts={wordAttempts}
            targetWord={targetWord.name}
          />
        )}
      </div>
    </div>
  );
}

export default App;
