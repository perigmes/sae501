import { useState } from "react";

function Ticket(props){
    const [showDetails, setShowDetails] = useState(false)

    const handleIconClick = () => {
        setShowDetails(prevState => !prevState); 
    };


    return(
        <div className="ticket">
            <h3>{props.children}</h3>
            <span className="datetime">Date :{dateTimeStart} au {dateTimeEnd}</span>
            <span className="material-icons-round">arrow_forward_ios</span>
            <div className="color-status" onClick={handleIconClick}></div>
        </div>
    );
}
export default Ticket;