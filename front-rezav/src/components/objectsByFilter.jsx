import { useSelector } from "react-redux";
import { selectObjects } from "../features/demande/demandeSelector";
import ObjectCard from './objectCard';

const ObjectsByFilter = ({ filter }) => {
    const allObjects = useSelector(selectObjects); // Récupère tous les objets
    const objects = [...allObjects].filter(object => object.categorie === filter); // trie les objets pour optenir uniquement ceux appartenant à la catégorie

    return (
        <>
            <h4 className="objects-filtered-title">{filter}</h4>
            <div className="objects-filtered-container">
                {[...objects].map((object) => (
                    <ObjectCard key={object._id.$oid} object={object} />
                ))}
            </div>
        </>
    );
};

export default ObjectsByFilter;
