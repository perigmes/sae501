import { configureStore } from "@reduxjs/toolkit";
import reducer from './demande/demandeSlice'
import TicketReducer from './tickets/ticketSlice'

const store = configureStore({
    reducer: {
        demande: reducer,
        ticket: TicketReducer,

    }
})
export default store;