import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import userReducer from './slices/login';
import settingsReducer from './slices/settings';

const persistUserConfig = {
  key: 'user',
  storage: storageSession,
  whitelist: ['user']
};

const persistSettingsConfig = {
  key: 'settings',
  storage,
  whitelist: ['themeMode']
};

const store = configureStore({
  reducer: {
    user: persistReducer<ReturnType<typeof userReducer>>(
      persistUserConfig,
      userReducer
      ),
    settings: persistReducer<ReturnType<typeof settingsReducer>>(
      persistSettingsConfig,
      settingsReducer
    )
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export default store;
