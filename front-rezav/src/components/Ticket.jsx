import { useSelector } from "react-redux";
import { selectStatusColor } from "../features/tickets/ticketSelector";
import { useDispatch } from "react-redux";
import { selectReservation } from "../features/tickets/ticketSlice";


function Ticket({reservation}){
    const dispatch = useDispatch();

    const handleIconClick = () => {
        console.log("id : "+reservation._id)
        dispatch(selectReservation(reservation._id))
        
    };
    const statusColor = useSelector((state) => 
        selectStatusColor(reservation.idStatus)(state)
    );
    
    return(
        <div className="ticket" onClick={handleIconClick}>
            <h3>{reservation.projectName}</h3>
            <span className="datetime">Date : {reservation.reservationDate} au {reservation.returnDate}</span>
            <span className="material-icons-round">arrow_forward_ios</span>
            <div className="color-status" style={{ backgroundColor: statusColor}}></div>
        </div>
    );
}
export default Ticket;