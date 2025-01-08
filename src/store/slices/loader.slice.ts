import { StoreConstants } from '@constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoaderState = {
  value: boolean;
};

const initialState: LoaderState = {
  value: false,
};

export const loaderSlice = createSlice({
  name: StoreConstants.LOADER,
  initialState,
  selectors: {
    getLoader: (state) => state.value,
  },
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export const { getLoader } = loaderSlice.selectors;
