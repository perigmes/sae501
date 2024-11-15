<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import filmReducer from './film/filmSlice'

const store = configureStore({
    reducer: {
    }
})
=======
import { configureStore } from "@reduxjs/toolkit";
import demandeReducer from './demande/demandeSlice'

const store = configureStore({
    reducer: {
        demande: demandeReducer,
    }
})

>>>>>>> 38c464372ebf750c606c07e33d1c6184989f7512
export default store;