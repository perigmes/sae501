export const selectObjects = (state) => state.demande.objects;
export const selectObjIsSelectable = (state) => state.demande.objIsSelectable;
export const selectCategories = (state) => [...new Set(selectObjects(state).map(object => object.categorie))];
export const selectObjectsByCategory = (state, category) => selectObjects(state).filter(object => object.categorie === category);