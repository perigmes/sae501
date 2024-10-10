import { useDispatch, useSelector } from "react-redux";
import { selectCategories, selectObjIsSelectable } from "../features/demande/demandeSelector";
import ObjectsByCategory from "./objectsByCategory";
import '../assets/styles/commun.css';
import '../assets/styles/card.css';
import { setObjIsSelectable } from "../features/demande/demandeSlice";

const ObjectList = () => {
    const categories = useSelector(selectCategories); // Récupérer les catégories
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable
    const dispatch = useDispatch();

    const handleNextClick = () => { 
        if (!objIsSelectable) {
            dispatch(setObjIsSelectable()); // Activer la sélection si ce n'est pas déjà le cas
        }
    }

    const handlePrevClick = () => {
        dispatch(setObjIsSelectable()); // Annuler la sélection
    }

    return (
        <div className="objects-list">
            {categories.map((category, index) => (
                <ObjectsByCategory key={index} category={category} />
            ))}
            {objIsSelectable && (
                <button className="rezav-button prev-step" onClick={handlePrevClick}>Annuler</button>
            )}
            <button className="rezav-button next-step" onClick={handleNextClick}>
                {objIsSelectable ? "Étape suivante" : "Réserver"}
            </button>
        </div>
    );
};

export default ObjectList;
