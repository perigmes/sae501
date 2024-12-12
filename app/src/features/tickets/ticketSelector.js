export const selectReservations = (state) => state.ticket.reservations;
export const selectIsLoading = (state) => state.ticket.isLoading;
export const selectStatusColor = (statusId) => (state) => state.ticket.statusColors[statusId] || "gray";
export const selectSelectedReservation = (state) => state.ticket.selectedReservation;