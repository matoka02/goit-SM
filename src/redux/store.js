import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './auth/userReducers';
import productSlice from './product/productReducers';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['refreshToken'],
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  product: productSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoreActionPath: ['payload'],
      },
    }),
});

export const persistor = persistStore(store);