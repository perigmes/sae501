import { useSelector } from "react-redux";
import { selectStatusColor } from "../features/tickets/ticketSelector";
import { selectObjects } from "../features/demande/demandeSelector"
import OpenPDFButton from './OpenPDFButton';

const TicketDetails = ({ reservation }) => {

const allObjects = useSelector(selectObjects);

const materiels = allObjects.filter((item) => {
    const objectId = item._id.$oid;
    return reservation.items.includes(objectId);
 });
 
console.log("Materiels: ", materiels)



    const statusColor = useSelector((state) => 
        selectStatusColor(reservation.idStatus)(state)
    );
    return (
        <div className="details-container" >
            <div className="details-head" style={{ backgroundColor: statusColor}}>
                <h3>{reservation.projectName}</h3>
                <span className="datetime">Date : {new Intl.DateTimeFormat('fr-FR').format(new Date(reservation.reservationDate))} au {new Intl.DateTimeFormat('fr-FR').format(new Date(reservation.returnDate))}</span>
                <span className="group">
                    Membre du groupe :{reservation.groupMembers?.map((member) => 
                            `${member.firstName} ${member.lastName} (${member.groupeTd})`
                        ).join(", ") || "Aucun membre dans le groupe."}
                </span>
            </div>
            <div className="details-body">
                <div className="description section-body">
                    <h4>Description du projet</h4>
                    <p>{reservation.projectDescription}</p>
                </div>
                <div className="listOfObjects section-body">
                    <h4>Liste du materiel</h4>
                    <div>
                        {materiels.map((item, index) => (
                            <div key={index}>
                            <img src={`/images/${item.picture}`} alt={item.name}/>
                            <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="justification section-body">
                    <h4>Justification du matériel</h4>
                    <p>{reservation.materialJustification}</p>  
                </div>
                <div className="pdfSection section-body">
                   <h4>Plan d'implantation</h4>
                    <OpenPDFButton pdfUrl={reservation.audiovisualPlan} /> 
                </div>
            </div>
        </div>
    );
}

export default TicketDetails;