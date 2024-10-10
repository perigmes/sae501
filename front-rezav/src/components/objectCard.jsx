import { useDispatch, useSelector } from "react-redux";
import { selectObjIsSelectable, selectSelectedObjects } from "../features/demande/demandeSelector";
import { useState, useEffect } from "react";
import { deselectObject, selectObject } from "../features/demande/demandeSlice";

const ObjectCard = ({ object }) => {
    const { _id, name, picture } = object; // Décomposer l'objet pour accéder à ses propriétés
    const id = _id.$oid;
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si les objets sont sélectionnables
    const selectedObjects = useSelector(selectSelectedObjects); // Récupère tous les objets sélectionnés
    const isSelected = selectedObjects.includes(id); // Vérifier si l'objet est déjà sélectionné
    const [cardHeight, setCardHeight] = useState(0); // État pour stocker la hauteur dynamique de la carte
    const dispatch = useDispatch();

    const handleClick = () => { // Fonction pour gérer le clic sur la carte en fonction de la selectionnabilité des objets
        if (objIsSelectable) {
            if (isSelected) {
                dispatch(deselectObject(id));
            } else {
                dispatch(selectObject(id));
            }
        } else {
            console.log("Autre action ici");
        }
    };

    const handleCheckboxClick = (e) => { // Fonction pour gérer le clic sur le checkbox
        e.stopPropagation();
        handleClick();
    };

    useEffect(() => {
        const resizeCard = () => {
            const parentWidth = document.getElementById(id).parentElement.offsetWidth;
            const newHeight = parentWidth * 0.28;
            setCardHeight(Math.min(newHeight, 175));
        };

        resizeCard(); // Appel initial
        window.addEventListener('resize', resizeCard);

        return () => {
            window.removeEventListener('resize', resizeCard);
        };
    }, [id]);

    return (
        <div id={`${id}`} className={`object-card ${objIsSelectable ? "selectable" : ""} ${objIsSelectable && isSelected ? "selected" : ""}`} data-image-name={picture} onClick={handleClick} style={{ height: `${cardHeight}px`, backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.15) 100%), url(/images/${picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {objIsSelectable && (
                <>
                    <input className="rezav-checkbox" type="checkbox" id={`checkbox-${id}`} checked={isSelected} onChange={handleCheckboxClick} />
                    <label htmlFor={`checkbox-${id}`} className="rezav-checkbox-label"></label>
                </>
            )}
            <span>{name}</span>
        </div>
    );
};

export default ObjectCard;
