import { useSelector } from "react-redux";
import { selectObjIsSelectable } from "../features/demande/demandeSelector";
import { useState, useEffect } from "react";
import '../assets/styles/commun.css';
import '../assets/styles/card.css';


const ObjectCard = ({ object }) => {
    const { id, name, picture } = object; // Décomposer l'objet pour accéder à ses propriétés
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable
    const [isSelected, setIsSelected] = useState(false); // État local pour suivre si la carte est sélectionnée
    const [cardHeight, setCardHeight] = useState(0); // État pour stocker la hauteur dynamique de la carte

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

    const resizeCard = () => { // Fonction pour ajuster la hauteur de la carte en fonction de la largeur du parent
        const parentWidth = document.getElementById(id).parentElement.offsetWidth;
        const newHeight = parentWidth * 0.28;
        setCardHeight(Math.min(newHeight, 175));
    };

    useEffect(() => {
        resizeCard();
        window.addEventListener('resize', resizeCard);
        return () => {
            window.removeEventListener('resize', resizeCard);
        };
    }, []);

    return (
        <div id={`${id}`} className={`object-card ${isSelected ? "selected" : ""}`} data-image-name={picture} onClick={handleClick} style={{ height: `${cardHeight}px`, backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.15) 100%), url(/images/${picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
