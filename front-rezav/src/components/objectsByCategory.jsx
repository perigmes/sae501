import { useSelector } from "react-redux";
import { selectObjectsByCategory, selectObjIsSelectable } from "../features/demande/demandeSelector";
import ObjectCard from './objectCard';
import '../assets/styles/commun.css';
import '../assets/styles/card.css';

const ObjectsByCategory = ({ category }) => {
    const objects = useSelector((state) => selectObjectsByCategory(state, category)); // Récupérer les objets par catégorie

    return (
        <>
            <h4 className="category-title">{category}</h4>
            <div className="category-container">
                {objects.map((object) => (
                    <ObjectCard object={object} />
                ))}
            </div>
        </>
    );
};

export default ObjectsByCategory;
