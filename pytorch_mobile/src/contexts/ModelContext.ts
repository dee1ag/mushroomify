import React, { MutableRefObject } from 'react';
import { Module } from 'react-native-pytorch-core';
import { SavedResult } from '../types/types';

type TModelContext = {
  model: MutableRefObject<Module | null>;
  isLoading: boolean;
  results: SavedResult[];
  setResults: React.Dispatch<React.SetStateAction<SavedResult[]>>;
};

export const ModelContext = React.createContext<TModelContext>({
  model: { current: null },
  isLoading: true,
  results: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setResults: () => {},
});

export const ModelProvider = ModelContext.Provider;
