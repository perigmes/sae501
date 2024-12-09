import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReservations } from '../features/tickets/ticketAsyncAction';
import { selectReservations, selectIsLoading } from '../features/tickets/ticketSelector';
import { selectReservation } from '../features/tickets/ticketSlice';
import TicketsList from '../components/TicketsList';
import TicketsView from '../components/TicketsView';

const Reservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const isLoading = useSelector(selectIsLoading);
  const selectedReservation = useSelector((state) => state.reservations.selectedReservation);

  useEffect(() => {
    if (reservations.length === 0) {
      dispatch(loadReservations());
    }
  }, [dispatch, reservations]);

  const handleReservationClick = (reservation) => {
    dispatch(selectReservation(reservation));
  };

  return isLoading ? (
    <div>Chargement des réservations...</div>
  ) : (
    <div className="reservations-page">
      <div className="list-container">
        <TicketsList
          reservations={reservations}
          onReservationClick={handleReservationClick}
        />
      </div>
      <div className="details-container">
        {selectedReservation ? (
          <TicketsView reservation={selectedReservation} />
        ) : (
          <div>Sélectionnez une réservation pour voir les détails</div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
