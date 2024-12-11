import { useDispatch, useSelector } from "react-redux";
import { selectObjIsSelectable, selectReservationDates } from "../features/demande/demandeSelector";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { setStartDate } from "../features/demande/demandeSlice";

const MainHeader = () => {
    const dispatch = useDispatch();
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable depuis le contexte
    const { startDate, returnDate } = useSelector(selectReservationDates);// Récupérer les dates de la réservation depuis le contexte

    const [startDateValue, setStartDateValue] = useState(null); // Valeur du champ input de date de début
    const [startTimeValue, setStartTimeValue] = useState(null); // Valeur du champ input de heure de début
    const [returnDateValue, setReturnDateValue] = useState(null); // Valeur du champ input de date de fin
    const [returnTimeValue, setReturnTimeValue] = useState(null); // Valeur du champ input de heure de fin

    // UseEffect pour synchroniser les champs aux changement des dates du contexte
    useEffect(() => {
        setStartDateValue(startDate ? startDate.split('T')[0] : null);
        setStartTimeValue(startDate ? startDate.split('T')[1].slice(0, 5) : null);
        setReturnDateValue(returnDate ? returnDate.split('T')[0] : null);
        setReturnTimeValue(returnDate ? returnDate.split('T')[1].slice(0, 5) : null);
    }, [startDate, returnDate])

    const minimumStartDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        return today.toISOString().split("T")[0];
    };
    
    const minDate = minimumStartDate();

    const location = useLocation();

    const handleDateTimeChange = (e) => {
        const value = e.target.value;

        if (e.target.id === "date-du") {
            if (value < minDate) {
                return; 
            }
            

        } else if (e.target.id === "time-du") {

        } else if (e.target.id === "date-au") {
            if (value < minDate) {
                console.log("Date de fin invalide")
                return; 
            }
        } else if (e.target.id === "time-au") {
            
        }
        dispatch(setStartDate())
    };

    return (
        <header className={`main-hdr${objIsSelectable ? ' list-obj-selectable' : ''}`}>
            <h2 className="page-title">{location.pathname === '/list-objects' ? "Liste du matériel" : "Formulaire de réservation"}</h2>
            {location.pathname === '/list-objects' && objIsSelectable && (
                <>
                    <div className="rezav-input input-date">
                        <label htmlFor="date-du">Du</label>
                        <input type="date" id="date-du" value={startDateValue} min={minDate} onChange={handleDateTimeChange}/>
                    </div>
                    <div className="rezav-input input-time">
                        <label htmlFor="time-du">À</label>
                        <input type="time" id="time-du" value={startTimeValue} onChange={handleDateTimeChange}/>
                    </div>
                    <div className="rezav-input input-date">
                        <label htmlFor="date-au">Au</label>
                        <input type="date" id="date-au" value={returnDateValue} min={minDate} onChange={handleDateTimeChange}/>
                    </div>
                    <div className="rezav-input input-time">
                        <label htmlFor="time-au">À</label>
                        <input type="time" id="time-au" value={returnTimeValue} onChange={handleDateTimeChange}/>
                    </div>
                </>
            )}
            {location.pathname === '/list-objects' && (
                <>
                    <button className="rezav-button-2 filter-btn"><span className="material-symbols-rounded">tune</span>Filtrer</button>
                    <div className="rezav-input search-barre">
                        <input type="search" name="search-objects" id="searchObj" placeholder="Rechercher"/>
                        <span className="material-symbols-rounded">search</span>
                    </div>
                </>
            )}


        </header>
    );
};

export default MainHeader;
