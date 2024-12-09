import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectReservations } from '../features/tickets/ticketSelector ';

function TicketsList(){
    const dispactch = useDispatch();
    const reservations = useSelector(selectReservations())

    return(
         <div className='reservationList'>
            {
                reservations.map((reservation) => {

                })
            }

         </div>
    );
}
export default TicketsList;