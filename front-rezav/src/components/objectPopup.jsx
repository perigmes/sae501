<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { selectObjInfos } from "../features/demande/demandeSelector";
import { setInfoObject } from "../features/demande/demandeSlice";

const ObjectPopup = () => {
    const dispatch = useDispatch();

    const closePopup = () => {
            dispatch(setInfoObject({}));
    };

    return(
        <div className="object-popup" onClick={closePopup}>
        </div>
    );
};

export default ObjectPopup;
=======
import { useDispatch, useSelector } from "react-redux";
import { selectObjInfos } from "../features/demande/demandeSelector";
import { setInfoObject } from "../features/demande/demandeSlice";

const ObjectPopup = () => {
    const dispatch = useDispatch();

    const closePopup = () => {
            dispatch(setInfoObject({}));
    };

    return(
        <div className="object-popup" onClick={closePopup}>
        </div>
    );
};

export default ObjectPopup;
>>>>>>> f0429426010dae39588239ea01f6707666b3e27f
