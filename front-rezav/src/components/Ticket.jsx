import { useSelector } from "react-redux";
import { selectStatusColor } from "../features/tickets/ticketSelector";

function Ticket(reservation, onClick){

    const handleIconClick = () => {
        onClick(reservation);
    };
    const statusColor = useSelector((state) => 
        selectStatusColor(reservation.idStatus)(state)
    );
    
    return(
        <div className="ticket" onClick={handleIconClick}>
            <h3>{reservation.projectName}</h3>
            <span className="datetime">Date : {new Date(reservation.reservationDate).toLocaleDateString()} au {new Date(reservation.returnDate).toLocaleDateString()}</span>
            <span className="material-icons-round">arrow_forward_ios</span>
            <div className="color-status" style={{ backgroundColor: statusColor}}></div>
        </div>
    );
}
export default Ticket;