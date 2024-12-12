import { useDispatch, useSelector } from "react-redux";
import { selectObjects, selectObjIsSelectable, selectObjInfos, selectFilter, selectSearchBarre, selectErrorFormDemande, selectSelectedObjects, selectReservationDates } from "../features/demande/demandeSelector";
import ObjectsByFilter from "../components/objects/ObjectsByFilter";
import { clearDataDemande, setErrorFormDemande, setFilter, setObjIsSelectable } from "../features/demande/demandeSlice";
import ObjectPopup from "../components/objects/ObjectPopup";
import { useNavigate } from "react-router-dom";
import '../assets/styles/card.scss';
import { formatErrorMessage } from "../utils/tools";
import { useEffect, useState } from "react";


const ListObjects = () => {
    const dispatch = useDispatch();
    const objects = useSelector(selectObjects);
    const filterType = useSelector(selectFilter)
    const searchBarre = useSelector(selectSearchBarre)
    const errorFormDemande = useSelector(selectErrorFormDemande)
    const {startDT, returnDT} = useSelector(selectReservationDates);
    const selectedObjects = useSelector(selectSelectedObjects);

    useEffect(() => {
        if (selectedObjects.length === 0 || startDT.trim().length === 0 || returnDT.trim().length === 0) {
            dispatch(setErrorFormDemande(true));
        } else {
            dispatch(setErrorFormDemande(false));
        }
    }, [selectedObjects, startDT, returnDT])

    useEffect(() => {
        if (filterType !== "category" && filterType !== "alphabet" && filterType!== "alphabet-reverse") {
            dispatch(setFilter("category"));
        }
    }, [filterType])
    
    let filters
    if (filterType === "category") {
        filters = [...new Set([...objects].map((object) => object.categorie))]; //récupère les categories d'objets

    } else if (filterType === "alphabet-reverse") {
        filters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(122 - i)); // génère un tableau de 'a' à 'z'

    } else if (filterType === "alphabet") {
        filters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)); // génère un tableau de 'z' à 'a'
    }

    const objIsSelectable = useSelector(selectObjIsSelectable); // Récupérer l'état indiquant si l'objet est sélectionnable
    const stateObjInfos = useSelector(selectObjInfos); // Récupérer les informations sur l'objet sélectionné
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const handleNextClick = () => { 
        if (!objIsSelectable) {
            dispatch(setObjIsSelectable(true)); // Activer la sélection si ce n'est pas déjà le cas
        } else {
            const errors = [];

            // Vérifications d'erreur
            if (errorFormDemande && selectedObjects.length === 0) {
                errors.push("aucun objet sélectionné");
            }
            
            if (errorFormDemande && startDT.trim().length === 0) {
                errors.push("la date d'emprunt est vide ou invalide");
            }
            
            if (errorFormDemande && returnDT.trim().length === 0) {
                errors.push("la date de retour est vide ou invalide");
            }

            if (errors.length > 0) {
                setErrorMessage(formatErrorMessage(errors));
                return;
            }
            
            dispatch(setObjIsSelectable(false));
            navigate('/formulaire-reservation');
        }
    }

    const handlePrevClick = () => {
        setErrorMessage("");
        dispatch(clearDataDemande());
        dispatch(setObjIsSelectable(false));
    }

    const handleErrorMessage = () => {
    setErrorMessage("");
    }

    return (
            <div className="objects-list">
                {filters && searchBarre.trim().length === 0 && [...filters].map((filter, index) => (
                    <ObjectsByFilter key={index} filter={filter} />
                ))}
                {searchBarre.trim().length > 0 && (
                    <ObjectsByFilter filter={searchBarre} />)}
                {stateObjInfos && Object.keys(stateObjInfos).length > 0 && (
                    <ObjectPopup object={stateObjInfos} />
                )}
                <div className="nav-form-btns">
                    {objIsSelectable && (
                        <button className="rezav-button-1 prev-step" onClick={handlePrevClick}>Annuler</button>
                    )}
                    <button className="rezav-button-1 next-step" onClick={handleNextClick}>
                        {objIsSelectable ? (
                            "Étape suivante"
                        ) : ( <><i className="material-symbols-rounded">shopping_bag</i>Réserver</>)}
                    </button>
                </div>
                {errorFormDemande && errorMessage.trim().length > 0 ? (
                <div className="error-message" role="alert">
                    <span className="material-symbols-rounded">cancel</span>
                    <span className="error-txt">{errorMessage}</span>
                    <button className="material-symbols-rounded close-btn" onClick={handleErrorMessage}>close</button>
                </div>
            ) :  null}
            </div>
    );
};

export default ListObjects;
