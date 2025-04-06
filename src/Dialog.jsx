export default function Dialog({ ref, targetWord }) {
  return (
    <dialog
      ref={ref}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-md bg-amber-100 px-12 py-12 text-amber-900 backdrop:bg-amber-200/20 backdrop:backdrop-blur-xs"
    >
      <div
        onClick={() => ref.current.close()}
        className="absolute top-2 left-4 cursor-pointer"
      >
        X
      </div>
      <h1 className="text-3xl font-medium">
        <span className="text-green-700">Congratulations!</span> You've Won!
      </h1>
      <h2 className="font-serif text-3xl font-bold">{targetWord.name}</h2>
      <p>{targetWord.description}</p>
      <p>{targetWord.verse}</p>
    </dialog>
  );
}

export function LossDialog({ ref, targetWord }) {
  return (
    <dialog
      ref={ref}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-md bg-amber-100 px-12 py-12 text-amber-900 backdrop:bg-amber-200/20 backdrop:backdrop-blur-xs"
    >
      <div
        onClick={() => ref.current.close()}
        className="absolute top-2 left-4 cursor-pointer"
      >
        X
      </div>
      <h1 className="text-3xl font-medium">Uh oh, unlucky! the word was:</h1>
      <h2 className="font-serif text-3xl font-bold">{targetWord.name}</h2>
      <p>{targetWord.description}</p>
      <p>{targetWord.verse}</p>
    </dialog>
  );
}
