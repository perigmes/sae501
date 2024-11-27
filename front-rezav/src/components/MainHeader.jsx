import { useDispatch, useSelector } from "react-redux";
import { selectObjIsSelectable } from "../features/demande/demandeSelector";
import { useLocation } from 'react-router-dom';

const MainHeader = () => {
    const dispatch = useDispatch();
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable
    const location = useLocation();
    
    return (
        <header className={`main-hdr${objIsSelectable ? ' list-obj-selectable' : ''}`}>
            <h2 className="page-title">{location.pathname === '/list-objects' ? "Liste du matériel" : "Formulaire de réservation"}</h2>
            {location.pathname === '/list-objects' && objIsSelectable && (
                <>
                    <div className="rezav-input input-date">
                        <label htmlFor="date-du">Du</label>
                        <input type="date" id="date-du"/>
                    </div>
                    <div className="rezav-input input-time">
                        <label htmlFor="time-du">À</label>
                        <input type="time" id="time-du"/>
                    </div>
                    <div className="rezav-input input-date">
                        <label htmlFor="date-au">Au</label>
                        <input type="date" id="date-au"/>
                    </div>
                    <div className="rezav-input input-time">
                        <label htmlFor="time-au">À</label>
                        <input type="time" id="time-au"/>
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
