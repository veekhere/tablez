import { StoreConstants } from '@constants';
import { ColumnDescriptor } from '@domain/column-descriptor.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColumnDescriptorState = {
  descriptors: ColumnDescriptor[];
};

const initialState: ColumnDescriptorState = {
  descriptors: [],
};

export const columnDescriptorsSlice = createSlice({
  name: StoreConstants.COLUMN_DESCRIPTORS,
  initialState,
  selectors: {
    getColumnDescriptors: (state) => state.descriptors,
    getColumnDescriptorById: (state, id: string) => state.descriptors.find((d) => d.id === id) ?? null,
  },
  reducers: {
    setColumnDescriptors: (state, action: PayloadAction<ColumnDescriptor[]>) => {
      state.descriptors = action.payload;
    },
    clearColumnDescriptors: (state) => {
      state.descriptors = [];
    },
    addColumnDescriptor: (state, action: PayloadAction<ColumnDescriptor>) => {
      state.descriptors.push(action.payload);
    },
    updateColumnDescriptor: (state, action: PayloadAction<ColumnDescriptor>) => {
      const index = state.descriptors.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.descriptors[index] = action.payload;
      }
    },
    deleteColumnDescriptors: (state, action: PayloadAction<string[]>) => {
      state.descriptors = state.descriptors.filter((d) => !action.payload.some((id) => d.id === id));
    },
  },
});

export const { setColumnDescriptors, clearColumnDescriptors, addColumnDescriptor, updateColumnDescriptor, deleteColumnDescriptors } = columnDescriptorsSlice.actions;

export const { getColumnDescriptors, getColumnDescriptorById } = columnDescriptorsSlice.selectors;
