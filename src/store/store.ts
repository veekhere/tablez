import { configureStore } from '@reduxjs/toolkit';
import { columnDescriptorsSlice } from './slices/column-descriptors.slice';
import { loaderSlice } from './slices/loader.slice';

const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    columnDescriptors: columnDescriptorsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
