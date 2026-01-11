import React from 'react';

export default function CategorySelect({ onCategoryChange, category }) {
  return (
    <fieldset className="m-4 flex flex-col items-center gap-2 text-base text-amber-900 [$_input]:appearance-none">
      <legend className="font-xl p-4 font-semibold">Select a category</legend>
      <label className="mb-2 flex w-full max-w-lg flex-row-reverse items-center justify-between border-2 border-amber-900 px-8 py-4 has-checked:border-[3px] has-checked:bg-amber-100">
        <input
          type="radio"
          id="names"
          name="category"
          value="names"
          className="peer sr-only"
          checked={category === 'names'}
          onChange={onCategoryChange}
        />
        <div className="h-4 w-4 border-2 border-amber-900 peer-checked:bg-amber-900"></div>
        <span className="font-semibold peer-checked:font-bold">Names</span>
      </label>
      <label className="mb-2 flex w-full max-w-lg flex-row-reverse items-center justify-between border-2 border-amber-900 px-8 py-4 has-checked:border-[3px] has-checked:bg-amber-100">
        <input
          type="radio"
          id="animals"
          name="category"
          value="animals"
          className="peer sr-only"
          checked={category === 'animals'}
          onChange={onCategoryChange}
        />
        <div className="h-4 w-4 border-2 border-amber-900 peer-checked:bg-amber-900"></div>
        <span className="font-semibold peer-checked:font-bold">Animals</span>
      </label>
      <label className="mb-2 flex w-full max-w-lg flex-row-reverse items-center justify-between border-2 border-amber-900 px-8 py-4 has-checked:border-[3px] has-checked:bg-amber-100">
        <input
          type="radio"
          id="places"
          name="category"
          value="places"
          className="peer sr-only"
          checked={category === 'places'}
          onChange={onCategoryChange}
        />
        <div className="h-4 w-4 border-2 border-amber-900 peer-checked:bg-amber-900"></div>
        <span className="font-semibold peer-checked:font-bold">Places</span>
      </label>
      <label className="mb-2 flex w-full max-w-lg flex-row-reverse items-center justify-between border-2 border-amber-900 px-8 py-4 has-checked:border-[3px] has-checked:bg-amber-100">
        <input
          type="radio"
          id="things"
          name="category"
          value="things"
          className="peer sr-only"
          checked={category === 'things'}
          onChange={onCategoryChange}
        />
        <div className="h-4 w-4 border-2 border-amber-900 peer-checked:bg-amber-900"></div>
        <span className="font-semibold peer-checked:font-bold">Things</span>
      </label>
    </fieldset>
  );
}
