import { StoreConstants } from '@constants';
import { TableTemplate } from '@domain/table-template.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableTemplateState = {
  templates: TableTemplate[];
};

const initialState: TableTemplateState = {
  templates: [],
};

export const columnTemplateSlice = createSlice({
  name: StoreConstants.TABLE_TEMPLATES,
  initialState,
  selectors: {
    getTableTemplates: (state) => state.templates,
    getTableTemplateById: (state, id: string) => state.templates.find((t) => t.id === id) ?? null,
  },
  reducers: {
    setTableTemplates: (state, action: PayloadAction<TableTemplate[]>) => {
      state.templates = action.payload;
    },
    clearTableTemplates: (state) => {
      state.templates = [];
    },
    addTableTemplate: (state, action: PayloadAction<TableTemplate>) => {
      state.templates.push(action.payload);
    },
    updateTableTemplate: (state, action: PayloadAction<TableTemplate>) => {
      const index = state.templates.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.templates[index] = action.payload;
      }
    },
    deleteTableTemplates: (state, action: PayloadAction<string[]>) => {
      state.templates = state.templates.filter((t) => !action.payload.some((id) => t.id === id));
    },
  },
});

export const { setTableTemplates, clearTableTemplates, addTableTemplate, updateTableTemplate, deleteTableTemplates } = columnTemplateSlice.actions;

export const { getTableTemplates, getTableTemplateById } = columnTemplateSlice.selectors;
