import { useDispatch, useSelector } from "react-redux";
import { selectObjects, selectObjIsSelectable, selectObjInfos } from "../features/demande/demandeSelector";
import ObjectsByFilter from "../components/objectsByFilter";
import { clearObjectSelections, setObjIsSelectable } from "../features/demande/demandeSlice";
import ObjectPopup from "../components/objectPopup";
import { Link } from "react-router-dom";
import '../assets/styles/card.scss';


const ListObjects = () => {
    const dispatch = useDispatch();
    const objects = useSelector(selectObjects); // Récupère tous les objets
    const categories = [...new Set([...objects].map((object) => object.categorie))]; //récupère les categories d'objets
    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable
    const stateObjInfos = useSelector(selectObjInfos); // Récupérer les informations sur l'objet sélectionné

    const handleNextClick = () => { 
        if (!objIsSelectable) {
            dispatch(setObjIsSelectable()); // Activer la sélection si ce n'est pas déjà le cas
        }
    }

    const handlePrevClick = () => {
        dispatch(clearObjectSelections()); // Désélectionne tous les objets
        dispatch(setObjIsSelectable()); // Annuler la sélection
    }

    return (
        <div className="objects-list">
            {[...categories].map((category, index) => (
                <ObjectsByFilter key={index} filter={category} />
            ))}
            {stateObjInfos && Object.keys(stateObjInfos).length > 0 && (
                <ObjectPopup object={stateObjInfos} />
            )}
            {objIsSelectable ? (
                <div className="nav-form-btns">
                    <button className="rezav-button-1 prev-step" onClick={handlePrevClick}>Annuler</button>
                    <Link to="/formulaire-reservation" className="rezav-button-1 next-step">Étape suivante</Link>
                </div>
            ) : (
                <div className="nav-form-btns">
                    <button className="rezav-button-1 next-step" onClick={handleNextClick}><i className="material-symbols-rounded">shopping_bag</i> Réserver</button>
                </div>
            )}
        </div>
    );
};

export default ListObjects;
