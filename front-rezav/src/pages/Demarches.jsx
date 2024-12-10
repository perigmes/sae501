import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReservations } from '../features/tickets/ticketAsyncAction';
import { selectReservations, selectIsLoading, selectSelectedReservation } from '../features/tickets/ticketSelector';
import { selectReservation } from '../features/tickets/ticketSlice';
import TicketsList from '../components/TicketsList';
import TicketsDetails from '../components/TicketDetails';

const Demarches = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const isLoading = useSelector(selectIsLoading);
  const selectedReservation = useSelector(selectSelectedReservation);

  console.log('reservations : ', reservations);

  useEffect(() => {
    if (reservations.length === 0) {
      dispatch(loadReservations());
    }
  }, [dispatch, reservations]);

  return isLoading ? (
    <div>Chargement des réservations...</div>
  ) : (
    <div className="reservations-page">
      <div className="list-container">
        <TicketsList
          reservations={reservations}
        />
      </div>
      <div className="details-container">
        {selectedReservation ? (
          <TicketsDetails reservation={selectedReservation} />
        ) : (
          <div>Sélectionnez une réservation pour voir les détails</div>
        )}
      </div>
    </div>
  );
};

export default Demarches;
