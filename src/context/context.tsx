import { createContext } from 'react';

export const Context = createContext<any | null>(null);
Context.displayName = 'Context';
