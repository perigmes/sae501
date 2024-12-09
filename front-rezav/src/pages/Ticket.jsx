import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../features/tickets/ticketAsyncAction';
import TicketsList from '../components/TicketsList';
import TicketsView from '../components/TicketsView'

const UserReservations = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reservations.loading);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (loading) {
    return <div>Chargement des réservations...</div>;
  }

  return (
    <div className="user-reservations">
      <div className="list-container">
        <TicketsList/>
      </div>
      <div className="details-container">
        <TicketsView/>
      </div>
    </div>
  );
};

export default UserReservations;
