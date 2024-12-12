import { useSelector } from "react-redux";
import { selectFilter, selectObjects, selectReservationDates, selectReservations, selectSearchBarre } from "../../features/demande/demandeSelector";
import ObjectCard from "./ObjectCard";

const ObjectsByFilter = ({ filter }) => {
    const allObjects = useSelector(selectObjects);
    const {startDT, returnDT} = useSelector(selectReservationDates);
    const filterType = useSelector(selectFilter)
    const searchBarre = useSelector(selectSearchBarre)

    let objects;
    if (searchBarre.trim().length === 0) {
        if (filterType === "category") {
            // Filter objects by category
            objects = [...allObjects].filter(object => object.categorie === filter);
        } else if (filterType === "alphabet" || filterType === "alphabet-reverse") {
            // Filter objects by name prefix
            objects = [...allObjects].filter(object => object.name && object.name.toLowerCase().startsWith(filter.toLowerCase()));
        }
    } else {
        objects = [...allObjects].filter(object => object.name && object.name.toLowerCase().includes(filter.toLowerCase()));
        if (objects.length === 0) {
            objects = [...allObjects].filter(object => object.categorie && object.categorie.toLowerCase().includes(filter.toLowerCase()));
        }
    }

    return (
        objects.length > 0 ? (<>
            <h4 className="objects-filtered-title">{searchBarre.trim().length === 0 ? filter : "Résultats de votre recherche"}</h4>
            <div className="objects-filtered-container">
                {[...objects].map((object) => (
                    <ObjectCard key={object.id} object={object} />
                ))}
            </div>
        </>) : (
            <div className="search-error">
                <span className="material-symbols-rounded">close</span>
                <h4>{`Aucun matériel du département ne correspond à ${searchBarre}`}</h4>
            </div>)
    );
};

export default ObjectsByFilter;