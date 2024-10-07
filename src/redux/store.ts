import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import exampleReducer from './slices/exampleSlice';
import { createWrapper } from 'next-redux-wrapper';

export const createStore = () =>
  configureStore({
    reducer: {
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }),
  });


export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>; 
export type AppDispatch = AppStore['dispatch']; 

export const wrapper = createWrapper<AppStore>(createStore);

export const store = createStore(); 
export const persistor = persistStore(store);
