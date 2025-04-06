import clsx from 'clsx';
import { useState } from 'react';
import categories from './words.json';

import { twMerge } from 'tailwind-merge';

export default function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const chances = 6;
export const matcher = new RegExp('^[A-Za-z]$');

export const getAllNames = () => {
  return Array.from(
    Object.values(categories).flatMap((category) => {
      return category.map((entry) => {
        return entry.name.toUpperCase();
      });
    }),
  );
};

export const getNamesByCategory = (category) => {
  return Array.from(
    categories[category].map((entry) => {
      return entry.name.toUpperCase();
    }),
  );
};

export const getCategories = () => Object.keys(categories);

export const getRandomCategory = () => {
  const index = getRandomNumber(0, getCategories().length - 1);
  return getCategories()[index];
};

export const getRandomWord = () => {
  const category = getRandomCategory();
  const index = getRandomNumber(0, categories[category].length);
  return categories[category][index];
};
