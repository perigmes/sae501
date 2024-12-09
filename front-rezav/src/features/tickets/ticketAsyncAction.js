import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk(
    'reservations/fetchReservations',
    async () => {
      const response = await fetch('./assets/data/reservation.json');
      const data = await response.json();
      return data;
    }
  );
  