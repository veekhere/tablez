import { configureStore } from '@reduxjs/toolkit';
import { columnDescriptorsSlice } from './slices/column-descriptors.slice';
import { loaderSlice } from './slices/loader.slice';
import { columnTemplateSlice } from './slices/column-template.slice';

const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    columnDescriptors: columnDescriptorsSlice.reducer,
    tableTemplates: columnTemplateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
