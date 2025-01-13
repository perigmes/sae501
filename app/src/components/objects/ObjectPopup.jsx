import { useDispatch,useSelector } from "react-redux";
import Modal from "react-modal";
import { setInfoObject } from "../../features/demande/demandeSlice";
import { selectObjInfos } from "../../features/demande/demandeSelector";
import "../../assets/styles/popup.scss";

const ObjectPopup = () => {
    const dispatch = useDispatch();
    const infoObject= useSelector(selectObjInfos);

    console.log(infoObject)
    const closePopup = () => {
            dispatch(setInfoObject({}));
            
           

    };

    return(
        <Modal className="object-popup" onRequestClose={closePopup} isOpen={infoObject && Object.keys(infoObject).length > 0} >
            <div className="object-popup-content">
                <button onClick={closePopup}>X</button>

                <img src={infoObject.picture} alt={infoObject.name} />

                <div> <h1>{infoObject.categorie}</h1>
                <h2>{infoObject.name}</h2>  
            <p>{infoObject.description}</p>
            </div>
               
                </div>
        </Modal>
    );
};

export default ObjectPopup;