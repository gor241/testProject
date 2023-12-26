import { configureStore } from '@reduxjs/toolkit';
import firstSlice from './redusers/firstReduser';

export const store = configureStore({
    reducer: {
        firstSlice: firstSlice,
    },
});

// Экспортируем тип RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
