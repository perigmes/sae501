export const selectObjects = (state) => state.demande.objects;
export const selectObjIsSelectable = (state) => state.demande.objIsSelectable;
export const selectSelectedObjects = (state) => state.demande.dataDemande.objects;
export const selectDataDemande = (state) => state.demande.dataDemande;
export const selectReservationDates = (state) => {   
    return {
        startDT: state.demande.dataDemande.startDT,
        returnDT: state.demande.dataDemande.returnDT,
    };}
export const selectObjInfos = (state) => state.demande.objInfos;