export const selectObjects = (state) => state.demande.objects;
export const selectObjIsSelectable = (state) => state.demande.objIsSelectable;
export const selectSelectedObjects = (state) => state.demande.dataForm.idSelectedObjects;
export const selectReservationDates = (state) => {   
    return {
        startDate: state.demande.dataForm.startDate,
        returnDate: state.demande.dataForm.returnDate,
    };}
export const selectObjInfos = (state) => state.demande.objInfos;