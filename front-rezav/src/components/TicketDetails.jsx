import { useSelector } from "react-redux";
import { selectStatusColor } from "../features/tickets/ticketSelector";
import OpenPDFButton from './OpenPDFButton';

const TicketDetails = ({ reservation }) => {
    const statusColor = useSelector((state) => 
        selectStatusColor(reservation.idStatus)(state)
    );
    console.log(reservation);
    return (
        <div className="details-container" >
            <div className="details-head" style={{ backgroundColor: statusColor}}>
                <h3>{reservation.projectName}</h3>
                <span className="datetime">Date : {reservation.reservationDate} au {reservation.returnDate}</span>
                <span className="group">
                    Membre du groupe :{reservation.groupMembers?.map((member) => 
                            `${member.firstName} ${member.lastName} (${member.groupeTd})`
                        ).join(", ") || "Aucun membre dans le groupe."}
                </span>
            </div>
            <div className="details-body">
                    <h4>Description du projet</h4>
                    <p>{reservation.projectDescription}</p>
                    <h4>Liste du materiel</h4>
                    <ul>
                        
                    </ul>
                    <h4>Justification du matériel</h4>
                    <p>{reservation.materialJustification}</p>
                    <h4>Plan d'implantation</h4>
                    <OpenPDFButton pdfUrl={reservation.audiovisualPlan} />
            </div>
        </div>
    );
}

export default TicketDetails;