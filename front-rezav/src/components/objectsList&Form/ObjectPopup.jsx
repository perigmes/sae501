import { useDispatch, useSelector } from "react-redux";
import { selectObjInfos } from "../../features/demande/demandeSelector";
import { setInfoObject } from "../../features/demande/demandeSlice";

const ObjectPopup = () => {
    const dispatch = useDispatch();

    const closePopup = () => {
            dispatch(setInfoObject({}));
            document.querySelectorAll('.object-card').forEach(card => { card.style.pointerEvents = ''; });
            document.querySelector('.rezav-button-1.next-step').style.pointerEvents = '';
            
            const objectsList = document.querySelector('.objects-list') ?? null;
            const objectPopup = document.querySelector('.object-popup') ?? null;

            const blurElements = Array.from(objectsList.children).filter(child => child !== objectPopup); // Crée une liste contenant tous les enfants de objects-list à l'exception de la popup
            const headerElement = document.querySelector('.header') ?? null; // Sélectionne le header de l'application
            const objectsHdrElement = document.querySelector('.objects-hdr') ?? null; // Sélectionne le header du main de l'application
            blurElements.push(headerElement, objectsHdrElement); // Ajoute les 2 headers à la liste crée précédemment
            const finalBlurElements = blurElements.filter(element => element !== null); // Filtre les éléments null pour éviter les erreurs
            
            finalBlurElements.forEach(element => {
                element.style.filter = ''; // Retire le filtre de flou sur les éléments
            });

            document.querySelector('html').style.overflowY = ''; // Autorise le scroll dans l'application    
    };

    return(
        <div className="object-popup" onClick={closePopup}>
        </div>
    );
};

export default ObjectPopup;