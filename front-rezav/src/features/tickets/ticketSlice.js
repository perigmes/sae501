import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    selectedReservation: null,
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    selectReservation: (state, action) => {
      state.selectedReservation = action.payload;
    },
  },
});

export const { setReservations, selectReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;
