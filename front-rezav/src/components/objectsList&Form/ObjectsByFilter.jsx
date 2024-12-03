import { useSelector } from "react-redux";
import { selectObjects, selectReservationDates, selectReservations } from "../../features/demande/demandeSelector";
import ObjectCard from "./ObjectCard";
import { filterAvailableObjects } from "../../utils/tools";
import { useEffect } from "react";

const ObjectsByFilter = ({ filter }) => {
    const allObjects = useSelector(selectObjects); // Récupère tous les objets
    const reservations = useSelector(selectReservations);
    console.log(reservations);
    const {startDT, returnDT} = useSelector(selectReservationDates);
    let objectsFiltered = filterAvailableObjects(allObjects)(reservations)(startDT.date)(startDT.time)(returnDT.date)(returnDT.time); 
    useEffect(() => {
        objectsFiltered = filterAvailableObjects(allObjects)(reservations)(startDT.date)(startDT.time)(returnDT.date)(returnDT.time) // Récupère tous les objets
    }, [startDT, returnDT]);
    const objects = [...objectsFiltered].filter(object => object.categorie === filter); // trie les objets pour optenir uniquement ceux appartenant à la catégorie

    return (
        <>
            <h4 className="objects-filtered-title">{filter}</h4>
            <div className="objects-filtered-container">
                {[...objects].map((object) => (
                    <ObjectCard key={object.id} object={object} />
                ))}
            </div>
        </>
    );
};

export default ObjectsByFilter;
