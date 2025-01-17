import { createSelector } from "reselect";

export const selectObjects = (state) => [...state.demande.objects].sort((a, b) => a.name.localeCompare(b.name));
export const selectReservations = (state) => state.demande.reservations;
export const selectObjIsSelectable = (state) => state.demande.objIsSelectable;
export const selectSelectedObjects = (state) => state.demande.dataDemande.objects;
export const selectDataDemande = (state) => state.demande.dataDemande;
export const selectSearchBarre = (state) => state.demande.searchBarre;
export const selectFilter = (state) => state.demande.filter;
export const selectErrorFormDemande = (state) => state.demande.errors.errorFormDemande;
export const selectFormStep = (state) => state.demande.formStep;
export const selectFormValidation = (state) => state.demande.formValidation;

export const selectReservationDates = createSelector(
    [selectDataDemande],
    (dataDemande) => ({
        startDT: dataDemande.startDT,
        returnDT: dataDemande.returnDT,
    })
);
export const selectObjInfos = (state) => state.demande.objInfos;
export const selectUSerInfos = (state) => state.demande.user;