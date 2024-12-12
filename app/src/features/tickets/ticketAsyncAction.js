import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { URL_API_RESERVATIONS } from "../../utils/config";

export const loadReservations = createAsyncThunk(
  'reservations/loadReservation',
  async (_, rejectWithValue) => {
    try{
      const response = await axios.get(`${URL_API_RESERVATIONS}/reservation`);
      return response.data;
    } catch (error) {
      return rejectWithValue("L'application est actuellement indisponible, Veuillez réessayer ultérieurement en cas de problème lors du chargement des réservations");

    } 
  }
);

export const loadReservationById = createAsyncThunk(
  'reservations/loadReservationsById',
  async (userId, rejectWithValue) => {
    try{
      const response = await axios.get(`${URL_API_RESERVATIONS}/reservation/${userId}`);
      const data = await response.json();
      return data;

    } catch (error) {
      return rejectWithValue("L'application est actuellement indisponible, Veuillez réessayer ultérieurement en cas de problème lors du chargement des réservations");

    } 
  }
);