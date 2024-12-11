import { useDispatch, useSelector } from "react-redux";
import { selectObjIsSelectable, selectSelectedObjects } from "../features/demande/demandeSelector";
import { useState, useEffect } from "react";
import { deselectObject, selectObject, setInfoObject } from "../features/demande/demandeSlice";

const ObjectCard = ({ object }) => {
    const { _id, name, picture } = object;
    const id = _id.$oid;
    const objIsSelectable = useSelector(selectObjIsSelectable);
    const selectedObjects = useSelector(selectSelectedObjects);
    const isSelected = selectedObjects.includes(id);
    const [cardHeight, setCardHeight] = useState(0);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (objIsSelectable) {
            if (isSelected) {
                dispatch(deselectObject(id));
            } else {
                dispatch(selectObject(id));
            }
        } else {
            dispatch(setInfoObject(object));
            document.querySelectorAll('.object-card').forEach(card => { card.style.pointerEvents = 'none'; });
            document.querySelector('.rezav-button-1.next-step').style.pointerEvents = 'none';
            const objectsList = document.querySelector('.objects-list') ?? null;
            const objectPopup = document.querySelector('.object-popup') ?? null;
            
            const blurElements = Array.from(objectsList.children).filter(child => child !== objectPopup); // Crée une liste contenant tous les enfants de objects-list à l'exception de la popup
            const headerElement = document.querySelector('.header') ?? null; // Sélectionne le header de l'application
            const objectsHdrElement = document.querySelector('.objects-hdr') ?? null; // Sélectionne le header du main de l'application
            blurElements.push(headerElement, objectsHdrElement); // Ajoute les 2 headers à la liste crée précédemment
            const finalBlurElements = blurElements.filter(element => element !== null); // Filtre les éléments null pour éviter les erreurs

            finalBlurElements.forEach(element => {
                element.style.filter = 'blur(2.5px)'; // Ajoute le filtre de flou sur les éléments
            });          
            document.querySelector('html').style.overflowY = 'hidden'; // Empêche le scroll dans l'application         
        }
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        handleClick();
    };

    useEffect(() => {
        const resizeCard = () => {
            const card = document.getElementById(id);
            const cardWidth = card.offsetWidth;
    
            // Assurez-vous que la hauteur est égale à la largeur
            setCardHeight(cardWidth);
        };
    
        resizeCard();
        window.addEventListener('resize', resizeCard);
    
        return () => {
            window.removeEventListener('resize', resizeCard);
        };
    }, [id]);

    return (
        <div 
            id={`${id}`} 
            className={`object-card${objIsSelectable ? " selectable" : ""}${objIsSelectable && isSelected ? " selected" : ""}`} 
            data-image-name={picture} 
            onClick={(e) => { e.stopPropagation(); handleClick(); }} 
            style={{
                height: `${cardHeight}px`,
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.15) 100%), url(/images/${picture})`}}>
            {objIsSelectable && (
                <>
                    <input 
                        className="rezav-checkbox" 
                        type="checkbox" 
                        id={`checkbox-${id}`} 
                        checked={isSelected} 
                        onChange={handleCheckboxChange} 
                        style={{ display: "none" }} 
                    />
                    <label 
                        htmlFor={`checkbox-${id}`} 
                        className="rezav-checkbox-label" 
                        onClick={(e) => e.stopPropagation()} // Empêcher la propagation du clic
                    ></label>
                </>
            )}
            <span>{name}</span>
        </div>
    );
};

export default ObjectCard;
