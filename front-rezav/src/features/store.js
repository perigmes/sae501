import { configureStore } from "@reduxjs/toolkit";
import demandeReducer from './demande/demandeSlice'

const store = configureStore({
    reducer: {
        demande: demandeReducer,
    }
})

export default store;