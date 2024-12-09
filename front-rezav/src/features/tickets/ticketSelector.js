export const selectReservations = (state) => state.reservations.reservations;
export const selectIsLoading = (state) => state.reservations.isLoading;
export const selectStatusColor = (statusId) => (state) => state.reservations.statusColors[statusId] || "gray";