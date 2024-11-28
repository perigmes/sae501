import { useDispatch, useSelector } from "react-redux";
import { selectObjIsSelectable, selectReservationDates } from "../features/demande/demandeSelector";
import { useLocation } from 'react-router-dom';
import { setReturnDT, setStartDT } from "../features/demande/demandeSlice";
import { useEffect, useState } from "react";

const MainHeader = () => {
    const dispatch = useDispatch();
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable depuis le contexte
    const { startDT, returnDT } = useSelector(selectReservationDates); // Récupérer les dates et horaires de la réservation depuis le contexte
    
    const minimumStartDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 2); // Ajout de 2 jours
        return today.toISOString().split("T")[0]; // Format ISO pour les dates
    };

    const minDate = minimumStartDate();
    const location = useLocation();

    const handleDateTimeChange = (e) => {
        const { id, value } = e.target;

        if (id === "date-du") {
            setStartDate(value);
            if (value >= minDate) {
                dispatch(setStartDT({ date: value, time: startDT.time }));
            } else {
                console.log("La date de début est invalide.");
            }
        } else if (id === "time-du") {
            setStartTime(value);
            dispatch(setStartDT({ date: startDT.date, time: value }));
        } else if (id === "date-au") {
            setReturnDate(value);
            if (value >= startDT.date) {
                dispatch(setReturnDT({ date: value, time: returnDT.time }));
            } else {
                console.log("La date de fin ne peut pas être antérieure à la date de début.");
            }
        } else if (id === "time-au") {
            setReturnTime(value);
            dispatch(setReturnDT({ date: returnDT.date, time: value }));
        }
    };

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');

    useEffect(() => {
        setStartDate(startDT ? startDT.date : '');
    }, [startDT.date]);
    useEffect(() => {
        setStartTime(startDT? startDT.time : '');
    }, [startDT.time]);
    useEffect(() => {
        setReturnDate(returnDT ? returnDT.date : '');
    }, [returnDT.date]);
    useEffect(() => {
        setReturnTime(returnDT ? returnDT.time : '');
    }, [returnDT.time]);

    return (
        <header className={`main-hdr${objIsSelectable ? ' list-obj-selectable' : ''}`}>
            <h2 className="page-title">{location.pathname === '/list-objects' ? "Liste du matériel" : "Formulaire de réservation"}</h2>
            {location.pathname === '/list-objects' && objIsSelectable && (
                <>
                    <div className="rezav-input input-date">
                        <label htmlFor="date-du">Du</label>
                        <input
                            type="date"
                            id="date-du"
                            value={startDate}
                            min={minDate}
                            onChange={handleDateTimeChange}
                        />
                    </div>
                    <div className="rezav-input input-time">
                        <label htmlFor="time-du">À</label>
                        <input
                            type="time"
                            id="time-du"
                            value={startTime}
                            onChange={handleDateTimeChange}
                        />
                    </div>
                    <div className="rezav-input input-date">
                        <label htmlFor="date-au">Au</label>
                        <input
                            type="date"
                            id="date-au"
                            value={returnDate}
                            min={startDT.date || minDate}
                            onChange={handleDateTimeChange}
                        />
                    </div>
                    <div className="rezav-input input-time">
                        <label htmlFor="time-au">À</label>
                        <input
                            type="time"
                            id="time-au"
                            value={returnTime}
                            onChange={handleDateTimeChange}
                        />
                    </div>
                </>
            )}
            {location.pathname === '/list-objects' && (
                <>
                    <button className="rezav-button-2 filter-btn">
                        <span className="material-symbols-rounded">tune</span>Filtrer
                    </button>
                    <div className="rezav-input search-barre">
                        <input
                            type="search"
                            name="search-objects"
                            id="searchObj"
                            placeholder="Rechercher"
                        />
                        <span className="material-symbols-rounded">search</span>
                    </div>
                </>
            )}
        </header>
    );
};

export default MainHeader;
