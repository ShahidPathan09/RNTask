import {createSlice} from '@reduxjs/toolkit';

export type UpdateCardData = {
  data: [];
};

export const slice = createSlice({
  name: 'updateData',
  initialState: {data: []},
  reducers: {
    setCardData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeCard: (state, action) => {
      const {id} = action.payload;
      state.data = state.data.filter(item => item?.id !== id);
    },
  },
});

export const {setCardData, removeCard} = slice.actions;

export default slice.reducer;
