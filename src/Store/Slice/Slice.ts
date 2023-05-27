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
    updateCard: (state, action) => {
      const newCardData = action.payload || {};

      let filteredCardData = state.data.filter(
        (item: any) => item?.id !== newCardData?.id,
      );

      filteredCardData?.splice(newCardData?.id - 1, 0, newCardData);
      state.data = filteredCardData;
    },
  },
});

export const {setCardData, removeCard, updateCard} = slice.actions;

export default slice.reducer;
