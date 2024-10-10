import { useSelector } from "react-redux";
import { selectObjIsSelectable } from "../features/demande/demandeSelector";
import { useState } from "react";

const ObjectCard = ({ object }) => {
    const { id, name, picture } = object; // Décomposer l'objet pour accéder à ses propriétés
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable
    const [isSelected, setIsSelected] = useState(false); // État local pour suivre si la carte est sélectionnée

    const handleClick = () => { // Fonction pour gérer le clic sur la carte
        if (objIsSelectable) { // Action au clic si l'objet est sélectionnable
            setIsSelected((prev) => !prev);
        } else { // Action au clic si l'objet n'est pas sélectionnable
            console.log("Autre action ici");
        }
    };
    const handleCheckboxClick = (e) => { // Fonction pour gérer le clic sur le checkbox
        e.stopPropagation();
        handleClick();
    };

    return (
        <div className={`object-card ${isSelected ? "selected" : ""}`} data-image-name={picture} onClick={handleClick}>
            {objIsSelectable && (
                <>
                    <label htmlFor={`checkbox-${id}`} className="checkbox-label"></label>
                    <input className="rezav-checkbox" type="checkbox" id={`checkbox-${id}`} checked={isSelected} onChange={handleCheckboxClick} />
                </>
            )}
            <span>{name}</span>
        </div>
    );
};

export default ObjectCard;
