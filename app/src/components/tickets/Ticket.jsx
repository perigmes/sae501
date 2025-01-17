import { useSelector } from "react-redux";
import { selectStatusColor } from "../../features/tickets/ticketSelector";
import { useDispatch } from "react-redux";
import { selectReservation } from "../../features/tickets/ticketSlice";


function Ticket({reservation}){
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(selectReservation(reservation))
        
    };
    const statusColor = useSelector((state) => 
        selectStatusColor(reservation.idStatus)(state)
    );
    return(
        <div className="ticket" onClick={handleClick}>
            <div className="title-ticket">
                <h3>{reservation.projectName}</h3>
                <span className="datetime2">Date : {new Intl.DateTimeFormat('fr-FR').format(new Date(reservation.reservationDate))} au {new Intl.DateTimeFormat('fr-FR').format(new Date(reservation.returnDate))}</span>
            </div>
            <span className="material-symbols-rounded">arrow_forward_ios</span>
            <div className="color-status" style={{ backgroundColor: statusColor}}></div>
        </div>
    );
}
export default Ticket;