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
