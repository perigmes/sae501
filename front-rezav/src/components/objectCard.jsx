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
        }
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation(); // Prévenir la propagation au parent
        handleClick();
    };

    useEffect(() => {
        const resizeCard = () => {
            const parentElement = document.getElementById(id).parentElement;
            const parentWidth = parentElement.offsetWidth;
            const parentGap = parseFloat(window.getComputedStyle(parentElement).getPropertyValue('gap'));
                        const newHeight = parentWidth * 0.33 - (10 + parentGap);
            setCardHeight(Math.min(newHeight, 175));
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
            className={`object-card${objIsSelectable ? "selectable" : ""}${objIsSelectable && isSelected ? "selected" : ""}`} 
            data-image-name={picture} 
            onClick={(e) => { e.stopPropagation(); handleClick(); }} 
            style={{ height: `${cardHeight}px`, backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.15) 100%), url(/images/${picture})` }}
        >
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
