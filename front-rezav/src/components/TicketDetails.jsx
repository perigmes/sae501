const TicketDetails = ({ reservation }) => {
    const statusColor = useSelector((state) => 
        selectStatusColor(reservation.idStatus)(state)
    );
    return (
        <div className="details-container" style={{ backgroundColor: statusColor}}>
            <div className="details-head">
                <h3>{reservation.projectName}</h3>
                <span className="datetime">Date : {reservation.reservationDate} au {reservation.returnDate}</span>
                <span className="group">{reservation.groupMembers.map(
            (member) => `${member.firstName} ${member.lastName} (${member.TD})`)}</span>
            </div>
            <div className="details-body">
                    <h4>Description du projet</h4>
                    <p>{reservation.projectDescription}</p>
                    <h4>Liste du materiel</h4>
                    <ul></ul>
                    <h4>Justification du matériel</h4>
                    <p>{reservation.materialJustification}</p>
                    <h4>Plan d'implantation</h4>
                    <button>
                        <img src={reservation.audiovisualPlan} alt=""/>
                    </button>
            </div>
        </div>
    );
}