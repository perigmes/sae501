import { useSelector } from "react-redux";
import { Formulaire } from "./Formulaire";
import { selectFormStep } from "../features/demande/demandeSelector";
import ListObjects from "./ListObjects";

const ObjectsResPage = () => {
    
    const formStep = useSelector(selectFormStep);

    return (
        <>
            {formStep === 1 && (
                <ListObjects />
            )}
            {(formStep === 2 || formStep === 3) && (
                <Formulaire />
            )}
        </>
    );
};

export default ObjectsResPage;
